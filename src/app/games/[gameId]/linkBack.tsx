"use client"
import BackArrow from "@/components/Icons/BackArrow"
import { useRouter } from "next/navigation"

export default function LinkBack() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className="flex flex-1 ml-auto w-full">
      <BackArrow />
      <h2>Back</h2>
    </button>
  )
}
