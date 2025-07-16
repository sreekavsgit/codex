import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from datetime import datetime
from garden_app.scheduler import build_schedule
from garden_app.data import load_plants


def test_build_schedule():
    plants = load_plants()
    start = datetime(2023, 4, 1)
    schedule = build_schedule(plants['tomato'], start, 'tomato')
    assert schedule
    assert any('Fertilize' in m for _, m in schedule)
    assert all('tomato' in m for _, m in schedule)
