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
        { error: 'Je moet ingelogd zijn om een topic te plaatsen' },
        { status: 401 }
      )
    }

    const { title, body, categoryId, tags } = await request.json()

    // Validation
    if (!title || !body || !categoryId) {
      return NextResponse.json(
        { error: 'Titel, inhoud en categorie zijn verplicht' },
        { status: 400 }
      )
    }

    if (title.length < 5 || title.length > 200) {
      return NextResponse.json(
        { error: 'Titel moet tussen 5 en 200 tekens zijn' },
        { status: 400 }
      )
    }

    if (body.length < 10) {
      return NextResponse.json(
        { error: 'Inhoud moet minimaal 10 tekens bevatten' },
        { status: 400 }
      )
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Categorie niet gevonden' },
        { status: 404 }
      )
    }

    // Create topic
    const topic = await prisma.topic.create({
      data: {
        title,
        body,
        categoryId,
        authorId: session.user.id,
        tags: tags || [],
      },
    })

    // Scan for safety concerns
    await createSafetyAlert('TOPIC', topic.id, body)

    return NextResponse.json({
      success: true,
      id: topic.id,
    })
  } catch (error) {
    console.error('Create topic error:', error)
    return NextResponse.json(
      { error: 'Er is iets misgegaan bij het plaatsen van het topic' },
      { status: 500 }
    )
  }
}
