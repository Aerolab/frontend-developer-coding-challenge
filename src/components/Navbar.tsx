"use client"

import { logout } from "@/app/auth/login/actions"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { MouseEvent, useState } from "react"
import Mario from "@/components/animations/Mario"
import { SessionType } from "@/lib/session"

function Navbar({ session }: { session: SessionType }) {
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort")

  const [showHoverAnimation, setShowHoverAnimation] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleHoverNav = () => {
    setShowHoverAnimation(true)
  }
  const handleHoverOutNav = () => {
    setShowHoverAnimation(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <nav
      className="flex items-center justify-between px-6 py-3 bg-black text-white shadow-md"
      onMouseOver={handleHoverNav}
      onMouseLeave={handleHoverOutNav}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Link
        className="z-10 cursor-pointer animate-fadeInLong "
        href={currentSort ? `/?sort=${currentSort}` : "/"}
      >
        <img width={30} height={30} src={"/aerolab-logo.svg"} alt="Logo image" />
      </Link>

      {!session.isAuth ? (
        <div className="flex gap-4">
          <Link
            href="/auth/signup"
            className={`z-10 hover:text-gray-300 ${
              pathname === "/auth/signup" ? " border-b-2" : ""
            }`}
          >
            Signup
          </Link>

          <Link
            href="/auth/login"
            className={`z-10 hover:text-gray-300 ${pathname === "/auth/login" ? "border-b-2" : ""}`}
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 flex-1 animate-fadeInLong ">
          <span className="mx-auto">{session.email?.split("@")[0]}</span>
          <button onClick={() => logout()} className="hover:text-gray-300">
            Logout
          </button>
        </div>
      )}

      {showHoverAnimation && <Mario positionX={mousePosition.x} />}
    </nav>
  )
}

export default Navbar
