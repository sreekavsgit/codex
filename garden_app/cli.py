import argparse
from datetime import datetime

from .data import load_plants
from .scheduler import send_schedule


def list_plants():
    plants = load_plants()
    for name, info in plants.items():
        print(f"{name.title()} ({info['type']})")


def plant_info(name: str):
    plants = load_plants()
    info = plants.get(name)
    if not info:
        print(f"Unknown plant '{name}'")
        return
    print(f"Information for {name}:")
    for key, value in info.items():
        print(f"  {key.replace('_', ' ').title()}: {value}")


def schedule(name: str, email: str, start: str, simulate: bool):
    start_date = datetime.fromisoformat(start)
    schedule = send_schedule(email, name, start_date, simulate=simulate)
    for date, msg in schedule:
        print(f"Scheduled reminder {date.date()}: {msg}")


def main():
    parser = argparse.ArgumentParser(description="Simple gardening helper")
    sub = parser.add_subparsers(dest="command")

    sub.add_parser("list", help="List available plants")

    info_p = sub.add_parser("info", help="Show info for plant")
    info_p.add_argument("name")

    sched_p = sub.add_parser("schedule", help="Schedule email reminders")
    sched_p.add_argument("name")
    sched_p.add_argument("email")
    sched_p.add_argument("start", help="Start date YYYY-MM-DD")
    sched_p.add_argument("--simulate", action="store_true", help="Print emails instead of sending")

    args = parser.parse_args()

    if args.command == "list":
        list_plants()
    elif args.command == "info":
        plant_info(args.name)
    elif args.command == "schedule":
        schedule(args.name, args.email, args.start, args.simulate)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
