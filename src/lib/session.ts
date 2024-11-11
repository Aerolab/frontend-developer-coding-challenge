import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

type SessionPayload = {
  userId: number
  email: string
  expiresAt: Date
}

export type SessionType = {
  isAuth: boolean
  userId: number | undefined
  email: string | undefined
}

export async function createSession(userId: number, email: string) {
  const expiresAt = new Date(Date.now() + SEVEN_DAYS)
  const sessionJWT = await encrypt({ userId, email, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set("session", sessionJWT, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value
  const session = (await decrypt(cookie)) as SessionPayload

  if (!session?.userId) {
    return { isAuth: false, userId: undefined, email: undefined } as SessionType
  }

  return {
    isAuth: true,
    userId: session.userId,
    email: session.email,
  } as SessionType
})
