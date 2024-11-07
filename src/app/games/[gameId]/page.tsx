import SearchGame from "@/components/SearchGame/SearchGame"
import { searchGameById } from "@/lib/games"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import LoadingGameboy from "@/components/animations/LoadingGameboy"
import LinkBack from "./linkBack"

type paramsType = {
  params: Promise<{ gameId: string }>
  searchParams: Promise<{ query?: string }>
}

export default async function GameDetailsPage({ params, searchParams }: paramsType) {
  const gameId = (await params).gameId
  const query = (await searchParams).query || ""

  return (
    <div className="p-2 max-w-[1000px] mx-auto">
      <header className="w-full max-w-[400px] sm:max-w-full mx-auto flex flex-col gap-2 mt-6 mb-4 sm:grid sm:grid-cols-[auto,1fr] sm:place-items-center">
        <LinkBack />
        <SearchGame query={query} />
      </header>

      <Suspense fallback={<LoadingGameboy />}>
        <GameDetails gameId={gameId} />
      </Suspense>
    </div>
  )
}

async function GameDetails({ gameId }: { gameId: string }) {
  const game = await searchGameById(gameId)

  if (!game) {
    notFound()
  }

  // It appears that the igbd api does not support nested queries for filtering 'where'
  // So I filtered here to get the name of the publisher company.
  // Also, there are games with undefined property 'involved_companies' and publisher=true
  let company = ""
  if (game.involved_companies) {
    const publisher = game.involved_companies?.filter((company) => company.publisher === true)
    company = publisher[0]?.company?.name || ""
  }

  return (
    <main>
      <div className="grid grid-cols-[82.5px,1fr] gap-3">
        <img
          className="w-[82.5px] rounded-lg"
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game?.cover?.image_id}.jpg`}
        />

        <div>
          <h1>{game.name}</h1>
          <p>{company}</p>

          {/* {game.screenshots.map((item) => (
            <img
              key={item.id}
              src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${item.image_id}.jpg`}
            />
          ))} */}
        </div>
      </div>
    </main>
  )
}
