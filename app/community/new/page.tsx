import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { NewTopicForm } from '@/components/NewTopicForm'

interface PageProps {
  searchParams: { category?: string }
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, name: true },
  })
}

export default async function NewTopicPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/community/new')
  }

  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="page-title">Nieuw topic</h1>
        <p className="page-description">
          Deel je gedachten, vragen of ervaringen met de community
        </p>
      </div>

      <div className="card">
        <NewTopicForm
          categories={categories}
          defaultCategoryId={searchParams.category}
        />
      </div>

      <div className="mt-6 p-4 bg-sand-50 rounded-lg">
        <h3 className="font-medium text-sand-900 mb-2">💡 Tips voor een goed topic:</h3>
        <ul className="text-sm text-sand-600 space-y-1 list-disc list-inside">
          <li>Wees specifiek in je vraag of verhaal</li>
          <li>Geef context zodat anderen je beter kunnen begrijpen</li>
          <li>Wees respectvol en open voor verschillende perspectieven</li>
          <li>Gebruik tags om je topic vindbaar te maken</li>
        </ul>
      </div>
    </div>
  )
}
