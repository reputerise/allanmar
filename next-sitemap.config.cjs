/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.futerman.com.ar', // O el dominio que estés usando
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  outDir: './public',
  robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }],
  },
  additionalPaths: async () => {
      // Aquí va el fetch y la lógica de los slugs dinámicos
      const dynamicRoutes = await fetchDynamicRoutes();
      return dynamicRoutes;
  }
};

async function fetchDynamicRoutes() {
  const res = await fetch('https://xy1nu7wy.api.sanity.io/v1/data/query/production?query=*[_type == "post"]{slug}'); // URL donde obtienes los slugs
  const posts = await res.json();
  return posts.result.map(post => ({
      loc: `/${post.slug.current}`,
      lastmod: new Date().toISOString(),
  }));
}
