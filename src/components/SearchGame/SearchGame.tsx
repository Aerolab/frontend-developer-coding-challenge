// Obs:
// The url is the source of truth
// query is extracted from url and need to be passed as a prop to the SearchGame component
// from the page using the app router

import Input from "./Input"
import { searchGames } from "@/lib/games"
import { Suspense } from "react"
import { LoaderCircle } from "lucide-react"
import ResultsItem from "./ResultsItem"
import { verifySession } from "@/lib/session"

export default function SearchGame({ query }: { query: string }) {
  return (
    <div className="relative z-30 sm:mx-auto">
      <Input />

      <Suspense key={query} fallback={<Loading />}>
        <Results query={query} />
      </Suspense>
    </div>
  )
}

async function Results({ query }: { query: string }) {
  const { igbdToken } = await verifySession()
  const games = query ? await searchGames(query, igbdToken!) : []

  return (
    <ul className="hidden peer-focus:flex hover:flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600 border-opacity-20">
      {games.length > 0 && games.map((item) => <ResultsItem item={item} key={item.id} />)}

      {games.length === 0 && <li className="p-2 text-center">No results</li>}
    </ul>
  )
}

function Loading() {
  return (
    <ul className="hidden peer-focus:flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600 border-opacity-20">
      <li className="p-2">
        <LoaderCircle className="animate-spin mx-auto" />
      </li>
    </ul>
  )
}
