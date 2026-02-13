import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Artikelen over Bewust Leven | Bewust Bestaan',
  description: 'Lees artikelen over mindfulness, persoonlijke groei, emoties en innerlijke rust. Praktische tips voor bewust leven in Nederland.',
  alternates: {
    canonical: 'https://bewustbestaan.nl/blogs',
  },
  openGraph: {
    title: 'Artikelen over Bewust Leven | Bewust Bestaan',
    description: 'Praktische artikelen over mindfulness, persoonlijke groei en innerlijke rust.',
    type: 'website',
    locale: 'nl_NL',
  },
}

async function getBlogs() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
  })
}

export default async function BlogsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/blogs')
  }

  const blogs = await getBlogs()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-sand-900 mb-4">
          Artikelen over bewust leven
        </h1>
        <p className="text-sand-600">
          Praktische artikelen over mindfulness, persoonlijke groei, emoties en 
          het vinden van rust in een drukke wereld. Speciaal geschreven voor onze Nederlandse community.
        </p>
      </header>

      {/* Featured Blog */}
      {blogs.find(b => b.featured) && (
        <section className="mb-12" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">Uitgelicht artikel</h2>
          {blogs
            .filter(b => b.featured)
            .slice(0, 1)
            .map(blog => (
              <article key={blog.id}>
                <Link
                  href={`/artikel/${blog.slug}`}
                  className="card card-hover block overflow-hidden"
                  aria-label={`Lees uitgelicht artikel: ${blog.title}`}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-terracotta-100 to-sage-100 rounded-lg h-64 flex items-center justify-center" aria-hidden="true">
                      <span className="text-6xl">📝</span>
                    </div>
                    <div className="flex flex-col justify-center py-4">
                      <span className="badge badge-primary w-fit mb-4">Uitgelicht</span>
                      <h3 className="text-2xl font-medium text-sand-900 mb-3">
                        {blog.title}
                      </h3>
                      <p className="text-sand-600 mb-4 line-clamp-3">
                        {blog.excerpt || blog.body.substring(0, 200)}...
                      </p>
                      <div className="flex items-center gap-2 text-sm text-sand-500">
                        <time dateTime={blog.createdAt.toISOString()}>
                          {formatDate(blog.createdAt)}
                        </time>
                        {blog.readTime && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span>{blog.readTime} min leestijd</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
        </section>
      )}

      {/* Blog Grid */}
      <section aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="sr-only">Alle artikelen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.filter(b => !b.featured).map(blog => (
            <article key={blog.id}>
              <Link
                href={`/artikel/${blog.slug}`}
                className="card card-hover flex flex-col h-full"
                aria-label={`Lees artikel: ${blog.title}`}
              >
                <div className="bg-gradient-to-br from-sand-100 to-sand-200 rounded-lg h-48 flex items-center justify-center mb-4" aria-hidden="true">
                  <span className="text-4xl">📖</span>
                </div>
                <h3 className="text-lg font-medium text-sand-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sand-600 text-sm mb-4 line-clamp-3 flex-1">
                  {blog.excerpt || blog.body.substring(0, 150)}...
                </p>
                <div className="flex items-center gap-2 text-sm text-sand-500 pt-4 border-t border-sand-100">
                  <time dateTime={blog.createdAt.toISOString()}>
                    {formatDate(blog.createdAt)}
                  </time>
                  {blog.readTime && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span>{blog.readTime} min</span>
                    </>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {blogs.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-sand-600">Nog geen artikelen beschikbaar.</p>
        </div>
      )}

      {/* SEO Content */}
      <section className="mt-12 card bg-sand-50" aria-labelledby="about-articles">
        <h2 id="about-articles" className="text-lg font-medium text-sand-900 mb-3">
          Artikelen over persoonlijke groei
        </h2>
        <p className="text-sand-600 text-sm">
          Onze artikelen zijn speciaal geschreven voor mensen in Nederland die bezig zijn met 
          persoonlijke ontwikkeling. We behandelen onderwerpen die relevant zijn voor het 
          Nederlandse leven: van omgaan met prestatiedruk en werkstress, tot het vinden van 
          balans in een druk bestaan. Alle content is geschreven in begrijpelijk Nederlands 
          en direct toepasbaar in je dagelijks leven.
        </p>
      </section>
    </div>
  )
}
