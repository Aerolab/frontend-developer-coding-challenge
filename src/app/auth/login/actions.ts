"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import * as bcrypt from "bcrypt"
import { createSession, deleteSession } from "@/lib/session"
import { findUserByEmail } from "@/lib/users"
import { revalidatePath } from "next/cache"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).trim(),
})

export async function login(prevState: any, formData: FormData) {
  // Validate input
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      email: formData.get("email")?.toString() || "",
    }
  }

  const { email, password } = result.data

  // Check for user in db and check password
  const user = await findUserByEmail(email)

  if (!user) {
    return {
      errors: {
        email: ["Email not registered, signup first please"],
      },
      email,
    }
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return {
      errors: {
        password: ["Wrong password"],
      },
      email,
    }
  }

  await createSession(user.id, email)
  revalidatePath("/", "layout")
  redirect("/")
}

export async function logout() {
  await deleteSession()
  redirect("/auth/login")
}
