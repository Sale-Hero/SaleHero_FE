const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'https://salehero.kr';
const API_BASE_URL = 'http://localhost:8880/api';

const staticPaths = [
    '/',
    '/community',
    '/community/register',
    '/contact',
    '/deals',
    '/articles',
    '/signin',
    '/terms',
    '/privacy',
    '/chat',
];

async function generateSitemap() {
    try {
        const today = new Date().toISOString().split('T')[0];

        // Start with static paths
        let urls = staticPaths.map(path => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);

        // Fetch deals (newsletters)
        try {
            const dealsResponse = await axios.get(`${API_BASE_URL}/news?size=1000`);
            if (dealsResponse.data && dealsResponse.data.content) {
                const dealUrls = dealsResponse.data.content.map(deal => `
  <url>
    <loc>${BASE_URL}/deals/${deal.id}</loc>
    <lastmod>${deal.updatedAt ? new Date(deal.updatedAt).toISOString().split('T')[0] : today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
                urls = [...urls, ...dealUrls];
            }
        } catch (error) {
            console.error('Error fetching deals, skipping. Is the backend server running?');
            // console.error(error);
        }


        // Fetch articles
        try {
            const articlesResponse = await axios.get(`${API_BASE_URL}/articles?size=1000`);
            if (articlesResponse.data && articlesResponse.data.content) {
                const articleUrls = articlesResponse.data.content.map(article => `
  <url>
    <loc>${BASE_URL}/articles/${article.id}</loc>
    <lastmod>${article.updatedAt ? new Date(article.updatedAt).toISOString().split('T')[0] : today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
                urls = [...urls, ...articleUrls];
            }
        } catch (error) {
            console.error('Error fetching articles, skipping. Is the backend server running?');
            // console.error(error);
        }

        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

        fs.writeFileSync('public/sitemap.xml', sitemapContent);
        console.log('Sitemap generated successfully!');

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

generateSitemap();
