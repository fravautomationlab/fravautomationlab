# FRAV Studio

FRAV Studio is a static React website built with Vite.

## Run locally

Requires Node.js 20.19 or newer.

```sh
npm install
npm run dev
```

## Build and deploy

```sh
npm run build
```

Upload the contents of `dist/` to any static host. The site uses relative asset paths and does not require a server runtime, API key, or hosting-provider-specific adapter.

The homepage is served at `/`. The public pages are `/web`, `/automation`, and `/about`. Vercel direct-route rewrites are configured in `vercel.json`; other static hosts must be configured to serve the generated route HTML files for those paths.

Set `VITE_SITE_URL` to the production origin before building when a custom domain is available (for example, `VITE_SITE_URL=https://your-production-domain`). Vercel builds also use `VERCEL_PROJECT_PRODUCTION_URL` when `VITE_SITE_URL` is not set. The build generates route-specific metadata, `robots.txt`, and `sitemap.xml` using that production origin.

To test the production build locally:

```sh
npm run preview
```
