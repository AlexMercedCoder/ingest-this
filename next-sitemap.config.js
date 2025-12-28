/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ingestthis.com',
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://ingestthis.com/server-sitemap.xml', // optional
    ],
  },
}
