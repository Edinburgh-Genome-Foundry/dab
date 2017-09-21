"""Bla."""

from base64 import b64decode, b64encode

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView, JobResult
from ..tools import record_from_ice_database
from ..common_data import connector_records, backbone
from dnacauldron import full_assembly_report


digestion = serializers.ListField(child=serializers.CharField())

class serializer_class(serializers.Serializer):
    database_token = serializers.CharField()
    parts_ids = serializers.ListField(child=serializers.CharField())

class worker_class(AsyncWorker):

    def work(self):
        self.set_progress_message("Reading Data...")
        data = self.data

        records = [
            record_from_ice_database(part_id, data.database_token,
                                     linear=True)
            for part_id in data.parts_ids
        ]
        print ([(r.id, r.name, len(r)) for r in records])
        print (backbone.id, len(backbone))

        self.set_progress_message("Generating a report, be patient.")

        nconstructs, zip_data = full_assembly_report(
            [backbone] + records, target='@memory', enzyme='BsmBI',
            connector_records=connector_records,
            max_assemblies=40, fragments_filters='auto',
            assemblies_prefix='assembly'
        )
        zip_data = ('data:application/zip;base64,' +
                    b64encode(zip_data).decode("utf-8"))
        if nconstructs == 0:
            preview_html = 'No possible construct found, see report for more.'
        elif nconstructs == 1:
            preview_html = '1 construct was generated.'
        else:
            preview_html = "%d constructs were generated." % nconstructs

        return JobResult(
            preview_html=preview_html,
            file_data=zip_data,
            file_mimetype='application/zip',
            file_name='asm_report.zip'
        )

class SimulateCloningView(StartJobView):
    serializer_class = serializer_class
    worker_class = worker_class
