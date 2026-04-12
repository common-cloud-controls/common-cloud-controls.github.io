# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

The website for [Common Cloud Controls](https://commoncloudcontrols.org) (CCC), a FINOS project defining reusable security controls for cloud services. Built with React 19 + Vite 7 + TypeScript. Deployed to GitHub Pages via GitHub Actions.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

There are no tests or linters configured in this project.

## Architecture

### Content Pipeline

Content is markdown files in `src/content/`, discovered at build/dev time by a custom Vite plugin (`contentManifestPlugin` in `vite.config.ts`):

1. Plugin scans `src/content/` for `.md` files, extracts frontmatter (title, description, path) via `gray-matter`
2. Emits `/content-manifest.json` listing all entries with section, slug, title, description, path
3. Copies `.md` files to `/content/` for runtime fetching
4. At runtime, `src/content/sections.ts` loads the manifest via async `fetch()` on app mount. Routes are generated only after manifest loads (gated by `ready` state in `App.tsx`)

### Catalog YAML Pipeline

A second Vite plugin (`catalogYamlPlugin` in `vite.config.ts`) serves YAML catalog files:
- Source files live in `public/data/catalogs/<category>/<service>/<type>/<version>.yaml`
- Plugin rewrites `/catalogs/**/*.yaml` requests to `/data/catalogs/**/*.yaml` in dev
- On build, copies YAML files to `dist/catalogs/` for direct URL access
- Markdown files in `src/content/catalogs/` reference these YAML files; `src/content/catalogUtils.ts` handles parsing

### Routing

`App.tsx` generates routes dynamically from `siteConfig.contentSections` (defined in `src/config/site.ts`). The `catalogs` section has special handling with dedicated page components for browsing by type (capabilities/threats/controls), category, and individual catalog items. A catch-all `<CatalogBrowsePage />` handles `/catalogs/*` paths not matched by specific routes.

### Configuration

`src/config/site.ts` is the single source of truth for site identity, navigation, footer, banner, and content section registration. Header nav is derived from `customNavLinks` and enabled `contentSections`. To add a new content section: create `src/content/<section>/` with markdown files and add an entry to `contentSections`.

### Styling

Uses CSS variables from `src/theme.tsx` (`--gf-color-*`, `--gf-space-*`, `--gf-font-*`). Global styles in `src/global.css`. Theme class is `slam-theme`.

## Content Authoring

Markdown files in `src/content/` use YAML frontmatter:

```yaml
---
title: "Page Title"
description: "Optional description"
path: "/catalogs/category/service/type/version"
---
```

Catalog content follows the directory structure: `src/content/catalogs/<category>/<service>/<type>/<version>.md`, with corresponding YAML data in `public/data/catalogs/` at the same relative path.

## Deployment

GitHub Actions workflow (`.github/workflows/pages.yml`) builds on push to `main`, copies `index.html` → `404.html` for SPA routing, and deploys `dist/` to GitHub Pages. The `base` in `vite.config.ts` is set to `"/"` for the org site (`common-cloud-controls.github.io`).

## Known Performance Issue

Synchronous XHR for the content manifest was replaced with async `fetch()` + 5s timeout to fix 24+ second load times caused by ad blockers. See the parent repo's CLAUDE.md for full details.
