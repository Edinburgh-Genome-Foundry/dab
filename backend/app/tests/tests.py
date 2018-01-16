"""Tests for the backend"""

from .tools import logprint, AppTestCase, load_file_to_dict, load_json

class GetConstructsAsGenbankTests(AppTestCase):
    endpoint = 'get_constructs_as_genbanks'
    defaults = dict(
        database_token='',
        constructsData={}
    )

    def test_emma_2_constructs_with_one_combinatorial(self):
        json = load_json('emma_2_constructs_with_one_combinatorial.json')
        response = self.run_job(json_request=json)
        self.assertTrue('zip_file' in response)


class GetConstructsAsPDFTests(AppTestCase):
    endpoint = 'get_constructs_as_pdf'
    defaults = dict(constructsData={})

    def test_emma_no_annotation_to_pdf(self):
        json = load_json('emma_no_annotation_to_pdf.json')
        response = self.run_job(json_request=json)
        self.assertTrue('pdf_file' in response)
