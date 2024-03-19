import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany()

    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { content, userId } = await req.json()

    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      return NextResponse.json(
        { error: 'User not found. Internal Server Error' },
        { status: 500 }
      )
    }

    const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)
    await prisma.post.create({
      data: {
        content,
        timeTillExpire,
        authorId: userId,
      },
    })

    return NextResponse.json({ message: 'Post is created' }, { status: 200 })
  } catch (error) {
    // console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
