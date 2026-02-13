'use client'

import Link from 'next/link'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import { StartDMButton } from './StartDMButton'

interface ReplyCardProps {
  reply: {
    id: string
    body: string
    createdAt: Date
    author: {
      id: string
      profile: {
        username: string
        allowDm: boolean
      } | null
    }
  }
  currentUserId?: string
}

export function ReplyCard({ reply, currentUserId }: ReplyCardProps) {
  const isOwnReply = reply.author.id === currentUserId
  const canDM = !isOwnReply && reply.author.profile?.allowDm

  return (
    <div className="card card-hover">
      <div className="flex gap-4">
        {/* Avatar */}
        <Link href={`/u/${reply.author.profile?.username}`} className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-medium">
            {getInitials(reply.author.profile?.username || 'U')}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/u/${reply.author.profile?.username}`}
              className="font-medium text-sand-900 hover:text-terracotta-600"
            >
              {reply.author.profile?.username}
            </Link>
            <span className="text-sand-400">•</span>
            <span className="text-sm text-sand-500">
              {formatRelativeTime(reply.createdAt)}
            </span>
          </div>

          <div className="prose-content text-sand-700 whitespace-pre-wrap">
            {reply.body}
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-3">
            {canDM && (
              <StartDMButton
                userId={reply.author.id}
                username={reply.author.profile?.username || ''}
                size="sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
