# CLAUDE.md - AI Assistant Guide for better-training

## Project Overview

**Project Name:** better-training
**Repository:** kreuzerreinhard62-cmyk/better-training
**Status:** Initial Setup

### Purpose
A lightweight, modern single-page application for tracking fitness training, workouts, exercises, nutrition, and physiological metrics. The project emphasizes simplicity, minimal dependencies, and a rough, brutalist-inspired design aesthetic.

### Tech Stack
- **Language(s):** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Framework(s):** None (framework-free by design)
- **Build Tools:** None (no build process required)
- **Testing:** Manual testing (no automated tests)
- **Package Manager:** None (zero npm dependencies)
- **Storage:** LocalStorage (client-side browser storage)
- **Architecture:** Hash-based SPA routing, MVC-inspired pattern

---

## Repository Structure

```
better-training/
├── index.html          # Main SPA entry point
├── css/
│   └── style.css       # Brutalist-inspired styling
├── js/
│   ├── app.js          # Main app logic, routing, and views
│   ├── db.js           # LocalStorage database wrapper
│   └── models.js       # Data models for all entities
├── CLAUDE.md           # AI assistant guide (this file)
└── README.md           # Project documentation
```

### Key Directories
- **css/**: Contains all stylesheets (currently just style.css)
- **js/**: Contains all JavaScript files (app logic, database, models)

### Important Files
- **index.html**: Main entry point - contains nav structure and loads all scripts
- **js/app.js**: Core application logic, SPA routing, and view rendering
- **js/db.js**: Simple database abstraction layer for LocalStorage
- **js/models.js**: Data models for Exercise, Workout, Nutrition, Physiology, Profile
- **css/style.css**: Brutalist-inspired design system with dark theme

---

## Development Workflow

### Branch Strategy

- **Main Branch:** [To be determined - typically `main` or `master`]
- **Feature Branches:** Use `claude/` prefix for AI-assisted development
- **Naming Convention:** `claude/[session-id]-[feature-description]`

### Development Process

1. **Before Starting Work:**
   - Pull latest changes from the main branch
   - Create or checkout your feature branch
   - Review existing code and tests

2. **During Development:**
   - Make incremental commits with clear messages
   - Run tests frequently to catch issues early
   - Follow existing code style and conventions
   - Document complex logic and decisions

3. **Before Committing:**
   - Run linters and formatters
   - Ensure all tests pass
   - Review changes for unintended modifications
   - Write meaningful commit messages

4. **Commit Message Format:**
   ```
   <type>: <short summary>

   <optional longer description>
   ```
   Types: feat, fix, docs, style, refactor, test, chore

5. **Creating Pull Requests:**
   - Ensure branch is up to date with main
   - Include description of changes and rationale
   - Reference related issues if applicable
   - Verify CI/CD checks pass

---

## Code Conventions

### Style Guidelines
- **Indentation:** 4 spaces
- **Line Length:** No strict limit, but keep reasonable (~100-120 chars)
- **Naming Conventions:**
  - Variables: camelCase (e.g., `workoutData`, `exerciseList`)
  - Functions: camelCase (e.g., `renderDashboard()`, `saveWorkout()`)
  - Objects/Namespaces: PascalCase (e.g., `App`, `Models`, `DB`)
  - Constants: camelCase for config, UPPER_SNAKE for true constants
- **Strings:** Single quotes for JS, double quotes for HTML attributes
- **CSS:** lowercase with hyphens (e.g., `.nav-title`, `--accent`)
- **Design:** Brutalist aesthetic - bold, minimal, high contrast, no gradients

### Best Practices

1. **Code Quality:**
   - Write self-documenting code with clear variable/function names
   - Keep functions small and focused on single responsibility
   - Avoid deep nesting (max 3-4 levels)
   - Prefer composition over inheritance
   - Handle errors gracefully with appropriate error messages

2. **Comments and Documentation:**
   - Add comments only when code intent isn't clear
   - Document complex algorithms and business logic
   - Keep comments up to date with code changes
   - Use docstrings/JSDoc for public APIs

3. **Testing:**
   - Write tests for new features
   - Maintain or improve test coverage
   - Test edge cases and error conditions
   - Keep tests independent and deterministic

4. **Security:**
   - Never commit secrets, API keys, or credentials
   - Validate and sanitize user input
   - Use parameterized queries for database operations
   - Follow OWASP guidelines for web applications
   - Keep dependencies updated

5. **Performance:**
   - Avoid premature optimization
   - Profile before optimizing
   - Consider memory usage for large datasets
   - Use appropriate data structures and algorithms

---

## Common Tasks

### Setup and Installation
```bash
# Clone the repository
git clone <repo-url>
cd better-training

# No installation required! Just open index.html
```

### Running the Application
```bash
# Option 1: Open directly in browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows

# Option 2: Use a simple HTTP server (recommended for development)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Use any other local server
npx serve .
```

### Running Tests
```bash
# No automated tests - manual testing only
# Open the app in a browser and test features manually
```

### Linting and Formatting
```bash
# No linters configured - keep code clean manually
# Follow the style guidelines in this document
```

### Building for Production
```bash
# No build process needed!
# Just deploy the files to any static hosting:
# - GitHub Pages
# - Netlify
# - Vercel
# - Any HTTP server
```

---

## Architecture and Design Patterns

### High-Level Architecture
Single-page application using hash-based routing with a simple MVC-inspired pattern:
- **Model**: Data models in `models.js` handle business logic and data structure
- **View**: HTML templates rendered dynamically by `app.js` functions
- **Controller**: `App` object manages routing, user interactions, and view updates
- **Storage**: `DB` object provides abstraction over LocalStorage

### Design Patterns Used
- **Module Pattern**: `App`, `Models`, `DB` are singleton objects that encapsulate functionality
- **Repository Pattern**: `DB` object provides CRUD operations abstraction
- **Factory Pattern**: Model objects have `create()` methods for object creation
- **Hash Routing**: URL hash changes trigger view updates without page reloads

### Key Components
- **App (app.js)**: Main controller - handles routing, view rendering, user interactions
- **DB (db.js)**: Data persistence layer - wraps LocalStorage with CRUD operations
- **Models (models.js)**: Business logic and data structures for all entities
- **Views**: Dynamically generated HTML strings returned by render functions

### Data Flow
1. User interacts with UI (clicks link, submits form)
2. Event handler in `App` processes the action
3. Data is saved/retrieved via `Models` which use `DB`
4. `DB` reads/writes to LocalStorage
5. View is re-rendered with updated data
6. HTML is injected into the DOM

---

## Dependencies and External Services

### Critical Dependencies
**None!** This project has zero dependencies by design. Everything runs in the browser using:
- Vanilla JavaScript (ES6+)
- Web Storage API (LocalStorage)
- Native browser capabilities

### External Services
**None.** All data is stored locally in the browser. No external APIs, databases, or authentication services are used.

### Environment Variables
**None required.** The application is purely client-side and requires no configuration.

---

## Testing Strategy

### Test Types
- **Manual Testing**: Primary testing method - test features in the browser
- **Unit Tests**: Not implemented (no test framework)
- **Integration Tests**: Not implemented
- **E2E Tests**: Not applicable

### Test Coverage Goals
Manual testing should cover:
- All CRUD operations for each data type (Exercise, Workout, Nutrition, Physiology, Profile)
- Navigation between all views
- Form validation and error handling
- Data export/import functionality
- LocalStorage persistence across page reloads

### Running Specific Tests
```bash
# Manual testing checklist:
# 1. Open index.html in browser
# 2. Test each view (dashboard, workouts, exercises, nutrition, physiology, profile)
# 3. Create, view, update, and delete records in each section
# 4. Test data export and import
# 5. Verify data persists after page reload
# 6. Test responsive layout on different screen sizes
```

---

## Debugging and Troubleshooting

### Common Issues

#### Data Not Persisting
- **Symptoms:** Data disappears after page reload
- **Cause:** LocalStorage might be disabled or in private/incognito mode
- **Solution:** Use regular browser mode, check browser storage settings

#### View Not Updating After Data Change
- **Symptoms:** UI doesn't reflect recent changes
- **Cause:** View wasn't re-rendered after data modification
- **Solution:** Ensure `App.route()` or specific render function is called after data changes

#### Forms Not Working
- **Symptoms:** Form submission doesn't do anything
- **Cause:** JavaScript errors or event handler not attached
- **Solution:** Check browser console for errors, verify `onsubmit` handlers are correct

### Debug Tools
- **Browser DevTools**: Primary debugging tool (F12)
- **Console**: View logs, errors, and inspect objects
- **Application Tab**: Inspect LocalStorage contents
- **Network Tab**: Not needed (no network requests)
- **Elements Tab**: Inspect generated DOM and styles

### Logging
No formal logging system. Use `console.log()`, `console.warn()`, `console.error()` for debugging during development. Remove debug logs before committing.

---

## AI Assistant Guidelines

### When Reading Code
1. Always read files before suggesting modifications
2. Understand the full context before making changes
3. Look for existing patterns and follow them
4. Check for related tests that may need updates

### When Writing Code
1. Follow existing code style and conventions
2. Prefer editing existing files over creating new ones
3. Keep changes minimal and focused
4. Add tests for new functionality
5. Update documentation when changing behavior

### When Refactoring
1. Ensure tests pass before starting
2. Make small, incremental changes
3. Run tests after each change
4. Don't combine refactoring with feature work
5. Keep the scope limited and focused

### What to Avoid
- Don't add unnecessary features or "improvements"
- Don't refactor code not related to the current task
- Don't add comments to unchanged code
- Don't create abstractions for single-use cases
- Don't commit commented-out code
- Don't make assumptions about requirements

### Security Considerations
- Review code for common vulnerabilities
- Avoid storing secrets in code
- Validate input at system boundaries
- Use secure dependencies
- Follow principle of least privilege

---

## Git Workflow for AI Assistants

### Push Retry Logic
If `git push` fails due to network errors:
1. Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)
2. Always use `git push -u origin <branch-name>`
3. Branch must start with `claude/` prefix

### Commit Guidelines
1. Review changes with `git status` and `git diff`
2. Stage relevant files with `git add`
3. Write descriptive commit messages
4. Verify commit success with `git status`

### Never
- Push to wrong branch without permission
- Force push to main/master
- Skip hooks (--no-verify)
- Update git config
- Amend commits from other developers

---

## Resources

### Documentation
- [Internal docs location]
- [API documentation]
- [Architecture diagrams]

### Related Projects
- [Project name]: [Relationship]

### Useful Links
- [Resource name]: [URL]

---

## Contact and Support

### Project Maintainers
- [Name/Handle]: [Role/Responsibility]

### Getting Help
- [Issue tracker location]
- [Communication channel]
- [Documentation site]

---

## Changelog

### 2025-11-23 - Initial Project Setup
- Created complete SPA structure with vanilla JavaScript
- Implemented hash-based routing system
- Built LocalStorage database layer with CRUD operations
- Created data models for Exercise, Workout, Nutrition, Physiology, Profile
- Designed brutalist-inspired dark theme CSS
- Implemented all core views (dashboard, workouts, exercises, nutrition, physiology, profile)
- Added data export/import functionality
- Loaded sample exercise data
- Created comprehensive CLAUDE.md guide
- Added README.md documentation

---

## Notes for Future Updates

This CLAUDE.md file should be updated as the project evolves:

1. **After adding dependencies:** Update the Dependencies section
2. **After defining architecture:** Fill in Architecture and Design Patterns
3. **After setting up tooling:** Update Common Tasks with actual commands
4. **After establishing conventions:** Document them in Code Conventions
5. **When issues are discovered:** Add to Debugging and Troubleshooting
6. **As project grows:** Add new sections as needed

Keep this file current and comprehensive - it's the primary guide for AI assistants working on this codebase.
