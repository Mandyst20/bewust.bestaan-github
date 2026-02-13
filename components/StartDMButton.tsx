'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface StartDMButtonProps {
  userId: string
  username: string
  size?: 'sm' | 'md'
}

export function StartDMButton({ userId, username, size = 'md' }: StartDMButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStartDM = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/messages/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      router.push(`/messages/${data.threadId}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Er is iets misgegaan')
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = size === 'sm' 
    ? 'px-3 py-1.5 text-sm' 
    : 'px-4 py-2'

  return (
    <button
      onClick={handleStartDM}
      disabled={isLoading}
      className={`inline-flex items-center gap-1.5 ${sizeClasses} 
                  text-terracotta-600 hover:text-terracotta-700 
                  bg-terracotta-50 hover:bg-terracotta-100
                  rounded-lg font-medium transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      {isLoading ? 'Laden...' : `Privé verder praten`}
    </button>
  )
}
