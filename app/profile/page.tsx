import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { ProfileForm } from '@/components/ProfileForm'

async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  })
  return user
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/profile')
  }

  const user = await getUserProfile(session.user.id)

  if (!user || !user.profile) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="page-title">Jouw profiel</h1>
        <p className="page-description">
          Beheer je persoonlijke informatie en privacy-instellingen
        </p>
      </div>

      <div className="card">
        <ProfileForm
          initialData={{
            username: user.profile.username,
            bio: user.profile.bio || '',
            allowDm: user.profile.allowDm,
          }}
        />
      </div>

      <div className="mt-8 card bg-sand-50">
        <h3 className="font-medium text-sand-900 mb-4">Account informatie</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-sand-600">E-mail</span>
            <span className="text-sand-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sand-600">Rol</span>
            <span className="text-sand-900">
              {user.role === 'ADMIN' ? 'Beheerder' : 'Lid'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sand-600">Lid sinds</span>
            <span className="text-sand-900">
              {new Date(user.createdAt).toLocaleDateString('nl-NL')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
