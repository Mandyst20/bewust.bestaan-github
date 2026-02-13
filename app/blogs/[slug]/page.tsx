import { getServerSession } from 'next-auth/next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: { slug: string }
}

async function getBlog(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug, published: true },
  })
}

export default async function BlogPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/blogs')
  }

  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-sand-600 mb-6">
        <Link href="/blogs" className="hover:text-sand-900">Blogs</Link>
        <span>/</span>
        <span className="text-sand-900 truncate max-w-xs">{blog.title}</span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-br from-terracotta-100 to-sage-100 rounded-2xl h-64 flex items-center justify-center mb-6">
          <span className="text-6xl">📝</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-sand-900 mb-4">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-sand-500">
          <span>{formatDate(blog.createdAt)}</span>
          {blog.readTime && (
            <>
              <span>•</span>
              <span>{blog.readTime} min leestijd</span>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <article className="prose-content whitespace-pre-wrap">
        {blog.body}
      </article>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-sand-200">
        <Link href="/blogs" className="btn-secondary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Terug naar blogs
        </Link>
      </div>
    </div>
  )
}
