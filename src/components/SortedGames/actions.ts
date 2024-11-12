"use server"

import { verifySession } from "@/lib/session"
import { deleteGameOfUser } from "@/lib/users"
import { revalidatePath } from "next/cache"

export async function deleteGame(gameId: number) {
  // calling from a protected route, ensures userId exists
  const session = await verifySession()
  const userId = session.userId!

  await deleteGameOfUser(gameId, userId)

  revalidatePath("/", "layout")
  return { success: true, error: "" }
}
