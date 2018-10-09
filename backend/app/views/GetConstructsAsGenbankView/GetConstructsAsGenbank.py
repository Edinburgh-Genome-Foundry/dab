"""Bla."""

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView
from ..common_data import connector_records, backbone
from ..tools import data_to_html_data
from flametree import file_tree
from dnacauldron import full_assembly_report, autoselect_enzyme
from icebreaker import IceClient


def construct_data_to_assemblies_sequences(constructs_data, ice_auth, logger):

    results_zip_root = file_tree('@memory')
    errors = {
        'no_assembly': []
    }
    ice_auth['root'] = 'http://ice:8080'
    templates_data = constructs_data['constructTemplates']
    ice_client = IceClient(ice_auth, cache='memory')
    iterator = constructs_data['constructs']
    for construct in logger.iter_bar(construct=constructs_data['constructs']):
        logger(message="Reading parts records")
        selected_parts = [
            part
            for slot, selected in construct["selectedParts"].items()
            if construct['enabledSlots'][slot]
            for part in selected
        ]
        selected_parts_records = [
            ice_client.get_record(part["id"])
            for part in selected_parts
        ]
        template = templates_data[construct['templateName']]
        template_name = template['name']
        connectors_folder_name = template_name + '__connectors__shared'
        connectors_folder_id = ice_client.get_folder_id(
            connectors_folder_name, 'SHARED')
        connector_entries = ice_client.get_folder_entries(connectors_folder_id)
        connectors_records = [ice_client.get_record(e['id'])
                              for e in connector_entries]
        enzyme = autoselect_enzyme(connectors_records + selected_parts_records)
        for rec in connectors_records + selected_parts_records:
            rec.linear = False
        logger(message="Computing final sequence(s)")
        try:
            n_assemblies, zipdata = full_assembly_report(
                selected_parts_records, "@memory", enzyme=enzyme,
                assemblies_prefix=construct.name,
                connector_records=connectors_records,
                include_fragments_plots=False, include_parts_plots=False,
                include_assembly_plots=True)
            folder = results_zip_root._dir(construct.name)
            ziproot = file_tree(zipdata)
            for d in ziproot._dirs:
                d._copy(folder)
            ziproot.parts_graph_pdf.copy(folder._file('parts_graph.pdf'))

        except ValueError as err:
            raise (err)
            name_and_error = "%s (%s)" % (construct.name, str(err))
            errors['no_assembly'].append(name_and_error)



    zip_data = results_zip_root._close()
    return zip_data, errors


class serializer_class(serializers.Serializer):
    iceAuthentication = serializers.JSONField()
    constructsData = serializers.JSONField()
    projectName = serializers.CharField(allow_blank=True)


class worker_class(AsyncWorker):

    def work(self):
        self.logger(message="Reading Data...")
        zip_data, errors = construct_data_to_assemblies_sequences(
            constructs_data=self.data.constructsData,
            ice_auth=self.data.iceAuthentication,
            logger=self.logger
        )
        name = self.data.projectName if len(self.data.projectName) else 'sequences'
        response = {
            'zip_file': dict(
               name=name + '.zip',
               data=data_to_html_data(zip_data, datatype='zip'),
               mimetype='application/zip',
            )
        }
        error_message = ''
        if errors['no_assembly'] != []:
            error_message += (
                "The following constructs gave no assembly: " +
                ", ".join(errors['no_assembly']) + ". "
            )
        if error_message != '':
            response['error'] = {'message': error_message}
        return response

class GetConstructsAsGenbankView(StartJobView):
    serializer_class = serializer_class
    worker_class = worker_class
