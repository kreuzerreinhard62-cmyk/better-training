# CLAUDE.md - AI Assistant Guide for better-training

## Project Overview

**Project Name:** better-training
**Repository:** kreuzerreinhard62-cmyk/better-training
**Status:** Initial Setup

### Purpose
<!-- Describe the main purpose and goals of this project -->
This project aims to [INSERT PROJECT DESCRIPTION HERE].

### Tech Stack
<!-- List the primary technologies, frameworks, and tools used -->
- **Language(s):** [To be determined]
- **Framework(s):** [To be determined]
- **Build Tools:** [To be determined]
- **Testing:** [To be determined]
- **Package Manager:** [To be determined]

---

## Repository Structure

```
better-training/
├── [To be populated as project develops]
```

### Key Directories
<!-- Describe the purpose of each major directory -->
- **[directory]**: [purpose]

### Important Files
<!-- List critical configuration and documentation files -->
- **[file]**: [purpose]

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
<!-- Define coding style preferences -->
- **Indentation:** [tabs/spaces and size]
- **Line Length:** [max characters]
- **Naming Conventions:**
  - Variables: [convention]
  - Functions: [convention]
  - Classes: [convention]
  - Constants: [convention]

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
# To be filled in once project structure is established
```

### Running the Application
```bash
# To be filled in
```

### Running Tests
```bash
# To be filled in
```

### Linting and Formatting
```bash
# To be filled in
```

### Building for Production
```bash
# To be filled in
```

---

## Architecture and Design Patterns

### High-Level Architecture
<!-- Describe the overall architecture -->
[To be documented as project develops]

### Design Patterns Used
<!-- List and explain design patterns employed -->
- [Pattern]: [Usage and rationale]

### Key Components
<!-- Describe major components and their interactions -->
- **[Component]**: [Description and responsibilities]

### Data Flow
<!-- Explain how data moves through the system -->
[To be documented]

---

## Dependencies and External Services

### Critical Dependencies
<!-- List important dependencies and their purposes -->
- **[Package]**: [Purpose] - [Documentation link]

### External Services
<!-- Document external APIs, databases, or services -->
- **[Service]**: [Purpose] - [Authentication method]

### Environment Variables
<!-- List required environment variables -->
- `[VAR_NAME]`: [Description] - [Default/Example]

---

## Testing Strategy

### Test Types
- **Unit Tests:** [Location and naming convention]
- **Integration Tests:** [Location and approach]
- **E2E Tests:** [If applicable]

### Test Coverage Goals
- Minimum coverage: [percentage]
- Critical paths: [100% or specific requirements]

### Running Specific Tests
```bash
# To be filled in
```

---

## Debugging and Troubleshooting

### Common Issues

#### [Issue Name]
- **Symptoms:** [Description]
- **Cause:** [Explanation]
- **Solution:** [Steps to resolve]

### Debug Tools
- [Tool]: [Usage]

### Logging
- Log levels: [debug, info, warn, error]
- Log location: [path or service]

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

### [Date] - Initial Setup
- Created CLAUDE.md template
- Initialized repository structure

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
