import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

async function getStats() {
  const [
    userCount,
    topicCount,
    replyCount,
    pendingAlerts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.topic.count(),
    prisma.topicReply.count(),
    prisma.safetyAlert.count({
      where: { resolvedAt: null },
    }),
  ])

  return {
    userCount,
    topicCount,
    replyCount,
    pendingAlerts,
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const stats = await getStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">
          Beheer en overzicht van het platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <p className="text-sm text-sand-600">Gebruikers</p>
              <p className="text-2xl font-medium text-sand-900">{stats.userCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
              💭
            </div>
            <div>
              <p className="text-sm text-sand-600">Topics</p>
              <p className="text-2xl font-medium text-sand-900">{stats.topicCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              💬
            </div>
            <div>
              <p className="text-sm text-sand-600">Reacties</p>
              <p className="text-2xl font-medium text-sand-900">{stats.replyCount}</p>
            </div>
          </div>
        </div>

        <Link href="/admin/alerts" className="card card-hover">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              🚨
            </div>
            <div>
              <p className="text-sm text-sand-600">Openstaande alerts</p>
              <p className={`text-2xl font-medium ${stats.pendingAlerts > 0 ? 'text-red-600' : 'text-sand-900'}`}>
                {stats.pendingAlerts}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-medium text-sand-900 mb-4">Snelle acties</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/alerts" className="card card-hover flex items-center gap-4">
          <span className="text-3xl">🛡️</span>
          <div>
            <h3 className="font-medium text-sand-900">Veiligheidsalerts</h3>
            <p className="text-sm text-sand-600">Bekijk en behandel alerts</p>
          </div>
        </Link>

        <Link href="/admin/content" className="card card-hover flex items-center gap-4">
          <span className="text-3xl">📝</span>
          <div>
            <h3 className="font-medium text-sand-900">Content beheer</h3>
            <p className="text-sm text-sand-600">Blogs, oefeningen en cursussen</p>
          </div>
        </Link>

        <Link href="/admin/users" className="card card-hover flex items-center gap-4">
          <span className="text-3xl">👤</span>
          <div>
            <h3 className="font-medium text-sand-900">Gebruikers</h3>
            <p className="text-sm text-sand-600">Beheer gebruikers en rechten</p>
          </div>
        </Link>
      </div>

      {/* Platform Info */}
      <div className="mt-8 card bg-sand-50">
        <h3 className="font-medium text-sand-900 mb-4">Platform informatie</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-sand-600">Versie:</span>
            <span className="text-sand-900 ml-2">1.0.0</span>
          </div>
          <div>
            <span className="text-sand-600">Omgeving:</span>
            <span className="text-sand-900 ml-2">{process.env.NODE_ENV}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
