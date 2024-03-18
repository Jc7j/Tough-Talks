// global.d.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Extending the global namespace for NodeJS
  var prisma: PrismaClient | undefined
}
