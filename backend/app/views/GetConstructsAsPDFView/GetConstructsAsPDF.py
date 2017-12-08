"""Bla."""

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView, JobResult
from ..tools import data_to_html_data
from caravagene import Part, Construct, ConstructList

class serializer_class(serializers.Serializer):
    constructsData = serializers.JSONField()

class worker_class(AsyncWorker):

    def work(self):
        self.set_progress_message("Reading Data...")
        data = self.data.constructsData

        def category_sanitizer(category):
            if 'ATG' in category:
                return 'ATG'
            category = category.replace(' ', '-')
            category = {
                '5-3-homology-arm': 'five-prime-overhang',
                '5-3-ITR': 'ITR',
                '3-5-homology-arm': 'three-prime-overhang',
            }.get(category, category)
            return category.replace(' ', '-')

        constructs = []
        for construct in data.constructs:
            template = data.constructTemplates[construct.templateName]
            enabled_slots = sorted([
                slot for (slot, enabled) in construct.enabledSlots.items()
                if enabled
            ], key=template.slotNames.index)
            parts = []
            for slot in enabled_slots:
                selected = construct.selectedParts[slot]
                if selected == []:
                    category = construct.categoriesEnabled[0]
                    category = category_sanitizer(category)
                    parts.append(Part(category=category, subscript=slot))
                else:
                    part = selected[0]
                    others = len(selected) - 1
                    sublabel = '' if (others == 0) else "+%d others" % others
                    category = category_sanitizer(part.dbType)
                    parts.append(Part(category=category, label=part.dbName,
                                      sublabel=sublabel, subscript=slot))
            constructs.append(Construct(parts, name=construct.name))
        constructs = ConstructList(constructs, title=data.projectName,
                                   font='Raleway')
        pdf_data = constructs.to_pdf()
        name = data.projectName if len(data.projectName) else 'schema'

        return {
            'pdf_file': dict(
               name=name + '.pdf',
               data=data_to_html_data(pdf_data, datatype='pdf'),
               mimetype='application/pdf'
            )
        }


        return JobResult(
            preview_html=preview_html,
            file_data=zip_data,
            file_mimetype='application/zip',
            file_name='asm_report.zip'
        )

class GetConstructsAsPDFView(StartJobView):
    serializer_class = serializer_class
    worker_class = worker_class
