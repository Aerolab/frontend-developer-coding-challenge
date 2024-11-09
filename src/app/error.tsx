"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-center text-xl mt-6"> Ups... Something went wrong! </h2>

      {error.message && <p className="text-center"> {error.message} </p>}

      <Link
        href={"/"}
        className="btn my-4 font-bold text-lg text-center bg-red text-white tracking-wider h-auto"
      >
        Back Home
      </Link>

      <img
        src="/error-page.jpg"
        alt="error image game over arcade"
        className="w-full max-w-[680px] mt-1 rounded-lg"
      />
    </main>
  )
}
