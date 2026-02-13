import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#d26549',
}

export const metadata: Metadata = {
  title: {
    default: 'Bewust Bestaan | Community voor Rust, Verbinding & Persoonlijke Groei',
    template: '%s | Bewust Bestaan',
  },
  description: 'Dé Nederlandse community voor bewust leven. Deel je verhaal, vind steun bij emoties & innerlijke onrust, en groei samen met gelijkgestemden. Veilig, anoniem en zonder oordeel.',
  keywords: [
    'bewust leven',
    'mindfulness nederland',
    'innerlijke rust',
    'emotionele steun',
    'persoonlijke groei',
    'community nederland',
    'zelfhulp',
    'mentale gezondheid',
    'stress verminderen',
    'burn-out herstel',
    'zingeving',
    'zelfbeeld',
    'relaties',
    'grenzen stellen',
  ],
  authors: [{ name: 'Bewust Bestaan' }],
  creator: 'Bewust Bestaan',
  publisher: 'Bewust Bestaan',
  metadataBase: new URL('https://bewustbestaan.nl'),
  alternates: {
    canonical: '/',
    languages: {
      'nl-NL': '/',
      'nl': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://bewustbestaan.nl',
    siteName: 'Bewust Bestaan',
    title: 'Bewust Bestaan | Community voor Rust, Verbinding & Persoonlijke Groei',
    description: 'Dé Nederlandse community voor bewust leven. Deel je verhaal, vind steun bij emoties & innerlijke onrust, en groei samen met gelijkgestemden.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bewust Bestaan - Community voor bewust leven in Nederland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bewust Bestaan | Community voor Rust & Verbinding',
    description: 'Dé Nederlandse community voor bewust leven. Deel je verhaal en groei samen.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'VOEG_HIER_JE_GOOGLE_VERIFICATION_CODE_TOE',
  },
  category: 'Gezondheid & Welzijn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl-NL" dir="ltr">
      <head>
        <link rel="alternate" hrefLang="nl-NL" href="https://bewustbestaan.nl" />
        <link rel="alternate" hrefLang="nl" href="https://bewustbestaan.nl" />
        <link rel="alternate" hrefLang="x-default" href="https://bewustbestaan.nl" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Bewust Bestaan',
              url: 'https://bewustbestaan.nl',
              logo: 'https://bewustbestaan.nl/logo.png',
              description: 'Dé Nederlandse community voor bewust leven, rust en persoonlijke groei.',
              sameAs: [
                'https://facebook.com/bewustbestaan',
                'https://instagram.com/bewustbestaan',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Klantenservice',
                availableLanguage: 'Dutch',
              },
            }),
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Bewust Bestaan',
              url: 'https://bewustbestaan.nl',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://bewustbestaan.nl/zoeken?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
