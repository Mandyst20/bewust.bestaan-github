import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()

    // Validation
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'Alle velden zijn verplicht' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Wachtwoord moet minimaal 6 tekens bevatten' },
        { status: 400 }
      )
    }

    if (username.length < 2 || username.length > 30) {
      return NextResponse.json(
        { error: 'Gebruikersnaam moet tussen 2 en 30 tekens zijn' },
        { status: 400 }
      )
    }

    // Check if email exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Dit e-mailadres is al in gebruik' },
        { status: 400 }
      )
    }

    // Check if username exists
    const existingUsername = await prisma.profile.findUnique({
      where: { username },
    })

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Deze gebruikersnaam is al in gebruik' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        emailVerified: true, // Auto-verify for MVP
        profile: {
          create: {
            username,
            allowDm: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      userId: user.id,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan bij het registreren' },
      { status: 500 }
    )
  }
}
