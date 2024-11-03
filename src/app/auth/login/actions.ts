"use server"

import { z } from "zod"
import { createSession, deleteSession } from "../lib/session"
import { redirect } from "next/navigation"
import * as bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).trim(),
})

const prisma = new PrismaClient()

export async function login(prevState: any, formData: FormData) {
  // Validate input
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data

  // Check for user in db and password
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return {
      errors: {
        email: ["Email not registered, signup first please"],
      },
    }
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return {
      errors: {
        password: ["Wrong password"],
      },
    }
  }

  await createSession(email)

  redirect("/")
}

export async function logout() {
  await deleteSession()
  redirect("/auth/login")
}
