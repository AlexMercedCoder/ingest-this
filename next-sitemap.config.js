/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ingestthis.com',
  generateRobotsTxt: true,
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
    additionalSitemaps: [
      'https://ingestthis.com/server-sitemap.xml', // optional
    ],
  },
}
