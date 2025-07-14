import json
from pathlib import Path

DATA_FILE = Path(__file__).with_name('plants.json')


def load_plants():
    with DATA_FILE.open() as f:
        return json.load(f)
