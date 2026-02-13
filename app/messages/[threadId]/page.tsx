import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { ChatInterface } from '@/components/ChatInterface'

interface PageProps {
  params: { threadId: string }
}

async function getThread(threadId: string, userId: string) {
  const thread = await prisma.dmThread.findUnique({
    where: { id: threadId },
    include: {
      userA: {
        include: { profile: true },
      },
      userB: {
        include: { profile: true },
      },
      messages: {
        orderBy: { createdAt: 'asc' },
        include: {
          sender: {
            include: { profile: true },
          },
        },
      },
    },
  })

  if (!thread) return null

  // Check if user is part of this thread
  if (thread.userAId !== userId && thread.userBId !== userId) {
    return null
  }

  return thread
}

export default async function ThreadPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/messages/' + params.threadId)
  }

  const thread = await getThread(params.threadId, session.user.id)

  if (!thread) {
    notFound()
  }

  const otherUser = thread.userAId === session.user.id
    ? {
        id: thread.userB.id,
        username: thread.userB.profile?.username || 'Onbekend',
        allowDm: thread.userB.profile?.allowDm ?? true,
      }
    : {
        id: thread.userA.id,
        username: thread.userA.profile?.username || 'Onbekend',
        allowDm: thread.userA.profile?.allowDm ?? true,
      }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ChatInterface
        threadId={thread.id}
        currentUserId={session.user.id}
        otherUser={otherUser}
        initialMessages={thread.messages.map(m => ({
          id: m.id,
          body: m.body,
          createdAt: m.createdAt.toISOString(),
          senderId: m.senderId,
          sender: {
            profile: m.sender.profile,
          },
        }))}
      />
    </div>
  )
}
