import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// export const prisma = new PrismaClient().$extends(withAccelerate())



// export const getPrisma = (database_url: string) => {
//     const prisma = new PrismaClient({
//       datasourceUrl: database_url,
//     }).$extends(withAccelerate())
//     return prisma
//   }


export const getPrisma = (database_url: string) => {
    if (!database_url) {
      throw new Error("DATABASE_URL is missing");
    }
    const prisma = new PrismaClient({
      datasources: { db: { url: database_url } },
    }).$extends(withAccelerate());
    return prisma;
  };
  