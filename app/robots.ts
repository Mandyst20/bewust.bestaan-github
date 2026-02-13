import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/messages/',
          '/profile',
          '/u/',
          '/community/nieuw',
          '/community/gesprek',
          '/community/categorie',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/messages/',
          '/profile',
        ],
      },
    ],
    sitemap: 'https://bewustbestaan.nl/sitemap.xml',
    host: 'https://bewustbestaan.nl',
  }
}
