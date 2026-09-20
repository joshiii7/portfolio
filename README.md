# Portfolio

My personal portfolio and freelance services site, live at [joshiii7-portfolio.vercel.app](https://joshiii7-portfolio.vercel.app/). It's an Angular app (standalone components, signals, SCSS) with a single Vercel serverless function (`api/send-mail.js`) for the contact form.

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
npm start        # dev server at http://localhost:4200/ (no contact form API)
npm run build    # production build in dist/portfolio/browser
vercel dev       # app plus /api/send-mail, needs SMTP variables (see .env.example)
```

The app is served from the site root (`<base href="/">` in `src/index.html`).

## Deploying

The site is deployed on Vercel from `main` (config in `vercel.json`). The SMTP variables from `.env.example` are set in the Vercel dashboard. `.github/workflows/ci.yml` only checks that the build passes.

`.github/workflows/static.yml` is a manual-only GitHub Pages deploy under `/portfolio/`. That copy has no `/api/send-mail`, so its contact form does not work.
