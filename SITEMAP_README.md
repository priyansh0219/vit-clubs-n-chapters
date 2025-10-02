# Sitemap Configuration

This project uses `next-sitemap` to automatically generate XML sitemaps for SEO optimization.

## How it works

1. **Automatic Generation**: The sitemap is generated automatically during the build process
2. **Static Export Compatible**: Works perfectly with Next.js static exports
3. **All Pages Included**: Automatically includes the home page and all 161+ club pages

## Generated Files

- `public/sitemap.xml` - Main sitemap with all URLs
- `public/robots.txt` - Search engine crawler instructions

## Configuration

The sitemap configuration is in `next-sitemap.config.js`:

- **Home page**: Priority 1.0, updated weekly
- **Club pages**: Priority 0.8, updated monthly
- **Base URL**: Uses `SITE_URL` environment variable or defaults to production URL

## Build Process

The sitemap is generated automatically when you run:

```bash
bun run build
```

This runs:
1. `next build --turbopack` - Generates all static pages
2. `next-sitemap` - Scans the build output and creates sitemap

## URLs Generated

- Home: `https://vit-clubs-n-chapters.vercel.app/`
- Club pages: `https://vit-clubs-n-chapters.vercel.app/club/{slug}`

Example club URLs:
- `/club/the-photography-club`
- `/club/community-radio`
- `/club/vit-film-society-vfs`
- And 158+ more...

## SEO Benefits

1. **Search Engine Discovery**: Helps Google and other search engines find all your pages
2. **Faster Indexing**: Pages get indexed more quickly
3. **Better Rankings**: Proper sitemap structure can improve SEO rankings
4. **Club Visibility**: Each club gets its own discoverable URL

## Verification

After deployment, you can:
1. Visit `/sitemap.xml` to view the generated sitemap
2. Submit the sitemap to Google Search Console
3. Check robots.txt at `/robots.txt`

## Manual Regeneration

To regenerate the sitemap without a full build:

```bash
bun run postbuild
```

## Environment Variables

Create a `.env.local` file for custom site URL:

```env
SITE_URL=https://your-custom-domain.com
```