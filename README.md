# Hempioneers

Static Next.js rebuild of [hempioneers.com](https://hempioneers.com) from the WordPress export.

- Posts live at `/blog/<slug>`
- Pages keep original WordPress paths
- Legacy post permalinks 301 to `/blog/<slug>` via `next.config.ts` + `redirects.json`
- Tags and author archives were intentionally not ported

## Local

```bash
npm install
node scripts/generate-pages.mjs
node scripts/build-redirects.mjs
npm run build
npm run start
```
