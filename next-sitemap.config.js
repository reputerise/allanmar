/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://blog.futerman.com.ar', // Reemplaza con tu dominio
    generateRobotsTxt: true, // Opcional: genera también un archivo robots.txt
    changefreq: 'daily', // Frecuencia de cambio sugerida
    priority: 0.7, // Prioridad por defecto para las páginas
    outDir: './public',
    robotsTxtOptions: {
        policies: [


            { userAgent: '*', allow: '/' },
        ],
      },

  };
  

  
