'use server'

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

const FormSchema = z.object({
  id: z.string(),
  content: z.string({
    required_error: 'Theres no content',
  }),
})

export type State = {
  errors?: {
    userId?: string
    content?: string
  }
  message?: string | null
}

const CreateContent = FormSchema.omit({ id: true })

export async function postContent(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreateContent.safeParse({
    content: formData.get('content') as string,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error,
      message: 'Missing content. Failed to Create Post',
    }
  }

  const userExists = await prisma.user.findUnique({ where: { id } })
  if (!userExists) {
    return { message: 'User not found. Failed to create post' }
  } 

  const { content } = validatedFields.data
  const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)

  try {
    await prisma.post.create({
      data: {
        content: content,
        authorId: id,
        timeTillExpire,
      },
    })

    revalidatePath('/home')
    redirect('/home')
  } catch (err) {
    // @TODO The post is created, but we still catch an error for some reason.. 
    console.error('Database operation failed:', err)
    return {
      message: 'DB Error. Failed to create post',
    }
  }
}

export async function fetchPosts() {
  try {
    console.log('Fetching revenue data...')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await prisma.post.findMany()

    return data
  } catch (err) {
    console.error('DB Error', err)
    throw new Error('Failed to fetch Posts data')
  }
}
