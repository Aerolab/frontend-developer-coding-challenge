"use client"

import Link from "next/link"
import { searchGameAction, SearchState } from "./action"
import { startTransition, useActionState, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import SearchIcon from "../Icons/SearchIcon"
import { Game } from "@/lib/games"
import CloseIcon from "../Icons/CloseIcon"

function SearchGame() {
  const [state, formAction] = useActionState(searchGameAction, { games: [], input: "" })

  const [showResults, setShowResults] = useState(false)
  const [opacityIcon, setOpacityIcon] = useState(50)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickOutside = () => {
    setShowResults(false)
    setOpacityIcon(50)
  }

  const resetSearch = async () => {
    startTransition(() => formAction(new FormData()))
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setShowResults(true)
    setOpacityIcon(100)
  }

  return (
    <>
      <form action={formAction} className="relative z-10">
        <SearchIcon opacityIcon={opacityIcon} />
        <input
          ref={inputRef}
          className="w-[358px] bg-white bg-opacity-100 p-2 pl-11 border border-pink-600 rounded-[20px] focus:outline-none"
          type="text"
          name="search"
          id="search"
          placeholder="Search games..."
          onFocus={handleFocus}
          defaultValue={state?.input}
          style={
            showResults ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : undefined
          }
          autoComplete="off"
        />
        {state.input && <CloseIcon onClick={resetSearch} />}

        <button className="hidden">Search</button>

        <Results state={state} showResults={showResults} />
      </form>

      {/* Div to track click outside the results and close them */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
        onClick={handleClickOutside}
      ></div>
    </>
  )
}

export default SearchGame

function Results({ state, showResults }: { state: SearchState; showResults: boolean }) {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <ul className="flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600">
        <li className="p-2 text-center">Loading...</li>
      </ul>
    )
  }

  if (state.games.length > 0 && showResults)
    return (
      <ul className="flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600">
        {state.games.map((item) => (
          <ResultsItem item={item} key={item.id} />
        ))}
      </ul>
    )

  if (state.games.length === 0 && showResults)
    return (
      <ul className="flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600">
        <li className="p-2 text-center">No results</li>
      </ul>
    )
}

function ResultsItem({ item }: { item: Game }) {
  return (
    <li className="hover:bg-gray-100">
      <Link className="flex gap-2 items-center p-2" href={`/games/${item.id}`}>
        <img
          className="h-8 w-8 object-cover"
          src={
            item.cover
              ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${item?.cover?.image_id}.jpg`
              : "/No-Image-Placeholder.svg"
          }
          alt={`${item.name} cover`}
        />
        <p>{item.name}</p>
      </Link>
    </li>
  )
}
