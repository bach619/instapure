/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://instapure.fun',
  generateRobotsTxt: true,
  outDir: './public',
  exclude: ['/server/*', '/private/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/server/', '/private/'],
      },
    ],
    additionalSitemaps: [
      'https://instapure.fun/sitemap.xml',
    ],
  },
};

module.exports = config;
