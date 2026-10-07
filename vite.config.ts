import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig, loadEnv} from 'vite';

const pageMetadata = [
  {
    path: '/',
    title: 'FRAV Automation | Website Development & AI Automation',
    description:
      'FRAV Automation is a technology studio creating premium websites, interactive digital experiences, AI agents, and business workflow automation.',
  },
  {
    path: '/web',
    title: 'Website Development | FRAV Automation',
    description:
      'FRAV Automation designs and builds premium, responsive websites and interactive digital experiences, from visual direction through production-ready development.',
  },
  {
    path: '/automation',
    title: 'AI Automation | FRAV Automation',
    description:
      'FRAV Automation creates AI agents, workflow automation, integrations, and custom AI systems shaped around real business processes.',
  },
  {
    path: '/about',
    title: 'About FRAV Automation | Web + AI',
    description:
      'FRAV Automation is a technology studio focused on premium website development and practical AI automation. We create considered digital experiences and reliable systems that help businesses operate smarter, scale with confidence, and stay ahead in a rapidly changing digital landscape.',
  },
];

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

const updateMeta = (html: string, attribute: 'name' | 'property', key: string, value: string) => {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  const expression = new RegExp(`<meta\\s+${attribute}="${key}"[^>]*\\/?>`);
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace('</head>', `  ${tag}\n  </head>`);
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const rawSiteUrl =
    env.VITE_SITE_URL ||
    process.env.VITE_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    (process.env.VERCEL_ENV === 'production' ? process.env.VERCEL_URL : '') ||
    'http://localhost:3000';
  const siteUrl = new URL(
    rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`
  ).origin;
  const socialImage = `${siteUrl}/images/ai_automation_hero_1791238819833.jpg`;
  const seoFiles = {
    robots: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    sitemap: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pageMetadata
      .map(({path}) => `  <url><loc>${siteUrl}${path}</loc></url>`)
      .join('\n')}\n</urlset>\n`,
  };
  let outputDirectory = '';

  return {
    base: './',
    publicDir: 'src/assets',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'frav-seo-files',
        configResolved(config) {
          if (config.command === 'build') {
            outputDirectory = resolve(config.root, config.build.outDir);
          }
        },
        configureServer(server) {
          server.middlewares.use((request, response, next) => {
            const file = request.url?.split('?')[0] === '/robots.txt'
              ? seoFiles.robots
              : request.url?.split('?')[0] === '/sitemap.xml'
                ? seoFiles.sitemap
                : undefined;
            if (file === undefined) {
              next();
              return;
            }
            response.setHeader(
              'Content-Type',
              request.url?.startsWith('/sitemap.xml')
                ? 'application/xml; charset=utf-8'
                : 'text/plain; charset=utf-8'
            );
            response.end(file);
          });
        },
        async closeBundle() {
          if (!outputDirectory) return;
          const indexPath = resolve(outputDirectory, 'index.html');
          let baseHtml: string;
          try {
            baseHtml = await readFile(indexPath, 'utf8');
          } catch (error) {
            throw new Error('Unable to generate route metadata: built index.html is missing.', {
              cause: error,
            });
          }
          const organizationSchema = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'FRAV Automation',
            url: siteUrl,
            logo: `${siteUrl}/frav-mark.svg`,
            description: pageMetadata[0].description,
            email: 'studio@fravlab.com',
          }).replaceAll('<', '\\u003c');

          for (const page of pageMetadata) {
            let html = baseHtml.replace(
              /<title>[^<]*<\/title>/,
              `<title>${escapeHtml(page.title)}</title>`
            );
            html = updateMeta(html, 'name', 'description', page.description);
            html = updateMeta(html, 'property', 'og:title', page.title);
            html = updateMeta(html, 'property', 'og:description', page.description);
            html = updateMeta(html, 'property', 'og:type', 'website');
            html = updateMeta(html, 'property', 'og:site_name', 'FRAV Automation');
            html = updateMeta(html, 'property', 'og:url', `${siteUrl}${page.path}`);
            html = updateMeta(html, 'property', 'og:image', socialImage);
            html = updateMeta(html, 'property', 'og:image:width', '1376');
            html = updateMeta(html, 'property', 'og:image:height', '768');
            html = updateMeta(
              html,
              'property',
              'og:image:alt',
              'FRAV Automation technology studio hero image'
            );
            html = updateMeta(html, 'name', 'twitter:card', 'summary_large_image');
            html = updateMeta(html, 'name', 'twitter:title', page.title);
            html = updateMeta(html, 'name', 'twitter:description', page.description);
            html = updateMeta(html, 'name', 'twitter:image', socialImage);
            html = html.replace(
              /<link\s+rel="canonical"[^>]*\/?>/,
              `<link rel="canonical" href="${siteUrl}${page.path}" />`
            );
            html = html.replace(
              /<script\s+id="frav-organization-schema"[^>]*>[\s\S]*?<\/script>/,
              `<script id="frav-organization-schema" type="application/ld+json">${organizationSchema}</script>`
            );

            if (page.path === '/') {
              await writeFile(indexPath, html);
            } else {
              await writeFile(resolve(outputDirectory, `${page.path.slice(1)}.html`), html);
            }
          }
          await writeFile(resolve(outputDirectory, 'robots.txt'), seoFiles.robots);
          await writeFile(resolve(outputDirectory, 'sitemap.xml'), seoFiles.sitemap);
        },
      },
    ],
    define: {
      __FRAV_SITE_URL__: JSON.stringify(siteUrl),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  };
});
