"use server"

import { deleteGameOfUserById } from "@/lib/users"
import { revalidatePath } from "next/cache"

export async function deleteGame(gameId: number) {
  await deleteGameOfUserById(gameId)

  revalidatePath("/", "layout")
  return { success: true, error: "" }
}
