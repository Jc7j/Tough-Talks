import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const user = await prisma.user.create({
    data: {
      email: 'test4@test.com',
      // @ts-ignore
      posts: {
        create: {
          content:
            'Nulla quis orci odio. Sed tincidunt sit amet quam eget porttitor. Suspendisse vitae imperdiet lacus. Phasellus in odio non lacus sollicitudin pharetra vel non dolor. Pellentesque interdum leo sit amet aliquet ultrices. Sed lacinia, orci sit amet dignissim malesuada, libero ante eleifend odio, eget cursus massa nam.',
          timeTillExpire,
        },
      },
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
