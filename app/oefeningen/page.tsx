import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Gratis Oefeningen voor Mindfulness & Rust | Bewust Bestaan',
  description: 'Praktische oefeningen voor meer rust, aandacht en bewustzijn. Ademhalingsoefeningen, meditatie en bodyscan - gratis en direct toepasbaar.',
  alternates: {
    canonical: 'https://bewustbestaan.nl/oefeningen',
  },
  openGraph: {
    title: 'Gratis Oefeningen voor Mindfulness & Rust | Bewust Bestaan',
    description: 'Praktische oefeningen voor meer rust en bewustzijn in je dagelijks leven.',
    type: 'website',
    locale: 'nl_NL',
  },
}

async function getExercises() {
  return prisma.exercise.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function OefeningenPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/oefeningen')
  }

  const exercises = await getExercises()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-sand-900 mb-4">
          Oefeningen voor bewust leven
        </h1>
        <p className="text-sand-600">
          Praktische oefeningen voor meer rust, aandacht en bewustzijn in je dagelijks leven. 
          Alle oefeningen zijn gratis en direct toepasbaar, waar en wanneer je maar wilt.
        </p>
      </header>

      {/* Exercises Grid */}
      <section aria-labelledby="exercises-heading">
        <h2 id="exercises-heading" className="sr-only">Beschikbare oefeningen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map(exercise => (
            <article key={exercise.id}>
              <Link
                href={`/oefening/${exercise.slug}`}
                className="card card-hover flex flex-col h-full"
                aria-label={`Bekijk oefening: ${exercise.title}`}
              >
                <div className="text-5xl mb-4" role="img" aria-label={exercise.title}>
                  {exercise.icon}
                </div>
                <h3 className="text-lg font-medium text-sand-900 mb-2">
                  {exercise.title}
                </h3>
                <p className="text-sand-600 text-sm mb-4 line-clamp-2 flex-1">
                  {exercise.description || exercise.body.substring(0, 120)}...
                </p>
                <div className="flex items-center gap-3 text-sm text-sand-500 pt-4 border-t border-sand-100">
                  {exercise.duration && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {exercise.duration} minuten
                    </span>
                  )}
                  {exercise.audioUrl && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      Met audio
                    </span>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {exercises.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-sand-600">Nog geen oefeningen beschikbaar.</p>
        </div>
      )}

      {/* Tips */}
      <section className="mt-12 card bg-sage-50 border-sage-200" aria-labelledby="tips-heading">
        <div className="flex items-start gap-4">
          <span className="text-3xl" role="img" aria-label="Tip">💡</span>
          <div>
            <h2 id="tips-heading" className="font-medium text-sand-900 mb-1">
              Tip voor dagelijks gebruik
            </h2>
            <p className="text-sand-600 text-sm">
              Kies één oefening die bij je past en probeer deze elke dag te doen, 
              op hetzelfde tijdstip. Bijvoorbeeld direct na het opstaan of voor het slapen. 
              Consistentie is belangrijker dan de duur van de oefening. Zelfs 5 minuten per dag 
              kan al een groot verschil maken.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-8 card bg-sand-50" aria-labelledby="about-exercises">
        <h2 id="about-exercises" className="text-lg font-medium text-sand-900 mb-3">
          Gratis mindfulness oefeningen
        </h2>
        <p className="text-sand-600 text-sm">
          Al onze oefeningen zijn speciaal ontwikkeld voor mensen in Nederland die willen werken 
          aan hun mentale gezondheid en bewustzijn. De oefeningen zijn geschikt voor beginners 
          en vereisen geen voorkennis. Je kunt ze thuis doen, op werk, of waar je maar wilt. 
          Sommige oefeningen hebben een audioversie zodat je ze kunt volgen terwijl je ontspant.
        </p>
      </section>
    </div>
  )
}
