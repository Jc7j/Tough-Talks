import { z } from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

const PostSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(316, 'Max characters is 316'),
})

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany()

    return new NextResponse(JSON.stringify(posts))
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const parsedBody = PostSchema.parse(req.body)
    const { content } = parsedBody

    const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const post = await prisma.post.create({
      data: {
        content,
        timeTillExpire,
        authorId: 'AUTHOR_ID', // Ensure this is replaced with actual logic.
      },
    })

    res.status(200).json(post)
  } catch (error) {
    console.error('Failed to create post:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
