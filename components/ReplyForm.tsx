'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ReplyFormProps {
  topicId: string
}

export function ReplyForm({ topicId }: ReplyFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/topics/${topicId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      setBody('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is iets misgegaan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="alert-error">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="reply" className="block text-sm font-medium text-sand-700 mb-2">
          Jouw reactie
        </label>
        <textarea
          id="reply"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea-field"
          placeholder="Schrijf een reactie..."
          required
          rows={4}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !body.trim()}
          className="btn-primary"
        >
          {isLoading ? 'Bezig met versturen...' : 'Plaats reactie'}
        </button>
      </div>
    </form>
  )
}
