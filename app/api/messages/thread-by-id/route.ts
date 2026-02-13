import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { createSafetyAlert } from '@/lib/safety'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('threadId')

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is verplicht' },
        { status: 400 }
      )
    }

    const thread = await prisma.dmThread.findUnique({
      where: { id: threadId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: {
              include: { profile: true },
            },
          },
        },
      },
    })

    if (!thread) {
      return NextResponse.json(
        { error: 'Gesprek niet gevonden' },
        { status: 404 }
      )
    }

    // Check if user is part of this thread
    if (thread.userAId !== session.user.id && thread.userBId !== session.user.id) {
      return NextResponse.json(
        { error: 'Geen toegang tot dit gesprek' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      messages: thread.messages,
    })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('threadId')
    const { body } = await request.json()

    if (!threadId) {
      return NextResponse.json(
        { error: 'Thread ID is verplicht' },
        { status: 400 }
      )
    }

    if (!body || body.trim().length === 0) {
      return NextResponse.json(
        { error: 'Bericht mag niet leeg zijn' },
        { status: 400 }
      )
    }

    const thread = await prisma.dmThread.findUnique({
      where: { id: threadId },
    })

    if (!thread) {
      return NextResponse.json(
        { error: 'Gesprek niet gevonden' },
        { status: 404 }
      )
    }

    if (thread.userAId !== session.user.id && thread.userBId !== session.user.id) {
      return NextResponse.json(
        { error: 'Geen toegang tot dit gesprek' },
        { status: 403 }
      )
    }

    // Create message
    const message = await prisma.dmMessage.create({
      data: {
        threadId,
        senderId: session.user.id,
        body,
      },
    })

    // Update thread last message time
    await prisma.dmThread.update({
      where: { id: threadId },
      data: { lastMessageAt: new Date() },
    })

    // Scan for safety concerns
    await createSafetyAlert('PRIVATE', message.id, body)

    return NextResponse.json({
      success: true,
      message,
    })
  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan' },
      { status: 500 }
    )
  }
}
