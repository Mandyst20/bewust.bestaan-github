'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
}

interface NewTopicFormProps {
  categories: Category[]
  defaultCategoryId?: string
}

export function NewTopicForm({ categories, defaultCategoryId }: NewTopicFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    categoryId: defaultCategoryId || categories[0]?.id || '',
    tags: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      router.push(`/community/topic/${data.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is iets misgegaan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="alert-error">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-sand-700 mb-2">
          Categorie
        </label>
        <select
          id="category"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="select-field"
          required
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-sand-700 mb-2">
          Titel
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input-field"
          placeholder="Waar wil je over praten?"
          required
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-sand-700 mb-2">
          Jouw verhaal
        </label>
        <textarea
          id="body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className="textarea-field"
          placeholder="Deel hier wat je bezighoudt..."
          required
          rows={8}
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-sand-700 mb-2">
          Tags (optioneel, gescheiden door komma's)
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="input-field"
          placeholder="bijv. rust, meditatie, werk"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Bezig met plaatsen...' : 'Plaats topic'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          Annuleren
        </button>
      </div>
    </form>
  )
}
