import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatRelativeTime } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Community | Bewust Bestaan',
  description: 'Dé Nederlandse community voor bewust leven. Praat mee over emoties, relaties, zelfbeeld en zingeving. Anoniem, veilig en zonder oordeel.',
  alternates: {
    canonical: 'https://bewustbestaan.nl/community',
  },
  openGraph: {
    title: 'Community | Bewust Bestaan',
    description: 'Praat mee over emoties, relaties en persoonlijke groei in de Nederlandse community voor bewust leven.',
    type: 'website',
    locale: 'nl_NL',
  },
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      topics: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: {
          author: {
            include: { profile: true },
          },
        },
      },
      _count: {
        select: { topics: true },
      },
    },
  })
}

export default async function CommunityPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/community')
  }

  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light text-sand-900 mb-2">
              Community
            </h1>
            <p className="text-sand-600 max-w-xl">
              Deel ervaringen, stel vragen en groei samen met duizenden Nederlanders. 
              Praat mee over emoties, relaties, zelfbeeld en zingeving.
            </p>
          </div>
          <Link 
            href="/community/nieuw" 
            className="btn-primary"
            aria-label="Start een nieuw gesprek in de community"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nieuw gesprek starten
          </Link>
        </div>
      </header>

      {/* Categories Grid */}
      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">Forum categorieën</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <article key={category.id}>
              <Link
                href={`/community/categorie?slug=${category.slug}`}
                className="card card-hover block h-full"
                aria-label={`Bekijk categorie ${category.name}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" aria-hidden="true">
                    {category.icon || '💭'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium text-sand-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sand-600 text-sm mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-sand-500">
                      <span>{category._count.topics} gesprekken</span>
                      {category.topics[0] && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span className="truncate">
                            Laatste: {category.topics[0].title.substring(0, 30)}
                            {category.topics[0].title.length > 30 ? '...' : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-12" aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="text-2xl font-light text-sand-900 mb-6">
          Recente gesprekken
        </h2>
        <div className="space-y-4">
          {categories
            .flatMap(c => c.topics)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map((topic) => (
              <article key={topic.id}>
                <Link
                  href={`/community/gesprek?id=${topic.id}`}
                  className="card card-hover flex items-center justify-between gap-4"
                  aria-label={`Lees gesprek: ${topic.title}`}
                >
                  <div className="min-w-0">
                    <h3 className="font-medium text-sand-900 truncate">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-sand-500">
                      Door {topic.author.profile?.username} • {formatRelativeTime(topic.createdAt)}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-sand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-12 card bg-sand-50" aria-labelledby="about-community">
        <h2 id="about-community" className="text-lg font-medium text-sand-900 mb-3">
          Over onze Nederlandse community
        </h2>
        <p className="text-sand-600 text-sm">
          Bewust Bestaan is dé plek in Nederland waar je terecht kunt voor echte gesprekken 
          over persoonlijke groei. Onze community richt zich op vier belangrijke thema&apos;s: 
          emoties en innerlijke onrust, grenzen en relaties, zelfbeeld, en zingeving. 
          Alles in het Nederlands, met begrip voor de typisch Nederlandse uitdagingen zoals 
          prestatiedruk, werk-privé balans en het vinden van rust in een druk leven.
        </p>
      </section>
    </div>
  )
}
