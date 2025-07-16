from datetime import datetime, timedelta
from typing import Dict, List

from .email_util import send_email
from .data import load_plants


def build_schedule(plant_info: Dict[str, str], start_date: datetime, plant_name: str) -> List[tuple]:
    """Return list of (date, message) tuples for reminders."""
    reminders = []
    seed_start = plant_info.get('seed_start')
    if seed_start:
        reminders.append(
            (start_date, f"Start {plant_name} ({plant_info['type']}): {seed_start}")
        )
    fert = plant_info.get('fertilization')
    if fert:
        fert_date = start_date + timedelta(days=30)
        reminders.append(
            (fert_date, f"Fertilize {plant_name} ({plant_info['type']}): {fert}")
        )
    return reminders


def send_schedule(email: str, plant_name: str, start_date: datetime, simulate: bool = False) -> List[tuple]:
    plants = load_plants()
    info = plants.get(plant_name)
    if not info:
        raise ValueError(f"Unknown plant '{plant_name}'")
    schedule = build_schedule(info, start_date, plant_name)
    for date, msg in schedule:
        subject = f"Gardening reminder for {plant_name}"
        body = f"Reminder for {date.date()}: {msg}"
        send_email(email, subject, body, simulate=simulate)
    return schedule
