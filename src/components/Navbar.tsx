"use client"

import { logout } from "@/app/auth/login/actions"
import Link from "next/link"
import { usePathname } from "next/navigation"

function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md">
      <div className="text-lg font-semibold">
        <Link className="z-10" href="/">
          Brand
        </Link>
      </div>

      <div className="flex gap-4">
        {pathname !== "/" ? (
          <>
            <Link
              href="/auth/signup"
              className={`z-10 hover:text-gray-300 transition-colors duration-200 ${
                pathname === "/auth/signup" ? " border-b-2" : ""
              }`}
            >
              Signup
            </Link>

            <Link
              href="/auth/login"
              className={`z-10 hover:text-gray-300 transition-colors duration-200 ${
                pathname === "/auth/login" ? "border-b-2" : ""
              }`}
            >
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={() => logout()}
            className="hover:text-gray-300 transition-colors duration-200 focus:outline-none z-10"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
