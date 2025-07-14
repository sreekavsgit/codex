import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from garden_app.data import load_plants


def test_load_plants():
    plants = load_plants()
    assert 'tomato' in plants
    assert plants['tomato']['type'] == 'vegetable'
