"""Bla."""

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView
from ..tools import record_from_ice_database, data_to_html_data
from ..common_data import connector_records, backbone
from flametree import file_tree
from dnacauldron import full_assembly_report


class serializer_class(serializers.Serializer):
    database_token = serializers.CharField()
    constructsData = serializers.JSONField()

class worker_class(AsyncWorker):

    def work(self):
        self.set_progress_message("Reading Data...")
        data = self.data.constructsData
        results_zip_root = file_tree('@memory')
        for construct in self.data.constructsData.constructs:
            print (construct.enabledSlots)
            parts = [
                (part.dbId, part.dbName)
                for slot, selected_parts in construct.selectedParts.items()
                if construct.enabledSlots[slot]
                for part in selected_parts
            ]
            parts_records = [
                record_from_ice_database(part_id, self.data.database_token,
                                         linear=True, name=part_name)
                for part_id, part_name in parts
            ] + [backbone]
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

        zip_data = results_zip_root._close()
        name = data.projectName if len(data.projectName) else 'sequences'

        return {
            'zip_file': dict(
               name=name + '.zip',
               data=data_to_html_data(zip_data, datatype='zip'),
               mimetype='application/zip'
            )
        }

class GetConstructsAsGenbankView(StartJobView):
    serializer_class = serializer_class
    worker_class = worker_class
