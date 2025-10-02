/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://vit-clubs-n-chapters.pages.dev',
    generateRobotsTxt: true, // (optional)
    // ...other options

    // Custom configuration for static export
    generateIndexSitemap: false, // For smaller sites, single sitemap is fine
    outDir: './out', // Output to the 'out' directory for static export

    // Priority and changefreq settings
    priority: 0.7,
    changefreq: 'weekly',

    // Custom priority for specific pages
    transform: async (config, path) => {
        // Home page gets highest priority
        if (path === '/') {
            return {
                loc: path,
                changefreq: 'weekly',
                priority: 1.0,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            }
        }

        // Club pages get medium-high priority
        if (path.startsWith('/club/')) {
            return {
                loc: path,
                changefreq: 'monthly',
                priority: 0.8,
                lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            }
        }

        // Default return
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },

    // Exclude specific paths if needed
    exclude: [],

    // Additional paths that might not be automatically discovered
    additionalPaths: async (config) => {
        const result = []

        // You can add any additional static paths here if needed
        // For your current setup, Next.js should auto-discover all routes

        return result
    },

    // Robot.txt configuration
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            // You can add additional sitemaps here if needed
        ],
    },
}