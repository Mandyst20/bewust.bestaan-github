import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

async function getCourse() {
  return prisma.course.findFirst({
    where: { published: true },
    include: {
      modules: {
        orderBy: { orderIndex: 'asc' },
      },
    },
  })
}

async function hasEntitlement(userId: string, courseId: string) {
  const entitlement = await prisma.entitlement.findFirst({
    where: {
      userId,
      productType: 'COURSE',
      productId: courseId,
      active: true,
    },
  })
  return !!entitlement
}

export default async function CursusPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/cursus')
  }

  const course = await getCourse()

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <span className="text-6xl mb-4 block">🌱</span>
        <h1 className="text-3xl font-light text-sand-900 mb-4">
          Binnenkort beschikbaar
        </h1>
        <p className="text-sand-600 max-w-md mx-auto">
          We werken hard aan een mooie cursus over bewust leven. 
          Hou de website in de gaten!
        </p>
      </div>
    )
  }

  const hasAccess = await hasEntitlement(session.user.id, course.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="card mb-8 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-terracotta-100 via-sand-100 to-sage-100 rounded-xl h-64 md:h-auto flex items-center justify-center">
            <span className="text-8xl">🎓</span>
          </div>
          <div className="flex flex-col justify-center py-4">
            <span className="badge badge-primary w-fit mb-4">Cursus</span>
            <h1 className="text-3xl font-light text-sand-900 mb-4">
              {course.title}
            </h1>
            <p className="text-sand-600 mb-6 whitespace-pre-line">
              {course.description}
            </p>
            
            {hasAccess ? (
              <div className="space-y-4">
                <div className="alert-success">
                  ✅ Je hebt toegang tot deze cursus!
                </div>
                <Link 
                  href={`/cursus/${course.slug}`}
                  className="btn-primary inline-flex"
                >
                  Start met de cursus
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium text-sand-900">
                    €{(course.price / 100).toFixed(2)}
                  </span>
                  <span className="text-sand-500">eenmalig</span>
                </div>
                <Link 
                  href={`/cursus/${course.slug}/checkout`}
                  className="btn-primary inline-flex"
                >
                  Koop deze cursus
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="text-sm text-sand-500">
                  Veilig betalen via Stripe. Direct toegang na aankoop.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modules Preview */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-light text-sand-900 mb-6">
          Wat je gaat leren
        </h2>
        <div className="space-y-4">
          {course.modules.map((module, index) => (
            <div 
              key={module.id} 
              className={`card flex items-center gap-4 ${!hasAccess && !module.isPreview ? 'opacity-60' : ''}`}
            >
              <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center font-medium text-sand-700 flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sand-900">{module.title}</h3>
                <div className="flex items-center gap-3 text-sm text-sand-500">
                  {module.duration && <span>{module.duration} min</span>}
                  {module.isPreview && (
                    <span className="badge badge-secondary">Gratis preview</span>
                  )}
                </div>
              </div>
              {module.isPreview ? (
                <Link 
                  href={`/cursus/${course.slug}/module/${module.id}`}
                  className="btn-secondary text-sm"
                >
                  Bekijk
                </Link>
              ) : hasAccess ? (
                <Link 
                  href={`/cursus/${course.slug}/module/${module.id}`}
                  className="btn-primary text-sm"
                >
                  Start
                </Link>
              ) : (
                <span className="text-sand-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-light text-sand-900 mb-6">
          Veelgestelde vragen
        </h2>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-medium text-sand-900 mb-2">Hoe lang heb ik toegang?</h3>
            <p className="text-sand-600 text-sm">
              Je hebt levenslang toegang tot de cursus. Je kunt de modules zo vaak 
              bekijken als je wilt.
            </p>
          </div>
          <div className="card">
            <h3 className="font-medium text-sand-900 mb-2">Is er een geld-terug-garantie?</h3>
            <p className="text-sand-600 text-sm">
              Ja! Als de cursus niet aan je verwachtingen voldoet, krijg je binnen 
              14 dagen je geld terug. Geen vragen gesteld.
            </p>
          </div>
          <div className="card">
            <h3 className="font-medium text-sand-900 mb-2">Kan ik op mijn eigen tempo gaan?</h3>
            <p className="text-sand-600 text-sm">
              Absoluut. Je bepaalt zelf wanneer je welke module doet. Er is geen 
              tijdsdruk.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
