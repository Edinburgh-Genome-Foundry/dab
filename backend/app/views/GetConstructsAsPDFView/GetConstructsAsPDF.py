"""Bla."""

from rest_framework import serializers
from ..base import AsyncWorker, StartJobView, JobResult
from ..tools import data_to_html_data
from caravagene import Part, Construct, ConstructList

def category_sanitizer(category):
    if 'ATG' in category:
        return 'ATG'
    category = category.replace(' ', '-')
    category = {
        '5-3-homology-arm': 'five-prime-overhang',
        '5-3-ITR': 'ITR',
        '5-3-UTR': 'UTR',
        '3-5-homology-arm': 'three-prime-overhang',
    }.get(category, category)
    return category.replace(' ', '-')

def constructs_to_pdf_data(construct_designs, construct_templates,
                           project_name):

    constructs = []
    for construct in construct_designs:
        template = construct_templates[construct.templateName]
        enabled_slots = sorted([
            slot for (slot, enabled) in construct.enabledSlots.items()
            if enabled
        ], key=template.slotNames.index)
        parts = []
        for slot in enabled_slots:
            selected = construct.selectedParts[slot]
            if selected == []:
                enabled_categories = construct.categoriesEnabled[slot]
                categories = [
                    category
                    for category, enabled in enabled_categories.items()
                    if enabled
                ]
                category = categories[0]
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
    constructs = ConstructList(constructs, title=project_name,
                               font='Raleway')
    return constructs.to_pdf()


class serializer_class(serializers.Serializer):
    constructsData = serializers.JSONField()


class worker_class(AsyncWorker):

    def work(self):
        self.logger(message="Reading Data...")
        data = self.data.constructsData
        pdf_data = constructs_to_pdf_data(
            construct_designs=data.constructs,
            construct_templates=data.constructTemplates,
            project_name=data.projectName
        )
        name = data.projectName if len(data.projectName) else 'schema'

        return {
            'pdf_file': dict(
               name=name + '.pdf',
               data=data_to_html_data(pdf_data, datatype='pdf'),
               mimetype='application/pdf'
            )
        }

class GetConstructsAsPDFView(StartJobView):
    serializer_class = serializer_class
    worker_class = worker_class
