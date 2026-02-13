import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatRelativeTime } from '@/lib/utils'

interface PageProps {
  searchParams: { slug?: string }
}

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      topics: {
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            include: { profile: true },
          },
          _count: {
            select: { replies: true },
          },
        },
      },
    },
  })
}

export default async function CategoryPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/community')
  }

  const slug = searchParams.slug
  if (!slug) {
    notFound()
  }

  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-sand-600 mb-6">
        <Link href="/community" className="hover:text-sand-900">Community</Link>
        <span>/</span>
        <span className="text-sand-900">{category.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-terracotta-100 rounded-xl flex items-center justify-center text-3xl">
            {category.icon || '💭'}
          </div>
          <div>
            <h1 className="text-2xl font-medium text-sand-900">{category.name}</h1>
            <p className="text-sand-600">{category.topics.length} topics</p>
          </div>
        </div>
        <Link href={`/community/new?category=${category.id}`} className="btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nieuw topic
        </Link>
      </div>

      {/* Description */}
      {category.description && (
        <p className="text-sand-600 mb-8 max-w-2xl">{category.description}</p>
      )}

      {/* Topics List */}
      {category.topics.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-sand-600 mb-4">Nog geen topics in deze categorie.</p>
          <Link href={`/community/new?category=${category.id}`} className="btn-primary">
            Wees de eerste!
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {category.topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/community/topic-detail?id=${topic.id}`}
              className="card card-hover block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-medium text-sand-900 mb-2 line-clamp-1">
                    {topic.title}
                  </h2>
                  <p className="text-sand-600 text-sm line-clamp-2 mb-3">
                    {topic.body.substring(0, 150)}
                    {topic.body.length > 150 ? '...' : ''}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-sand-500">
                    <span>Door {topic.author.profile?.username}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(topic.createdAt)}</span>
                    <span>•</span>
                    <span>{topic._count.replies} reacties</span>
                  </div>
                  {topic.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {topic.tags.map((tag) => (
                        <span key={tag} className="badge badge-sand">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <svg className="w-5 h-5 text-sand-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
