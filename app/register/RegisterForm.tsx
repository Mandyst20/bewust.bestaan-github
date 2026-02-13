'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Wachtwoorden komen niet overeen')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Wachtwoord moet minimaal 6 tekens bevatten')
      setIsLoading(false)
      return
    }

    if (!acceptedGuidelines) {
      setError('Je moet de communityrichtlijnen accepteren om verder te gaan')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          username: formData.username,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      router.push('/login?registered=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er is iets misgegaan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      {error && (
        <div className="alert-error mb-6" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-sand-700 mb-2">
            E-mailadres <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
            required
            autoComplete="email"
            placeholder="jouw@email.nl"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-sand-700 mb-2">
            Gebruikersnaam <span className="text-red-500">*</span>
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
            placeholder="bijv. jan_2024"
          />
          <p className="text-sm text-sand-500 mt-1">
            Dit is hoe andere leden je zien in de community
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-sand-700 mb-2">
            Wachtwoord <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="input-field"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Minimaal 6 tekens"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-sand-700 mb-2">
            Bevestig wachtwoord <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="input-field"
            required
            autoComplete="new-password"
            placeholder="Herhaal je wachtwoord"
          />
        </div>

        <div className="flex items-start gap-3 p-4 bg-sand-50 rounded-lg">
          <input
            type="checkbox"
            id="guidelines"
            checked={acceptedGuidelines}
            onChange={(e) => setAcceptedGuidelines(e.target.checked)}
            className="w-5 h-5 text-terracotta-600 rounded border-sand-300 focus:ring-terracotta-500 mt-0.5"
            required
          />
          <div>
            <label htmlFor="guidelines" className="text-sm text-sand-700 cursor-pointer">
              Ik ga akkoord met de{' '}
              <Link href="/richtlijnen" className="text-terracotta-600 hover:underline font-medium" target="_blank">
                communityrichtlijnen
              </Link>
              {' '}en beloof respectvol om te gaan met andere leden.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary"
          aria-label={isLoading ? 'Bezig met registreren' : 'Gratis account aanmaken'}
        >
          {isLoading ? 'Bezig met registreren...' : 'Gratis account aanmaken'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sand-600">
          Al een account?{' '}
          <Link href="/login" className="text-terracotta-600 hover:text-terracotta-700 font-medium">
            Log hier in
          </Link>
        </p>
      </div>

      <p className="text-xs text-sand-500 text-center mt-4">
        Door te registreren accepteer je onze voorwaarden en privacybeleid. 
        Je gegevens zijn veilig en worden nooit gedeeld met derden.
      </p>
    </div>
  )
}
