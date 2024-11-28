"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import * as bcrypt from "bcrypt"
import { createSession } from "@/lib/session"
import { createUser, findUserByEmail } from "@/lib/users"
import { revalidatePath } from "next/cache"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).trim(),
})

export async function signup(prevState: any, formData: FormData) {
  // Validate input
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      email: formData.get("email")?.toString() || "",
    }
  }

  const { email, password } = result.data

  // Check user in DB
  const emailAlreadyExists = await findUserByEmail(email)

  if (emailAlreadyExists) {
    return {
      errors: {
        email: ["Email already registered"],
      },
      email,
    }
  }

  // Create user and session
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await createUser(email, hashedPassword)

  await createSession(newUser.id, email)
  revalidatePath("/", "layout")
  redirect("/")
}
