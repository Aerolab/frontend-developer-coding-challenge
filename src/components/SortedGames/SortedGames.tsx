"use client"
import { CollectedGame } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"
import GamesList from "./GamesList"
import { useRouter, useSearchParams } from "next/navigation"

type sortOptionType = "Last added" | "Newest" | "Oldest"

export default function SortedGames({ games }: { games: CollectedGame[] }) {
  const sortOptions: sortOptionType[] = ["Last added", "Newest", "Oldest"]

  const router = useRouter()
  const searchParams = useSearchParams()

  // Sync state with url, allow mantaining user's selection between pages navigation
  // in every Link you also will need to pass the ?sort query
  let initialSort = searchParams.get("sort") as sortOptionType
  if (!sortOptions.includes(initialSort)) {
    initialSort = "Last added"
  }
  const [sortBy, setSortBy] = useState<sortOptionType>(initialSort)

  // Sync the URL if the query is invalid
  useEffect(() => {
    if (!sortOptions.includes(searchParams.get("sort") as sortOptionType)) {
      router.replace(`?sort=${initialSort}`)
    }
  }, [searchParams, initialSort, router, sortOptions])

  // Sort
  const sortedGames = useMemo(() => {
    if (sortBy === "Last added") {
      return [...games].sort((a, b) => Number(b.updated_at) - Number(a.updated_at))
    }
    if (sortBy === "Newest") {
      return [...games].sort((a, b) => Number(b.first_release_date) - Number(a.first_release_date))
    }
    if (sortBy === "Oldest") {
      return [...games].sort((a, b) => Number(a.first_release_date) - Number(b.first_release_date))
    }
  }, [games, sortBy])

  const handleClick = (sortOption: sortOptionType) => {
    router.replace(`?sort=${sortOption}`)
    setSortBy(sortOption)
  }

  return (
    <div className="mt-8 mb-12 w-screen max-w-full mx-auto" id="savedGames">
      <h2 className="text-xl pl-2 mb-1 text-violet-600 sm:text-center">Saved games</h2>

      <div className="grid grid-cols-3 mx-auto gap-1 sticky top-3 mb-2 bg-white bg-opacity-90 p-1 rounded-3xl z-20 max-w-[325px]">
        {sortOptions.map((sortOption) => {
          return (
            <button
              key={sortOption}
              onClick={() => handleClick(sortOption)}
              className={
                sortBy === sortOption
                  ? "text-white bg-violet-600 py-1 rounded-3xl"
                  : "text-violet-600 py-1 rounded-3xl"
              }
            >
              {sortOption}
            </button>
          )
        })}
      </div>

      {sortedGames && <GamesList sortedGames={sortedGames} />}
    </div>
  )
}
