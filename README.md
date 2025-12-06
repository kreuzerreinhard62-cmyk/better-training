# better-training

A lightweight, modern SPA for tracking training, workouts, nutrition, and physiology data.

## Features

- **Dashboard**: Overview of recent activity and quick stats
- **Workouts**: Create and track workout sessions with exercises, sets, and reps
- **Exercises**: Manage exercise library with categories and muscle groups
- **Nutrition**: Log meals and track macros
- **Physiology**: Monitor body metrics, sleep, energy, and stress
- **Profile**: Set fitness goals and manage personal data
- **History Tracking**: View personal records and exercise history

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Storage**: LocalStorage (client-side)
- **Routing**: Hash-based SPA routing
- **Design**: Brutalist-inspired, minimal aesthetic
- **Dependencies**: Zero npm packages, zero build tools

## How to Run

### Method 1: Direct File Opening (Simplest)

Just open the file directly in your browser:

**macOS:**
```bash
open index.html
```

**Linux:**
```bash
xdg-open index.html
```

**Windows:**
```bash
start index.html
```

Or simply double-click `index.html` in your file explorer.

### Method 2: Local HTTP Server (Recommended)

For the best development experience, use a local HTTP server:

#### Using Python (Built-in)

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

#### Using Node.js

**http-server (install once):**
```bash
npx http-server -p 8000
```

**serve:**
```bash
npx serve -p 8000
```

Then open: **http://localhost:8000**

#### Using PHP
```bash
php -S localhost:8000
```

Then open: **http://localhost:8000**

### Method 3: VS Code Live Server

If you use VS Code:

1. Install the "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

The app will open automatically with live reload.

## Requirements

- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **JavaScript**: Must be enabled
- **LocalStorage**: Must be available (works in regular browsing mode)
- **Internet**: Not required (app works 100% offline)

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

**Note:** Private/Incognito mode may limit LocalStorage functionality.

## Project Structure

```
better-training/
├── index.html              # Main entry point
├── css/
│   └── style.css           # Brutalist-inspired styling
├── js/
│   ├── app.js              # App logic and SPA routing
│   ├── db.js               # LocalStorage database wrapper
│   ├── models.js           # Data models (Exercise, Workout, etc.)
│   └── exercises-data.js   # Sample exercise library
├── README.md               # This file
└── CLAUDE.md               # AI assistant guide
```

## Usage Guide

### First Time Setup

1. **Run the app** using any method above
2. **Navigate** using the menu: dashboard, exercises, workouts, nutrition, physiology, profile
3. **Start tracking**:
   - Add exercises from the pre-loaded library
   - Create your first workout
   - Log nutrition and body metrics
   - Set your fitness goals in profile

### Navigation

The app uses hash-based routing. URLs look like:
- `#dashboard` - Overview and stats
- `#exercises` - Exercise library
- `#workouts` - Workout log
- `#nutrition` - Meal tracking
- `#physiology` - Body metrics
- `#profile` - Settings and data management

### Data Management

All data is stored locally in your browser's LocalStorage.

#### Export Data
1. Go to Profile page
2. Click "Export Data"
3. Downloads a JSON file with all your data

#### Import Data
1. Go to Profile page
2. Click "Import Data"
3. Select a previously exported JSON file

#### Clear Data
1. Go to Profile page
2. Click "Clear All Data"
3. Confirm (this cannot be undone!)

**Tip:** Export your data regularly as a backup.

## Development

### Making Changes

No build process needed:

1. Edit HTML, CSS, or JavaScript files
2. Refresh your browser
3. Changes appear immediately

### Code Style

- **Indentation**: 4 spaces
- **Naming**: camelCase for variables/functions
- **Design**: Keep it brutal, minimal, high contrast
- **Comments**: Only when necessary

### Testing

Manual testing only:
1. Test all CRUD operations (Create, Read, Update, Delete)
2. Check data persists after page reload
3. Verify export/import functionality
4. Test on different screen sizes

## Troubleshooting

### Data Not Saving

**Problem:** Changes disappear after refresh

**Solutions:**
- Check if JavaScript is enabled
- Ensure you're not in Private/Incognito mode
- Clear browser cache and try again
- Check browser console for errors (F12)

### Blank Page

**Problem:** Page loads but shows nothing

**Solutions:**
- Open browser console (F12) and check for errors
- Verify all JavaScript files are loading
- Try a different browser
- Clear LocalStorage: `localStorage.clear()` in console

### Styles Not Loading

**Problem:** Page works but looks unstyled

**Solutions:**
- Check that `css/style.css` exists
- Verify the file path in `index.html`
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache

### LocalStorage Full

**Problem:** "QuotaExceededError" in console

**Solutions:**
- Export your data first (backup!)
- Clear some old records
- Use browser's Clear Site Data option
- Most browsers allow 5-10MB per domain

## Deployment

Deploy to any static hosting service:

### GitHub Pages
```bash
git push origin main
# Enable GitHub Pages in repository settings
```

### Netlify
```bash
# Drag and drop the project folder
# Or connect your GitHub repository
```

### Vercel
```bash
vercel deploy
```

### Any HTTP Server
Upload all files to your web server. No special configuration needed.

## Features in Detail

### Dashboard
- Recent workouts summary
- Exercise history
- Personal records
- Quick stats

### Workouts
- Create workout sessions
- Add exercises with sets/reps/weight
- Track workout duration
- View workout history

### Exercises
- Pre-loaded exercise library
- Filter by category and muscle group
- Add custom exercises
- View exercise details

### Nutrition
- Log meals with macros
- Track calories, protein, carbs, fats
- Daily nutrition summary
- Meal history

### Physiology
- Track body weight and body fat
- Monitor sleep hours
- Rate energy and stress levels
- View trends over time

### Profile
- Set fitness goals
- Manage personal data
- Export/import data
- Clear all data

## Performance

- **Load time**: < 100ms (no dependencies)
- **Bundle size**: < 50KB total (uncompressed)
- **Offline**: Works 100% offline after first load
- **Storage**: Uses ~1-5MB depending on data

## Security & Privacy

- ✅ **No tracking**: Zero analytics, zero cookies
- ✅ **No server**: Data never leaves your device
- ✅ **No account**: No signup, no passwords
- ✅ **Open source**: Full code transparency

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m "feat: add feature"`
6. Push: `git push origin feature-name`
7. Open a Pull Request

## License

MIT
