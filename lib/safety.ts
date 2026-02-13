import { prisma } from './prisma'
import { AlertType, RiskLevel } from '@prisma/client'

// Keywords that might indicate concerning content
const HIGH_RISK_KEYWORDS = [
  'zelfmoord', 'suicide', 'zelfdoding', 'dood wil', 'niet meer leven',
  'afmaken', 'einde aan maken', 'niet verder kunnen', 'geen uitweg',
]

const MEDIUM_RISK_KEYWORDS = [
  'depressief', 'depressie', 'wanhoop', 'hopeloos', 'geen zin meer',
  'leeg', 'niks voelen', 'afstandelijk', 'niet meer eten', 'niet slapen',
  'paniekaanval', 'angstig', 'overweldigd', 'burn-out', 'overspannen',
]

const LOW_RISK_KEYWORDS = [
  'verdrietig', 'boos', 'frustratie', 'eenzaam', 'alleen', 'gestrest',
  'moe', 'uitgeput', 'overprikkeld', 'rusteloos', 'onzeker',
]

interface ScanResult {
  riskLevel: RiskLevel
  reason: string
  keywords: string[]
}

export function scanContent(content: string): ScanResult {
  const lowerContent = content.toLowerCase()
  const foundKeywords: string[] = []
  let highestRisk = RiskLevel.LOW
  let reason = 'No concerning content detected'

  // Check high risk
  for (const keyword of HIGH_RISK_KEYWORDS) {
    if (lowerContent.includes(keyword)) {
      foundKeywords.push(keyword)
      highestRisk = RiskLevel.HIGH
      reason = 'High risk content detected - immediate attention may be needed'
    }
  }

  // Check medium risk
  if (highestRisk !== RiskLevel.HIGH) {
    for (const keyword of MEDIUM_RISK_KEYWORDS) {
      if (lowerContent.includes(keyword)) {
        foundKeywords.push(keyword)
        highestRisk = RiskLevel.MEDIUM
        reason = 'Medium risk content detected - monitoring recommended'
      }
    }
  }

  // Check low risk
  if (highestRisk === RiskLevel.LOW) {
    for (const keyword of LOW_RISK_KEYWORDS) {
      if (lowerContent.includes(keyword)) {
        foundKeywords.push(keyword)
        reason = 'Low risk content detected - general wellbeing check'
      }
    }
  }

  return {
    riskLevel: foundKeywords.length > 0 ? highestRisk : RiskLevel.LOW,
    reason: foundKeywords.length > 0 ? reason : 'No concerning keywords found',
    keywords: foundKeywords,
  }
}

export async function createSafetyAlert(
  type: AlertType,
  refId: string,
  content: string
) {
  const scan = scanContent(content)

  // Only create alerts for medium and high risk
  if (scan.riskLevel === RiskLevel.LOW) {
    return null
  }

  const alert = await prisma.safetyAlert.create({
    data: {
      type,
      refId,
      riskLevel: scan.riskLevel,
      reason: scan.reason,
      content: content.substring(0, 500), // Store preview
    },
  })

  return alert
}

export async function getPendingAlerts() {
  return prisma.safetyAlert.findMany({
    where: { resolvedAt: null },
    orderBy: [
      { riskLevel: 'desc' },
      { createdAt: 'desc' },
    ],
  })
}

export async function resolveAlert(alertId: string, resolverId: string, notes?: string) {
  return prisma.safetyAlert.update({
    where: { id: alertId },
    data: {
      resolvedAt: new Date(),
      resolvedBy: resolverId,
      notes,
    },
  })
}
