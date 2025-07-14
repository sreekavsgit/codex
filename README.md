| Feature/Tool       | ChatGPT Plus (Codex via GPT-4) | GitHub Copilot             |
| ------------------ | ------------------------------ | -------------------------- |
| Interface          | Chat-based (via browser)       | IDE integration            |
| Real-time coding   | ❌ (not in IDE)                 | ✅                          |
| Deep explanations  | ✅ (excellent for learning)     | ❌ (minimal explanations)   |
| Multi-file context | ✅ (if pasted) or described     | ❌ (limited context window) |
| Prompting style    | Natural language               | Minimal (tab completion)   |
| Custom workflows   | ✅ (flexible via chat)          | ❌                          |
| Debugging help     | ✅                              | ❌                          |

## Gardening App

This repository now includes a minimal gardening helper. It stores common plant information and can send email reminders.

### Usage

Run the command line interface:

```bash
python -m garden_app list
python -m garden_app info tomato
python -m garden_app schedule tomato you@example.com 2024-04-01 --simulate
```

Set `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` environment variables to send real emails. Use `--simulate` to print the messages instead.
