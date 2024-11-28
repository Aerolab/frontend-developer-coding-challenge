"use server"

import { verifySession } from "@/lib/session"
import { addGameToUser } from "@/lib/users"
import { revalidatePath } from "next/cache"

export async function collectGame(prevState: any, formData: FormData) {
  // calling from a protected route, ensures userId exists
  const session = await verifySession()
  const userId = session.userId!

  const igbd_id = Number(formData.get("gameId"))
  const name = formData.get("name")?.toString()
  const slug = formData.get("slug")?.toString()
  const coverImgUrl = formData.get("coverImgUrl")?.toString() || ""
  const date = Number(formData.get("date")) || 1

  if (!igbd_id || !name || !date || !slug) {
    return { success: false, error: "Missing field in game to collect" }
  }

  const first_release_date = new Date(date * 1000)

  const data = { igbd_id, name, slug, coverImgUrl, first_release_date, user_id: userId }

  await addGameToUser(data)

  revalidatePath("/", "layout")
  return { success: true, error: "" }
}
