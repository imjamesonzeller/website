## Jameson Zeller — Portfolio

Personal site showcasing my work, projects, and Tasklight resources. Built with React, TypeScript, and Vite with modular components, shared styling, and typed data models.

### Highlights
- Dark/light theme toggle powered by a context that syncs with user preferences.
- Hero animations (headshot + “When I log off” text) handled through custom React hooks.
- Project cards sourced from JSON and rendered via typed components.
- Tasklight and Word Search pages preserve their detailed copy, video embeds, and download links.
- Word Search generator calls the public API with improved validation, responsive statuses, and a styled CSV download.

### Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

### Next Ideas
1. Hook up automated tests for the rotating-content and current-read hooks.
2. Explore MDX or a lightweight CMS for editing page copy without code changes.
