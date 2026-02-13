import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import { StartDMButton } from '@/components/StartDMButton'

interface PageProps {
  params: { username: string }
}

async function getUserProfile(username: string) {
  return prisma.profile.findUnique({
    where: { username },
    include: {
      user: {
        include: {
          topics: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      },
    },
  })
}

export default async function UserProfilePage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/u/' + params.username)
  }

  const profile = await getUserProfile(params.username)

  if (!profile) {
    notFound()
  }

  const isOwnProfile = profile.user.id === session.user.id
  const canDM = !isOwnProfile && profile.allowDm

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Profile Header */}
      <div className="card mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-700 font-medium text-3xl flex-shrink-0">
            {getInitials(profile.username)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-medium text-sand-900 mb-2">
              {profile.username}
            </h1>
            {profile.bio ? (
              <p className="text-sand-600 whitespace-pre-wrap">{profile.bio}</p>
            ) : (
              <p className="text-sand-400 italic">Geen bio ingesteld</p>
            )}
            
            <div className="mt-4 flex items-center gap-4">
              {isOwnProfile ? (
                <Link href="/profile" className="btn-secondary text-sm">
                  Profiel bewerken
                </Link>
              ) : canDM ? (
                <StartDMButton
                  userId={profile.user.id}
                  username={profile.username}
                />
              ) : (
                <span className="text-sm text-sand-500">
                  Privéberichten uitgeschakeld
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Topics */}
      <div>
        <h2 className="text-xl font-medium text-sand-900 mb-4">
          Recente topics van {profile.username}
        </h2>
        
        {profile.user.topics.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-sand-600">
              {profile.username} heeft nog geen topics geplaatst.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profile.user.topics.map((topic) => (
              <Link
                key={topic.id}
                href={`/community/topic-detail?id=${topic.id}`}
                className="card card-hover block"
              >
                <h3 className="font-medium text-sand-900 mb-2">{topic.title}</h3>
                <p className="text-sand-600 text-sm line-clamp-2 mb-2">
                  {topic.body.substring(0, 150)}
                  {topic.body.length > 150 ? '...' : ''}
                </p>
                <span className="text-sm text-sand-500">
                  {formatRelativeTime(topic.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
