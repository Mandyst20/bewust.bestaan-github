import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { AlertCard } from '@/components/AlertCard'

async function getAlerts() {
  return prisma.safetyAlert.findMany({
    orderBy: [
      { resolvedAt: 'asc' },
      { riskLevel: 'desc' },
      { createdAt: 'desc' },
    ],
    take: 50,
  })
}

export default async function AlertsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const alerts = await getAlerts()
  const pendingAlerts = alerts.filter(a => !a.resolvedAt)
  const resolvedAlerts = alerts.filter(a => a.resolvedAt)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-sand-600 mb-6">
        <Link href="/admin" className="hover:text-sand-900">Admin</Link>
        <span>/</span>
        <span className="text-sand-900">Veiligheidsalerts</span>
      </div>

      <div className="mb-8">
        <h1 className="page-title">Veiligheidsalerts</h1>
        <p className="page-description">
          AI-gegenereerde alerts voor mogelijk risicovolle content
        </p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-red-50 border-red-200">
          <p className="text-sm text-red-600">Openstaand</p>
          <p className="text-2xl font-medium text-red-700">
            {pendingAlerts.length}
          </p>
        </div>
        <div className="card bg-green-50 border-green-200">
          <p className="text-sm text-green-600">Opgelost</p>
          <p className="text-2xl font-medium text-green-700">
            {resolvedAlerts.length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-sand-600">Totaal</p>
          <p className="text-2xl font-medium text-sand-900">
            {alerts.length}
          </p>
        </div>
      </div>

      {/* Pending Alerts */}
      <div className="mb-8">
        <h2 className="text-xl font-medium text-sand-900 mb-4">
          Openstaande alerts
        </h2>
        {pendingAlerts.length === 0 ? (
          <div className="card text-center py-8 bg-green-50 border-green-200">
            <span className="text-4xl mb-2 block">✅</span>
            <p className="text-green-700">Geen openstaande alerts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </div>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-medium text-sand-900 mb-4">
            Recent opgelost
          </h2>
          <div className="space-y-4 opacity-60">
            {resolvedAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="card bg-sand-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-sand">{alert.riskLevel}</span>
                  <span className="badge badge-sand">{alert.type}</span>
                  <span className="text-sm text-sand-500">
                    Opgelost: {alert.resolvedAt?.toLocaleDateString('nl-NL')}
                  </span>
                </div>
                <p className="text-sand-600 text-sm">{alert.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-8 card bg-blue-50 border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">ℹ️ Over dit systeem</h3>
        <p className="text-blue-700 text-sm">
          Het AI-systeem scant automatisch content op mogelijk risicovolle signalen. 
          Dit systeem is bedoeld als hulpmiddel, niet als vervanging van menselijk 
          oordeel. Controleer altijd zelf de context voordat je actie onderneemt.
        </p>
      </div>
    </div>
  )
}
