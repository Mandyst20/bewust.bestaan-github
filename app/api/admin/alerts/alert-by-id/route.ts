import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Geen toegang' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const alertId = searchParams.get('alertId')
    const { notes } = await request.json()

    if (!alertId) {
      return NextResponse.json(
        { error: 'Alert ID is verplicht' },
        { status: 400 }
      )
    }

    const alert = await prisma.safetyAlert.update({
      where: { id: alertId },
      data: {
        resolvedAt: new Date(),
        resolvedBy: session.user.id,
        notes,
      },
    })

    return NextResponse.json({
      success: true,
      alert,
    })
  } catch (error) {
    console.error('Resolve alert error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan' },
      { status: 500 }
    )
  }
}
