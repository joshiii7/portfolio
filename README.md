# Portfolio

My personal portfolio and freelance services site, live at [joshiii7.github.io/portfolio](https://joshiii7.github.io/portfolio/). It's an Angular app (standalone components, signals, SCSS) with no backend.

## Structure

- `src/app/pages/` - one folder per route: home (hero, services preview, projects preview, why me), about, services (list and detail), projects (list and detail), pricing, contact, privacy, accessibility
- `src/app/shared/` - reusable components (navbar, footer, page banner, accordion, contact form, cards, icons) and the `appReveal` scroll-reveal directive
- `src/app/core/` - typed models, content data (services, projects, skills, pricing, FAQs), and services (content, scroll, header height, page titles)
- `src/styles.scss` and `src/styles/` - global styles, design tokens, and shared utilities; section styles live next to each component
- `src/assets/` - images, SVG icons, and the standalone front-end demos under `assets/projects/`
- `public/` - `robots.txt` and `sitemap.xml`

## Running it

```
npm ci
npm start        # dev server at http://localhost:4200/portfolio/
npm run build    # production build in dist/portfolio/browser
```

The app is served under `/portfolio/` (see `<base href>` in `src/index.html`).

## Deploying

Pushes to `main` build the app and publish it via the GitHub Actions workflow in `.github/workflows/static.yml` (repo Settings > Pages > Source: GitHub Actions). The workflow also copies `index.html` to `404.html` so deep links work on GitHub Pages.
