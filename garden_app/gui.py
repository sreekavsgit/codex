import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime

from .data import load_plants
from .scheduler import send_schedule


def run_gui():
    """Launch a simple Tkinter interface for the garden app."""
    plants = load_plants()
    if not plants:
        raise RuntimeError("No plant data available")

    root = tk.Tk()
    root.title("Garden Helper")

    plant_var = tk.StringVar(value=list(plants.keys())[0])

    def update_info(*_):
        info = plants.get(plant_var.get(), {})
        lines = []
        for key, value in info.items():
            lines.append(f"{key.replace('_', ' ').title()}: {value}")
        info_box.config(state="normal")
        info_box.delete("1.0", tk.END)
        info_box.insert(tk.END, "\n".join(lines))
        info_box.config(state="disabled")

    plant_menu = ttk.Combobox(root, textvariable=plant_var, values=list(plants.keys()))
    plant_menu.pack(padx=10, pady=5)
    plant_menu.bind("<<ComboboxSelected>>", update_info)

    info_box = tk.Text(root, width=50, height=10)
    info_box.pack(padx=10, pady=5)
    info_box.config(state="disabled")

    email_var = tk.StringVar()
    start_var = tk.StringVar()

    tk.Label(root, text="Email:").pack()
    tk.Entry(root, textvariable=email_var).pack(fill="x", padx=10)

    tk.Label(root, text="Start date YYYY-MM-DD:").pack()
    tk.Entry(root, textvariable=start_var).pack(fill="x", padx=10)

    def do_schedule():
        try:
            start_date = datetime.fromisoformat(start_var.get())
        except ValueError:
            messagebox.showerror("Invalid date", "Enter a valid date YYYY-MM-DD")
            return
        try:
            schedule = send_schedule(
                email_var.get(), plant_var.get(), start_date, simulate=True
            )
        except Exception as exc:
            messagebox.showerror("Error", str(exc))
            return
        msg = "\n".join(f"{d.date()}: {m}" for d, m in schedule)
        messagebox.showinfo("Schedule", f"Scheduled reminders (simulated):\n{msg}")

    tk.Button(root, text="Send schedule (simulate)", command=do_schedule).pack(pady=10)

    update_info()
    root.mainloop()


if __name__ == "__main__":
    run_gui()
