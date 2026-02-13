'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import { RiskLevel, AlertType } from '@prisma/client'

interface AlertCardProps {
  alert: {
    id: string
    type: AlertType
    refId: string
    riskLevel: RiskLevel
    reason: string
    content: string | null
    createdAt: Date
    resolvedAt: Date | null
  }
}

export function AlertCard({ alert }: AlertCardProps) {
  const router = useRouter()
  const [isResolving, setIsResolving] = useState(false)
  const [notes, setNotes] = useState('')
  const [showResolveForm, setShowResolveForm] = useState(false)

  const getRiskClass = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH:
        return 'risk-high'
      case RiskLevel.MEDIUM:
        return 'risk-medium'
      default:
        return 'risk-low'
    }
  }

  const getTypeLabel = (type: AlertType) => {
    switch (type) {
      case AlertType.TOPIC:
        return 'Topic'
      case AlertType.REPLY:
        return 'Reactie'
      case AlertType.PRIVATE:
        return 'Privébericht'
      default:
        return type
    }
  }

  const getLink = () => {
    switch (alert.type) {
      case AlertType.TOPIC:
        return `/community/topic/${alert.refId}`
      case AlertType.REPLY:
        // For replies, we need to find the topic - this is simplified
        return `/community`
      case AlertType.PRIVATE:
        return `/admin/alerts`
      default:
        return '#'
    }
  }

  const handleResolve = async () => {
    setIsResolving(true)

    try {
      const response = await fetch(`/api/admin/alerts/${alert.id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })

      if (!response.ok) {
        throw new Error('Failed to resolve alert')
      }

      router.refresh()
    } catch (err) {
      alert('Er is iets misgegaan bij het oplossen van de alert')
    } finally {
      setIsResolving(false)
    }
  }

  if (alert.resolvedAt) {
    return null
  }

  return (
    <div className="card border-l-4 border-l-terracotta-500">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`badge ${getRiskClass(alert.riskLevel)}`}>
              {alert.riskLevel}
            </span>
            <span className="badge badge-sand">{getTypeLabel(alert.type)}</span>
            <span className="text-sm text-sand-500">
              {formatDateTime(alert.createdAt)}
            </span>
          </div>

          <p className="text-sand-700 mb-2">{alert.reason}</p>

          {alert.content && (
            <blockquote className="border-l-2 border-sand-300 pl-3 text-sand-600 text-sm italic">
              "{alert.content.substring(0, 200)}
              {alert.content.length > 200 ? '...' : ''}"
            </blockquote>
          )}

          <div className="mt-4 flex items-center gap-3">
            <Link
              href={getLink()}
              className="text-terracotta-600 hover:text-terracotta-700 text-sm font-medium"
            >
              Bekijk content →
            </Link>
          </div>
        </div>

        <div>
          {!showResolveForm ? (
            <button
              onClick={() => setShowResolveForm(true)}
              className="btn-secondary text-sm"
            >
              Markeer als opgelost
            </button>
          ) : (
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notities (optioneel)"
                className="textarea-field text-sm min-h-[80px]"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="btn-primary text-sm"
                >
                  {isResolving ? '...' : 'Bevestigen'}
                </button>
                <button
                  onClick={() => setShowResolveForm(false)}
                  className="btn-ghost text-sm"
                >
                  Annuleren
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
