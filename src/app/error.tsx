"use client"

import Link from "next/link"
import { useEffect } from "react"
import errorImg from "../../public/error-page.jpg"
import Image from "next/image"

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

      <Image
        className="w-full max-w-[680px] mt-1 rounded-lg"
        src={errorImg}
        alt="error image game over arcade"
        sizes="(max-width:680px) 100vw, 680px"
      />
    </main>
  )
}
