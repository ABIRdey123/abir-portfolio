# Abir Dey — Portfolio

Personal portfolio site built with Next.js 15, React 19, Tailwind CSS v4 and lucide-react.

## Getting started

Requires [Node.js](https://nodejs.org/) 18.18 or newer (the LTS release is recommended).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Editing content

All text, links, projects and skills live in [`src/lib/data.ts`](src/lib/data.ts). Every section reads from there.

Before publishing:

- Replace the placeholder `email`, `github` and `linkedin` values in `profile`.
- Add your CV as `public/resume.pdf`. The "Download Resume" button only appears once that file exists.
- Optionally set `link` on any project to show a GitHub/paper link on its card.

## Structure

```
src/
  app/          layout, page, global styles, favicon (icon.svg)
  components/   one component per section (Hero, Education, Projects, Skills, Footer)
  lib/data.ts   site content
public/         static files (resume.pdf goes here)
```

## Deploying

Live at <https://abir-portfolio-rosy.vercel.app>.

The GitHub repo is connected to Vercel, so every push to `main` deploys automatically:

```bash
git add -A
git commit -m "Describe your change"
git push
```

Pushes to other branches get their own preview URL. Build status and logs are in the Vercel dashboard.
