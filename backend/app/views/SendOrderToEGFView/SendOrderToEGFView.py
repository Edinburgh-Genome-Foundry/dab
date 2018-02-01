"""Bla."""

import base64
import json

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView
from ..tools import data_to_html_data
from flametree import file_tree
from ..GetConstructsAsGenbankView import construct_data_to_assemblies_sequences
from ..GetConstructsAsPDFView import constructs_to_pdf_data
import requests

email_body_template = """
<p>Hi there,</p>

<p>Customer {customer.name} ({customer.email}) ordered {n_constructs} constructs.</p>

<p>{comment}<p>

<p>Bye!<p>
"""

class serializer_class(serializers.Serializer):
    database_token = serializers.CharField()
    constructsData = serializers.JSONField()
    customer = serializers.JSONField()


class worker_class(AsyncWorker):

    def work(self):
        self.logger(message="Verifying Constructs...")
        data = self.data
        zip_data, errors = construct_data_to_assemblies_sequences(
            constructs=data.constructsData.constructs,
            database_token=data.database_token,
            logger=self.logger
        )
        name = data.constructsData.projectName
        if name == '':
            name = 'sequences'
        error_message = ''
        if errors['no_assembly'] != []:
            error_message += (
                "The following constructs gave no assembly: " +
                ", ".join(errors['no_assembly']) + ". "
            )
        zip_file = dict(
            name=name + '.zip',
            data=data_to_html_data(zip_data, datatype='zip'),
            mimetype='application/zip'
        )
        if error_message != '':
            return {
                'zip_file': zip_file,
                'error': {'message': error_message},
                'message': 'There were errors while proceeding this order. '
                           'If you think the errors are correct, contact the '
                           'EGF for support'
            }

        # REACHING THIS POINT MEANS THE SIMULATION CLONING WAS SUCCESSFUL
        sequences_b64_data = base64.b64encode(zip_data).decode()

        pdf_data = constructs_to_pdf_data(
            construct_designs=data.constructsData.constructs,
            construct_templates=data.constructsData.constructTemplates,
            project_name=data.constructsData.projectName
        )
        pdf_b64_data = base64.b64encode(pdf_data).decode()

        schema_json_data = json.dumps(self.data.constructsData, indent=2)
        schema_json_data = schema_json_data.encode('utf8')
        schema_json_b64_data = base64.b64encode(schema_json_data).decode()
        # SEND FILE
        n_constructs = len(data.constructsData.constructs)
        if data.customer.comment == '':
            comment = "(There was no customer comment)"
        else:
            comment = 'The customer comment was:\n' + data.customer.comment
        body = email_body_template.format(customer=data.customer,
                                          comment=comment,
                                          n_constructs=n_constructs)
        body_b64 = base64.b64encode(bytes(body.encode('utf8'))).decode()
        attachments = [
            dict(file_name="sequences.zip", content=sequences_b64_data),
            dict(file_name="designs_plots.pdf", content=pdf_b64_data),
            dict(file_name="designs.json", content=schema_json_b64_data)
        ]
        # attachments = ",".join([json.dumps(a) for a in attachments])
        email_api_json = dict(
            to="VZ",
            subject="New order from %s" % data.customer.name,
            body64=body_b64,
            attachments=json.dumps(attachments)
        )
        api = 'https://utils.genomefoundry.org/rest/sendEmail'
        self.logger(message='Order validated. Sending to EGF...')
        response = requests.post(api, data=email_api_json)
        if response.status_code == 200:
            return {
                'zip_file': zip_file,
                'message': 'The order was sent. The EGF will contact you soon.'
            }
        else:
            return {
                'zip_file': zip_file,
                'error': {'message': 'There was a problem sending the order '
                                     'to the EGF. If the problem persists, '
                                     'please contact the EGF directly. Sorry '
                                     'for the trouble :('}
            }


class SendOrderToEGFView(StartJobView):
    serializer_class = serializer_class
    worker_class = worker_class
