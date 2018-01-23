"""Bla."""

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView
from ..tools import record_from_ice_database, data_to_html_data
from ..common_data import connector_records, backbone
from flametree import file_tree
from dnacauldron import full_assembly_report


def construct_data_to_assemblies_sequences(constructs, database_token, logger):

    results_zip_root = file_tree('@memory')
    errors = {
        'no_assembly': []
    }
    for construct in logger.iter_bar(construct=constructs):
        parts = [
            (part.dbId, part.dbName)
            for slot, selected_parts in construct.selectedParts.items()
            if construct.enabledSlots[slot]
            for part in selected_parts
        ]
        parts_records = [
            record_from_ice_database(part_id, database_token,
                                     linear=True, name=part_name)
            for part_id, part_name in parts
        ] + [backbone]
        try:
            nassemblies, zipdata = full_assembly_report(
                parts_records, "@memory", enzyme='BsmBI',
                assemblies_prefix=construct.name,
                connector_records=connector_records,
                include_fragments=False, include_parts=False)
            folder = results_zip_root._dir(construct.name)
            ziproot = file_tree(zipdata)
            for d in ziproot._dirs:
                d._copy(folder)
            ziproot.parts_graph_pdf.copy(folder._file('parts_graph.pdf'))

        except ValueError as err:
            name_and_error = "%s (%s)" % (construct.name, str(err))
            errors['no_assembly'].append(name_and_error)
        if nassemblies == 0:
            name_and_error = "%s (%s)" % (construct.name, '0 assemblies found')
            errors['no_assembly'].append(name_and_error)



    zip_data = results_zip_root._close()
    return zip_data, errors


class serializer_class(serializers.Serializer):
    database_token = serializers.CharField()
    constructsData = serializers.JSONField()


class worker_class(AsyncWorker):

    def work(self):
        self.logger(message="Reading Data...")
        data = self.data.constructsData
        zip_data, errors = construct_data_to_assemblies_sequences(
            constructs=data.constructs,
            database_token=self.data.database_token,
            logger=self.logger
        )
        name = data.projectName if len(data.projectName) else 'sequences'
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
