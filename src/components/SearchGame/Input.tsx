// Obs:
// url params are in sync with the input
// Then the SearchGame componen (parent) uses the query to perform the fetch SSR

"use client"

import SearchIcon from "../Icons/SearchIcon"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import CloseIcon from "../Icons/CloseIcon"
import { useDebouncedCallback } from "use-debounce"

export default function Input() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const WAITING_TIME_DEBOUNCE = 300

  const handleInputChange = useDebouncedCallback((input: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (input) {
      params.set("query", input)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, WAITING_TIME_DEBOUNCE)

  return (
    <>
      <input
        className="peer w-full sm:w-[384px] bg-white p-2 pl-11 border border-pink-600 border-opacity-20 rounded-[20px] text-gray-500 focus:text-black focus:outline-none focus:rounded-b-none shadow"
        type="text"
        name="query"
        id="query"
        placeholder="Search games..."
        defaultValue={searchParams?.get("query") || ""}
        autoComplete="off"
        onChange={(e) => handleInputChange(e.target.value)}
      />

      <SearchIcon />
      <CloseIcon />
    </>
  )
}
