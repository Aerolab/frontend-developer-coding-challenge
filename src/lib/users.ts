import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function findUserByEmail(email: string) {
  try {
    return prisma.user.findUnique({
      where: { email },
    })
  } catch (error) {
    throw new Error("Ups... Something went wrong accessing the database. Try again please")
  }
}

export async function createUser(email: string, hashedPassword: string) {
  try {
    return prisma.user.create({
      data: { email, password: hashedPassword },
    })
  } catch (error) {
    throw new Error("Ups... Something went wrong accessing the database. Try again please")
  }
}
