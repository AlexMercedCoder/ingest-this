const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ingestthis.com',
  generateRobotsTxt: true,
  transform: async (config, url) => {
    // Retired site: only the moved homepage stays in the sitemap; every other
    // URL 301s (netlify.toml).
    if (url.split('?')[0] !== '/') return null;
    if (url.startsWith('/posts/')) {
      const source = path.join(__dirname, 'posts', `${url.slice('/posts/'.length)}.md`);
      if (fs.existsSync(source)) {
        const canonical = matter(fs.readFileSync(source, 'utf8')).data.canonical;
        if (canonical && !canonical.startsWith('https://ingestthis.com/')) return null;
      }
    }
    return { loc: url, changefreq: 'weekly', priority: url.startsWith('/posts/') ? 0.9 : 0.7 };
  },
  // optional
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
    ],
    additionalSitemaps: [],
  },
}
