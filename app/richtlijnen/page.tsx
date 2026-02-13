import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Communityrichtlijnen | Bewust Bestaan',
  description: 'Onze communityrichtlijnen voor een veilige en respectvolle omgeving. Lees hoe we samen een ondersteunende community voor bewust leven creëren.',
  alternates: {
    canonical: 'https://bewustbestaan.nl/richtlijnen',
  },
  openGraph: {
    title: 'Communityrichtlijnen | Bewust Bestaan',
    description: 'Onze richtlijnen voor een veilige en respectvolle community voor bewust leven.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export default function RichtlijnenPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-sand-900 mb-4">
          Communityrichtlijnen
        </h1>
        <p className="text-sand-600 text-lg">
          Samen creëren we een veilige en ondersteunende ruimte voor alle Nederlanders 
          die werken aan persoonlijke groei en bewustzijn.
        </p>
      </header>

      {/* Kernwaarden */}
      <section className="mb-12" aria-labelledby="kernwaarden-heading">
        <h2 id="kernwaarden-heading" className="text-2xl font-light text-sand-900 mb-6">
          Onze kernwaarden
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <article className="card text-center">
            <div className="text-4xl mb-3" role="img" aria-label="Veiligheid">✨</div>
            <h3 className="font-medium text-sand-900 mb-2">Veiligheid</h3>
            <p className="text-sm text-sand-600">
              Een beschermde ruimte waar je jezelf mag zijn, zonder oordeel of druk
            </p>
          </article>
          <article className="card text-center">
            <div className="text-4xl mb-3" role="img" aria-label="Verbinding">🤝</div>
            <h3 className="font-medium text-sand-900 mb-2">Verbinding</h3>
            <p className="text-sm text-sand-600">
              Authentieke contacten met mede-Nederlanders die begrijpen wat je doormaakt
            </p>
          </article>
          <article className="card text-center">
            <div className="text-4xl mb-3" role="img" aria-label="Groei">🌱</div>
            <h3 className="font-medium text-sand-900 mb-2">Groei</h3>
            <p className="text-sm text-sand-600">
              Zachte ondersteuning bij je persoonlijke ontwikkeling, in je eigen tempo
            </p>
          </article>
        </div>
      </section>

      {/* Wat we wel doen */}
      <section className="mb-12" aria-labelledby="wel-doen-heading">
        <h2 id="wel-doen-heading" className="text-2xl font-light text-sand-900 mb-6">
          Dit doen we bij Bewust Bestaan ✅
        </h2>
        <div className="card space-y-4">
          <article className="flex gap-4">
            <span className="text-green-500 text-xl flex-shrink-0" aria-hidden="true">✓</span>
            <div>
              <h3 className="font-medium text-sand-900">Wees respectvol en empathisch</h3>
              <p className="text-sand-600 text-sm">
                Behandel anderen zoals je zelf behandeld wilt worden. Iedereen is op zijn 
                eigen reis en doet wat hij of zij op dat moment kan.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-green-500 text-xl flex-shrink-0" aria-hidden="true">✓</span>
            <div>
              <h3 className="font-medium text-sand-900">Luister met aandacht</h3>
              <p className="text-sand-600 text-sm">
                Soms heeft iemand vooral behoefte aan gehoord worden, niet aan advies of oplossingen.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-green-500 text-xl flex-shrink-0" aria-hidden="true">✓</span>
            <div>
              <h3 className="font-medium text-sand-900">Deel je eigen ervaring</h3>
              <p className="text-sand-600 text-sm">
                Gebruik &quot;ik&quot;-uitspraken. Deel wat jij hebt meegemaakt, zonder te oordelen 
                over de keuzes van anderen.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-green-500 text-xl flex-shrink-0" aria-hidden="true">✓</span>
            <div>
              <h3 className="font-medium text-sand-900">Respecteer privacy</h3>
              <p className="text-sand-600 text-sm">
                Wat hier wordt gedeeld, blijft hier. Deel geen persoonlijke verhalen van 
                anderen buiten ons platform.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-green-500 text-xl flex-shrink-0" aria-hidden="true">✓</span>
            <div>
              <h3 className="font-medium text-sand-900">Geef elkaar de ruimte</h3>
              <p className="text-sand-600 text-sm">
                Niet iedereen reageert meteen. Geef mensen tijd om te antwoorden en respecteer 
                het als iemand even pauze nodig heeft.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Wat we niet doen */}
      <section className="mb-12" aria-labelledby="niet-doen-heading">
        <h2 id="niet-doen-heading" className="text-2xl font-light text-sand-900 mb-6">
          Dit doen we niet bij Bewust Bestaan ❌
        </h2>
        <div className="card space-y-4">
          <article className="flex gap-4">
            <span className="text-red-500 text-xl flex-shrink-0" aria-hidden="true">✗</span>
            <div>
              <h3 className="font-medium text-sand-900">Oordelen of veroordelen</h3>
              <p className="text-sand-600 text-sm">
                Geen &quot;je moet&quot; of &quot;je had&quot;. Iedereen doet wat hij of zij op dat moment kan. 
                We zijn hier om te ondersteunen, niet om te veroordelen.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-red-500 text-xl flex-shrink-0" aria-hidden="true">✗</span>
            <div>
              <h3 className="font-medium text-sand-900">Ongevraagd advies geven</h3>
              <p className="text-sand-600 text-sm">
                Vraag eerst: &quot;Zou je graag advies willen, of wil je vooral even kwijt wat je voelt?&quot;
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-red-500 text-xl flex-shrink-0" aria-hidden="true">✗</span>
            <div>
              <h3 className="font-medium text-sand-900">Vergelijken of competitie</h3>
              <p className="text-sand-600 text-sm">
                Geen &quot;wie heeft het zwaarder&quot;. Ieders ervaring is valide, hoe groot of klein ook. 
                Er is geen hiërarchie in pijn of groei.
              </p>
            </div>
          </article>
          <article className="flex gap-4">
            <span className="text-red-500 text-xl flex-shrink-0" aria-hidden="true">✗</span>
            <div>
              <h3 className="font-medium text-sand-900">Promotionele content</h3>
              <p className="text-sand-600 text-sm">
                Geen reclame, affiliate links, of zelfpromotie zonder toestemming van het team.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Hulplijnen */}
      <section className="mb-12" aria-labelledby="hulplijnen-heading">
        <h2 id="hulplijnen-heading" className="text-2xl font-light text-sand-900 mb-6">
          Professionele hulp nodig?
        </h2>
        <div className="card bg-red-50 border-red-200">
          <p className="text-sand-700 mb-4">
            Bewust Bestaan is een community voor peer-support, geen vervanging voor professionele hulp. 
            Als je in crisis bent of direct professionele hulp nodig hebt, neem dan contact op met:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label="Telefoon">📞</span>
              <div>
                <span className="font-medium text-sand-900">113 Zelfmoordpreventie</span>
                <p className="text-sm text-sand-600">Bel <a href="tel:08000113" className="text-terracotta-600 font-medium">0800-0113</a> (gratis, 24/7) of <a href="tel:113" className="text-terracotta-600 font-medium">113</a></p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label="Chat">💬</span>
              <div>
                <span className="font-medium text-sand-900">De Luisterlijn</span>
                <p className="text-sm text-sand-600">Bel <a href="tel:0880767000" className="text-terracotta-600 font-medium">088-0767000</a> (24/7, anoniem)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label="Huisarts">👨‍⚕️</span>
              <div>
                <span className="font-medium text-sand-900">Je huisarts</span>
                <p className="text-sm text-sand-600">Neem contact op met je eigen huisarts voor doorverwijzing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moderatie */}
      <section className="mb-12" aria-labelledby="moderatie-heading">
        <h2 id="moderatie-heading" className="text-2xl font-light text-sand-900 mb-6">
          Hoe we onze community beschermen
        </h2>
        <div className="card">
          <p className="text-sand-600 mb-4">
            Ons team van vrijwilligers en moderatoren houdt de community in de gaten om de 
            veiligheid te waarborgen. We interveniëren alleen wanneer dat echt nodig is:
          </p>
          <ul className="space-y-2 text-sand-600 list-disc list-inside mb-4">
            <li>Bij ernstige overtreding van de richtlijnen</li>
            <li>Bij signalen dat iemand in acute crisis verkeert</li>
            <li>Bij spam, oplichting of ongewenste commerciële content</li>
          </ul>
          <p className="text-sand-600">
            We geloven in mildheid en in gesprek gaan. Bij problemen nemen we eerst contact 
            op voordat we maatregelen nemen. Onze AI helpt ons bij het signaleren van 
            mogelijk risicovolle content, maar menselijke moderatoren nemen altijd de 
            uiteindelijke beslissing.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center" aria-label="Registratie">
        <p className="text-sand-600 mb-6">
          Door je aan te melden bij Bewust Bestaan, ga je akkoord met deze richtlijnen 
          en beloof je respectvol om te gaan met andere leden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/register" 
            className="btn-primary"
            aria-label="Word lid van de Nederlandse community voor bewust leven"
          >
            Word lid van onze community
          </Link>
          <Link href="/" className="btn-secondary">
            Terug naar home
          </Link>
        </div>
      </section>
    </div>
  )
}
