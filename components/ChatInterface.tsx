'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { formatDateTime, getInitials } from '@/lib/utils'

interface Message {
  id: string
  body: string
  createdAt: string
  senderId: string
  sender: {
    profile: {
      username: string
    } | null
  }
}

interface ChatInterfaceProps {
  threadId: string
  currentUserId: string
  otherUser: {
    id: string
    username: string
    allowDm: boolean
  }
  initialMessages: Message[]
}

export function ChatInterface({
  threadId,
  currentUserId,
  otherUser,
  initialMessages,
}: ChatInterfaceProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Poll for new messages
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/messages/${threadId}`)
        if (response.ok) {
          const data = await response.json()
          setMessages(data.messages)
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [threadId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/messages/${threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: newMessage }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Er is iets misgegaan')
      }

      setNewMessage('')
      
      // Refresh messages
      const messagesResponse = await fetch(`/api/messages/${threadId}`)
      if (messagesResponse.ok) {
        const data = await messagesResponse.json()
        setMessages(data.messages)
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Er is iets misgegaan')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(e)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-sand-200">
        <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-medium">
          {getInitials(otherUser.username)}
        </div>
        <div>
          <h2 className="font-medium text-sand-900">{otherUser.username}</h2>
          <p className="text-sm text-sand-500">
            {otherUser.allowDm ? 'Privégesprek' : 'DMs uitgeschakeld'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-sand-500 py-8">
            <p>Nog geen berichten.</p>
            <p className="text-sm">Begin het gesprek!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === currentUserId
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    isOwn
                      ? 'bg-terracotta-600 text-white rounded-br-none'
                      : 'bg-white border border-sand-200 text-sand-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.body}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn ? 'text-terracotta-100' : 'text-sand-400'
                    }`}
                  >
                    {formatDateTime(message.createdAt)}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="pt-4 border-t border-sand-200">
        <div className="flex gap-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Typ je bericht... (Enter om te versturen, Shift+Enter voor nieuwe regel)"
            className="flex-1 textarea-field min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="btn-primary self-end"
          >
            {isLoading ? '...' : 'Verstuur'}
          </button>
        </div>
      </form>
    </div>
  )
}
