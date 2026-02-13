'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/community'
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email.toLowerCase(),
        password: formData.password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError('Er is iets misgegaan. Probeer het opnieuw.')
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
            E-mailadres
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
          <label htmlFor="password" className="block text-sm font-medium text-sand-700 mb-2">
            Wachtwoord
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="input-field"
            required
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary"
          aria-label={isLoading ? 'Bezig met inloggen' : 'Inloggen'}
        >
          {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sand-600">
          Nog geen account?{' '}
          <Link href="/register" className="text-terracotta-600 hover:text-terracotta-700 font-medium">
            Registreer je gratis
          </Link>
        </p>
        <p className="text-sm">
          <Link href="/wachtwoord-vergeten" className="text-sand-500 hover:text-sand-700">
            Wachtwoord vergeten?
          </Link>
        </p>
      </div>
    </div>
  )
}
