import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Geen toegang' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const pendingOnly = searchParams.get('pending') === 'true'

    const alerts = await prisma.safetyAlert.findMany({
      where: pendingOnly ? { resolvedAt: null } : undefined,
      orderBy: [
        { resolvedAt: 'asc' },
        { riskLevel: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 100,
    })

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error('Get alerts error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan' },
      { status: 500 }
    )
  }
}
