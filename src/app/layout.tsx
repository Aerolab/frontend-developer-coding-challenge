import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Inter } from "next/font/google"
import { verifySession } from "@/lib/session"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Gaming Heaven Z",
  description: "Find any game you want",
  creator: "Nico Battaglia",
  keywords: ["games", "videogames", "gaming", "sega", "nintendo", "play", "pc"],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await verifySession()

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="mx-auto max-w-[1440px]">
          <Navbar session={session} />
          <div className="bg-mobile bgBreakpoint:bg-desktop absolute top-[50px] left-0 right-0 -z-10"></div>
          <div className="grid justify-items-center gap-6">{children}</div>
        </div>

        <Toaster />
      </body>
    </html>
  )
}
