import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatDateTime, formatRelativeTime, getInitials } from '@/lib/utils'
import { ReplyForm } from '@/components/ReplyForm'
import { ReplyCard } from '@/components/ReplyCard'
import { StartDMButton } from '@/components/StartDMButton'

interface PageProps {
  searchParams: { id?: string }
}

async function getTopic(id: string) {
  return prisma.topic.findUnique({
    where: { id },
    include: {
      category: true,
      author: {
        include: { profile: true },
      },
      replies: {
        orderBy: { createdAt: 'asc' },
        include: {
          author: {
            include: { profile: true },
          },
        },
      },
    },
  })
}

export default async function TopicPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/community')
  }

  const topicId = searchParams.id
  if (!topicId) {
    notFound()
  }

  const topic = await getTopic(topicId)

  if (!topic) {
    notFound()
  }

  const isAuthor = topic.author.id === session.user.id
  const canDM = !isAuthor && topic.author.profile?.allowDm

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-sand-600 mb-6">
        <Link href="/community" className="hover:text-sand-900">Community</Link>
        <span>/</span>
        <Link href={`/community/category-detail?slug=${topic.category.slug}`} className="hover:text-sand-900">
          {topic.category.name}
        </Link>
        <span>/</span>
        <span className="text-sand-900 truncate max-w-xs">{topic.title}</span>
      </div>

      {/* Topic Header */}
      <div className="card mb-6">
        <div className="flex items-start gap-4">
          <Link href={`/u/${topic.author.profile?.username}`} className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-700 font-medium text-lg">
              {getInitials(topic.author.profile?.username || 'U')}
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-medium text-sand-900 mb-2">{topic.title}</h1>
            <div className="flex items-center gap-3 text-sm text-sand-500 mb-4">
              <Link 
                href={`/u/${topic.author.profile?.username}`}
                className="font-medium text-sand-700 hover:text-terracotta-600"
              >
                {topic.author.profile?.username}
              </Link>
              <span>•</span>
              <span>{formatDateTime(topic.createdAt)}</span>
              {topic.status === 'LOCKED' && (
                <>
                  <span>•</span>
                  <span className="badge badge-sand">Gesloten</span>
                </>
              )}
            </div>
            {topic.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {topic.tags.map((tag) => (
                  <span key={tag} className="badge badge-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 prose-content whitespace-pre-wrap">
          {topic.body}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-sand-200 flex items-center gap-4">
          {canDM && (
            <StartDMButton
              userId={topic.author.id}
              username={topic.author.profile?.username || ''}
            />
          )}
          {topic.status === 'OPEN' && (
            <span className="text-sm text-sand-500">
              {topic.replies.length} reacties
            </span>
          )}
        </div>
      </div>

      {/* Replies */}
      {topic.replies.length > 0 && (
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-medium text-sand-900">Reacties</h2>
          {topic.replies.map((reply) => (
            <ReplyCard
              key={reply.id}
              reply={{
                ...reply,
                createdAt: reply.createdAt,
              }}
              currentUserId={session.user.id}
            />
          ))}
        </div>
      )}

      {/* Reply Form */}
      {topic.status === 'OPEN' ? (
        <div className="card">
          <h3 className="text-lg font-medium text-sand-900 mb-4">Plaats een reactie</h3>
          <ReplyForm topicId={topic.id} />
        </div>
      ) : (
        <div className="card bg-sand-50 text-center py-8">
          <p className="text-sand-600">Dit topic is gesloten voor nieuwe reacties.</p>
        </div>
      )}
    </div>
  )
}
