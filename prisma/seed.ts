import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const user = await prisma.user.create({
    data: {
      id: 'kp_03b3fdf709fd4ae2a477378e597f17dc',
      email: 'chiangjason67@gmail.com',
      posts: {
        create: {
          content: 'massa nam.',
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
