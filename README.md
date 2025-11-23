# better-training

A lightweight, modern SPA for tracking training, workouts, nutrition, and physiology data.

## Features

- **Workouts**: Create and track workout sessions
- **Exercises**: Manage exercise library with categories and muscle groups
- **Nutrition**: Log meals and track macros
- **Physiology**: Monitor body metrics, sleep, energy, and stress
- **Profile**: Set fitness goals and manage personal data

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Storage**: LocalStorage (client-side)
- **Routing**: Hash-based SPA routing
- **Design**: Brutalist-inspired, minimal aesthetic

## Quick Start

1. Open `index.html` in a modern web browser
2. No build process, no dependencies, no server required

That's it. Just open the file.

## Project Structure

```
better-training/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Styling
├── js/
│   ├── app.js          # App logic and routing
│   ├── db.js           # LocalStorage database layer
│   └── models.js       # Data models
└── README.md
```

## Data Storage

All data is stored locally in your browser's LocalStorage.

- **Export**: Download your data as JSON from the profile page
- **Import**: Upload previously exported JSON data
- **Clear**: Remove all data (with confirmation)

## Development

No build tools required. Just edit the files and refresh your browser.

## License

MIT
