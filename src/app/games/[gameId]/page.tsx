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
          <h1>NAME: {game.name}</h1>

          <p>COMPANY {company}</p>

          <p>RATING: {game.rating}</p>

          <p>DATE: {new Date(game.first_release_date * 1000).toLocaleDateString()}</p>

          <h2>GENRES</h2>
          {game.genres.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}

          <h2>SUMMARY</h2>
          <p>{game.summary}</p>

          <h2>PLATFORMS</h2>
          {game.platforms.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}

          {/* {game.screenshots.map((item) => (
            <img
            key={item.id}
            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${item.image_id}.jpg`}
            />
            ))} */}

          <h2>SIMILAR GAMES</h2>
          <div className="grid grid-cols-4">
            {game.similar_games.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>

                <img
                  className="h-[50px]"
                  src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${item.cover.image_id}.jpg`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
