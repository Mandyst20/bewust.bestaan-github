import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatRelativeTime, getInitials } from '@/lib/utils'

async function getThreads(userId: string) {
  return prisma.dmThread.findMany({
    where: {
      OR: [
        { userAId: userId },
        { userBId: userId },
      ],
    },
    orderBy: { lastMessageAt: 'desc' },
    include: {
      userA: {
        include: { profile: true },
      },
      userB: {
        include: { profile: true },
      },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })
}

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/messages')
  }

  const threads = await getThreads(session.user.id)

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="page-title">Berichten</h1>
        <p className="page-description">
          Je privégesprekken met andere leden
        </p>
      </div>

      {threads.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">💌</div>
          <h2 className="text-xl font-medium text-sand-900 mb-2">
            Nog geen berichten
          </h2>
          <p className="text-sand-600 mb-6 max-w-md mx-auto">
            Start een privégesprek vanaf iemands profiel of vanuit een topic 
            waarop je hebt gereageerd.
          </p>
          <Link href="/community" className="btn-primary">
            Ga naar de community
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {threads.map((thread) => {
            const otherUser = thread.userAId === session.user.id 
              ? thread.userB 
              : thread.userA
            const lastMessage = thread.messages[0]

            return (
              <Link
                key={thread.id}
                href={`/messages/${thread.id}`}
                className="card card-hover flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-medium flex-shrink-0">
                  {getInitials(otherUser.profile?.username || 'U')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-sand-900 truncate">
                      {otherUser.profile?.username}
                    </h3>
                    {lastMessage && (
                      <span className="text-sm text-sand-500 flex-shrink-0">
                        {formatRelativeTime(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {lastMessage ? (
                    <p className="text-sand-600 text-sm truncate">
                      {lastMessage.senderId === session.user.id ? 'Jij: ' : ''}
                      {lastMessage.body}
                    </p>
                  ) : (
                    <p className="text-sand-400 text-sm italic">
                      Start het gesprek...
                    </p>
                  )}
                </div>
                <svg className="w-5 h-5 text-sand-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
