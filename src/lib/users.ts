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

type addGamePayload = {
  igbd_id: number
  name: string
  slug: string
  coverImgUrl: string
  first_release_date: Date
  user_id: number
}

export async function addGameToUser(data: addGamePayload) {
  try {
    const user = await prisma.user.findUnique({ where: { id: data.user_id } })
    if (!user) {
      throw Error("User not found in db")
    }

    const gameAllReadyCollected = await prisma.collectedGame.findFirst({
      where: { igbd_id: data.igbd_id, user_id: data.user_id },
    })
    if (gameAllReadyCollected) {
      throw Error("Game allready in db")
    }

    return prisma.collectedGame.create({ data })
  } catch (error: any) {
    throw new Error(
      error.message || "Ups... Something went wrong accessing the database. Try again please"
    )
  }
}

export async function getCollectedGamesbyUser(userId: number) {
  try {
    const collectedGames = await prisma.collectedGame.findMany({ where: { user_id: userId } })

    return collectedGames
  } catch (error: any) {
    throw new Error(
      error.message || "Ups... Something went wrong accessing the database. Try again please"
    )
  }
}

export async function deleteGameOfUserById(id: number) {
  try {
    return prisma.collectedGame.delete({ where: { id } })
  } catch (error) {
    console.error("Error deleting game:", error)
    throw new Error("Failed to delete game")
  }
}
