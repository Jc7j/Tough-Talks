import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function fetchPosts() {
  try {
    console.log('Fetching revenue data...')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await prisma.post.findMany()
    console.log(data)
    return data
  } catch (err) {
    console.error('DB Error', err)
    throw new Error('Failed to fetch Posts data')
  }
}
