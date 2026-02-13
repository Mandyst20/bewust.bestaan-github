import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      )
    }

    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'Gebruiker ID is verplicht' },
        { status: 400 }
      )
    }

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Je kunt geen gesprek met jezelf starten' },
        { status: 400 }
      )
    }

    // Check if target user allows DMs
    const targetProfile = await prisma.profile.findUnique({
      where: { userId },
    })

    if (!targetProfile) {
      return NextResponse.json(
        { error: 'Gebruiker niet gevonden' },
        { status: 404 }
      )
    }

    if (!targetProfile.allowDm) {
      return NextResponse.json(
        { error: 'Deze gebruiker accepteert geen privéberichten' },
        { status: 403 }
      )
    }

    // Check if thread already exists
    const existingThread = await prisma.dmThread.findFirst({
      where: {
        OR: [
          { userAId: session.user.id, userBId: userId },
          { userAId: userId, userBId: session.user.id },
        ],
      },
    })

    if (existingThread) {
      return NextResponse.json({
        success: true,
        threadId: existingThread.id,
      })
    }

    // Create new thread
    const thread = await prisma.dmThread.create({
      data: {
        userAId: session.user.id,
        userBId: userId,
      },
    })

    return NextResponse.json({
      success: true,
      threadId: thread.id,
    })
  } catch (error) {
    console.error('Start DM error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan' },
      { status: 500 }
    )
  }
}
