import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

interface PageProps {
  params: { slug: string }
}

async function getExercise(slug: string) {
  return prisma.exercise.findUnique({
    where: { slug, published: true },
  })
}

export default async function ExercisePage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/oefeningen')
  }

  const exercise = await getExercise(params.slug)

  if (!exercise) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-sand-600 mb-6">
        <Link href="/oefeningen" className="hover:text-sand-900">Oefeningen</Link>
        <span>/</span>
        <span className="text-sand-900">{exercise.title}</span>
      </div>

      {/* Header */}
      <header className="text-center mb-8">
        <div className="text-8xl mb-4">{exercise.icon}</div>
        <h1 className="text-3xl md:text-4xl font-light text-sand-900 mb-4">
          {exercise.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-sand-500">
          {exercise.duration && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {exercise.duration} minuten
            </span>
          )}
        </div>
      </header>

      {/* Audio Player */}
      {exercise.audioUrl && (
        <div className="card mb-8 bg-sage-50 border-sage-200">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🎧</span>
            <div className="flex-1">
              <p className="font-medium text-sand-900 mb-1">Audioversie beschikbaar</p>
              <p className="text-sm text-sand-600">Luister naar de begeleide oefening</p>
            </div>
            <audio controls className="w-full max-w-xs">
              <source src={exercise.audioUrl} type="audio/mpeg" />
              Je browser ondersteunt geen audio.
            </audio>
          </div>
        </div>
      )}

      {/* Content */}
      <article className="card">
        <div className="prose-content whitespace-pre-wrap">
          {exercise.body}
        </div>
      </article>

      {/* Footer */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href="/oefeningen" className="btn-secondary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Terug naar oefeningen
        </Link>
        <Link href="/community" className="btn-outline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Deel je ervaring
        </Link>
      </div>
    </div>
  )
}
