'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  initialData: {
    username: string
    bio: string
    allowDm: boolean
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState(initialData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      setSuccess('Profiel succesvol bijgewerkt!')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is iets misgegaan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="alert-error">{error}</div>}
      {success && <div className="alert-success">{success}</div>}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-sand-700 mb-2">
          Gebruikersnaam
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="input-field"
          required
          minLength={2}
          maxLength={30}
        />
        <p className="text-sm text-sand-500 mt-1">
          Dit is hoe andere je zien in de community.
        </p>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-sand-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="textarea-field"
          rows={4}
          maxLength={500}
          placeholder="Vertel iets over jezelf..."
        />
        <p className="text-sm text-sand-500 mt-1">
          {formData.bio.length}/500 tekens
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 bg-sand-50 rounded-lg">
        <input
          type="checkbox"
          id="allowDm"
          checked={formData.allowDm}
          onChange={(e) => setFormData({ ...formData, allowDm: e.target.checked })}
          className="w-5 h-5 text-terracotta-600 rounded border-sand-300 focus:ring-terracotta-500"
        />
        <div>
          <label htmlFor="allowDm" className="font-medium text-sand-900 cursor-pointer">
            Privéberichten toestaan
          </label>
          <p className="text-sm text-sand-600">
            Andere gebruikers kunnen je een privégesprek starten.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Bezig met opslaan...' : 'Opslaan'}
        </button>
      </div>
    </form>
  )
}
