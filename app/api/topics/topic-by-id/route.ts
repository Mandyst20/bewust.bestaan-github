// This is a placeholder - we'll handle dynamic routes differently
// For now, replies will be handled via query params

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { createSafetyAlert } from '@/lib/safety'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn om te reageren' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const topicId = searchParams.get('topicId')
    const { body } = await request.json()

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is verplicht' },
        { status: 400 }
      )
    }

    if (!body || body.length < 2) {
      return NextResponse.json(
        { error: 'Reactie moet minimaal 2 tekens bevatten' },
        { status: 400 }
      )
    }

    // Check if topic exists and is open
    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
    })

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic niet gevonden' },
        { status: 404 }
      )
    }

    if (topic.status === 'LOCKED') {
      return NextResponse.json(
        { error: 'Dit topic is gesloten voor reacties' },
        { status: 403 }
      )
    }

    // Create reply
    const reply = await prisma.topicReply.create({
      data: {
        topicId,
        authorId: session.user.id,
        body,
      },
    })

    // Scan for safety concerns
    await createSafetyAlert('REPLY', reply.id, body)

    return NextResponse.json({
      success: true,
      id: reply.id,
    })
  } catch (error) {
    console.error('Create reply error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan bij het plaatsen van de reactie' },
      { status: 500 }
    )
  }
}
