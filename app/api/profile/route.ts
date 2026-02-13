import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Je moet ingelogd zijn' },
        { status: 401 }
      )
    }

    const { username, bio, allowDm } = await request.json()

    // Validation
    if (!username || username.length < 2 || username.length > 30) {
      return NextResponse.json(
        { error: 'Gebruikersnaam moet tussen 2 en 30 tekens zijn' },
        { status: 400 }
      )
    }

    // Check if username is taken by another user
    const existingProfile = await prisma.profile.findUnique({
      where: { username },
    })

    if (existingProfile && existingProfile.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Deze gebruikersnaam is al in gebruik' },
        { status: 400 }
      )
    }

    // Update profile
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        username,
        bio: bio || null,
        allowDm,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan bij het bijwerken van je profiel' },
      { status: 500 }
    )
  }
}
