import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      // @ts-ignore
      posts: {
        create: {
          content: 'Damn this is crazy',
          timeTillExpire,
        }
      } 
    }
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
