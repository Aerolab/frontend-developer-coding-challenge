import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SEVEN_DAYS)
  const sessionJWT = await encrypt({ userId, expiresAt })

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

type SessionPayload = {
  userId: string
  expiresAt: Date
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
    console.log(error)
    console.log("Failed to verify session")
  }
}
