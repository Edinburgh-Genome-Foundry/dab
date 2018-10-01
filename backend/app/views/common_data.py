import os
from dnacauldron import load_record
import flametree

data_path = os.path.join("app", "data")
data_dir = flametree.file_tree(data_path)
#
# with open(data_path, "r") as f:
#     DATA = f.read()

connector_records = [
    load_record(f._path, linear=False, id=f._name_no_extension)
    for f in data_dir.genbank.connectors._all_files
    if f._extension == "gb"
]

backbone = load_record(data_dir.genbank.hc_amp_backbone_gb._path,
                        linear=False, id='hc_amp_backbone')
backbone.is_backbone = True
