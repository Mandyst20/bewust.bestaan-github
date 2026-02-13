import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bewust Bestaan | Community voor Rust, Verbinding & Persoonlijke Groei',
  description: 'Dé Nederlandse community voor bewust leven. Deel je verhaal, vind steun bij emoties & innerlijke onrust, en groei samen met gelijkgestemden. Veilig, anoniem en zonder oordeel.',
  alternates: {
    canonical: 'https://bewustbestaan.nl',
  },
  openGraph: {
    title: 'Bewust Bestaan | Community voor Rust, Verbinding & Persoonlijke Groei',
    description: 'Dé Nederlandse community voor bewust leven. Deel je verhaal en groei samen.',
    url: 'https://bewustbestaan.nl',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Bewust Bestaan',
  },
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" aria-label="Introductie">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-100 via-white to-sage-50 -z-10" />
        
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-sm text-sand-600">Community nu open voor nieuwe leden</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-sand-900 mb-6 leading-tight">
              Welkom bij{' '}
              <span className="text-terracotta-600 font-medium">Bewust Bestaan</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-sand-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Dé Nederlandse community voor rust, verbinding en bewuste groei. 
              Deel je verhaal, vind steun bij emoties & innerlijke onrust, en groei samen met gelijkgestemden.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register" 
                className="btn-primary text-lg px-8 py-4"
                aria-label="Maak een gratis account aan om te beginnen"
              >
                Begin je reis
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/richtlijnen" 
                className="btn-outline text-lg px-8 py-4"
                aria-label="Lees onze community richtlijnen"
              >
                Lees meer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl font-light text-sand-900 mb-4">
              Wat je vindt op ons platform
            </h2>
            <p className="text-sand-600 max-w-xl mx-auto">
              Alles wat je nodig hebt voor je reis naar meer bewustzijn en innerlijke rust
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <article className="card card-hover text-center">
              <div className="w-16 h-16 bg-terracotta-100 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <svg className="w-8 h-8 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-sand-900 mb-3">Community</h3>
              <p className="text-sand-600 leading-relaxed">
                Verbind met gelijkgestemde zielen in Nederland. Deel ervaringen over emoties, 
                relaties en persoonlijke groei in een veilige, oordeelvrije ruimte.
              </p>
            </article>

            <article className="card card-hover text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <svg className="w-8 h-8 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-sand-900 mb-3">Artikelen & Oefeningen</h3>
              <p className="text-sand-600 leading-relaxed">
                Gratis blogs en praktische oefeningen voor meer rust, mindfulness en 
                persoonlijke groei. Direct toepasbaar in je dagelijks leven.
              </p>
            </article>

            <article className="card card-hover text-center">
              <div className="w-16 h-16 bg-terracotta-100 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <svg className="w-8 h-8 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-sand-900 mb-3">Privégesprekken</h3>
              <p className="text-sand-600 leading-relaxed">
                Ga dieper in gesprek met anderen via veilige 1-op-1 berichten. 
                Wanneer jij er klaar voor bent, in je eigen tempo.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-sand-50" aria-labelledby="values-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 id="values-heading" className="text-3xl font-light text-sand-900 text-center mb-12">
              Onze kernwaarden
            </h2>
            
            <div className="space-y-6">
              <article className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-terracotta-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-2xl" role="img" aria-label="Veiligheid">✨</span>
                </div>
                <div>
                  <h3 className="font-medium text-sand-900 mb-1">Veiligheid & Vertrouwen</h3>
                  <p className="text-sand-600">
                    Een beschermde ruimte waar je jezelf mag zijn, zonder oordeel. 
                    We modereren met zorg en respect voor jouw privacy.
                  </p>
                </div>
              </article>

              <article className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-2xl" role="img" aria-label="Verbinding">🤝</span>
                </div>
                <div>
                  <h3 className="font-medium text-sand-900 mb-1">Echte Verbinding</h3>
                  <p className="text-sand-600">
                    Authentieke, menselijke connecties met mede-Nederlanders. 
                    Geen likes, geen scores, alleen echte gesprekken.
                  </p>
                </div>
              </article>

              <article className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-terracotta-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-2xl" role="img" aria-label="Groei">🌱</span>
                </div>
                <div>
                  <h3 className="font-medium text-sand-900 mb-1">Persoonlijke Groei</h3>
                  <p className="text-sand-600">
                    Zachte ondersteuning bij je ontwikkeling. Iedereen groeit in 
                    zijn eigen tempo, zonder druk of verplichtingen.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dutch Section - SEO Boost */}
      <section className="py-20 bg-white" aria-labelledby="dutch-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="dutch-heading" className="text-3xl font-light text-sand-900 text-center mb-8">
            Dé Nederlandse community voor bewust leven
          </h2>
          <div className="prose-content max-w-2xl mx-auto text-center">
            <p className="text-sand-600 text-lg mb-6">
              Bewust Bestaan is speciaal ontwikkeld voor mensen in Nederland die op zoek zijn 
              naar meer rust, balans en betekenis in hun leven. Onze community richt zich op 
              typisch Nederlandse thema&apos;s zoals werk-privé balans, prestatiedruk, en het 
              vinden van zingeving in een drukke samenleving.
            </p>
            <p className="text-sand-600">
              Of je nu worstelt met burn-out, op zoek bent naar meer mindfulness in je dagelijks 
              leven, of simpelweg behoefte hebt aan een luisterend oor - bij Bewust Bestaan vind 
              je een veilige plek om te groeien, samen met duizenden andere Nederlanders.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white" aria-label="Registratie oproep">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-sand-900 mb-6">
            Klaar om te beginnen met bewust leven?
          </h2>
          <p className="text-sand-600 mb-8 max-w-xl mx-auto">
            Word lid van onze Nederlandse community en ontdek vandaag nog wat bewust 
            bestaan voor jou kan betekenen. Gratis account aanmaken.
          </p>
          <Link 
            href="/register" 
            className="btn-primary text-lg px-8 py-4"
            aria-label="Gratis account aanmaken bij Bewust Bestaan"
          >
            Gratis account aanmaken
          </Link>
          <p className="text-sm text-sand-500 mt-4">
            Geen creditcard nodig • Direct toegang • Altijd opzegbaar
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sand-100 py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl" role="img" aria-label="Bewust Bestaan logo">🌿</span>
              <span className="font-medium text-sand-900">Bewust Bestaan</span>
            </div>
            <nav aria-label="Footer navigatie">
              <div className="flex items-center gap-6">
                <Link href="/richtlijnen" className="text-sand-600 hover:text-sand-900">
                  Communityrichtlijnen
                </Link>
                <Link href="/login" className="text-sand-600 hover:text-sand-900">
                  Inloggen
                </Link>
              </div>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-sand-200 text-center text-sand-500 text-sm">
            <p>© {new Date().getFullYear()} Bewust Bestaan. Alle rechten voorbehouden.</p>
            <p className="mt-2">Nederlandse community voor bewust leven, rust en persoonlijke groei.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
