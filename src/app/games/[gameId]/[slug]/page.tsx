import { Suspense } from "react"
import { notFound } from "next/navigation"
import { searchGameById } from "@/lib/games"
import SearchGame from "@/components/SearchGame/SearchGame"
import LoadingGameboy from "@/components/animations/LoadingGameboy"
import {
  CoverAndTitle,
  InfoChips,
  LinkBack,
  Platforms,
  ScreenShotsCarousel,
  SimilarGames,
  Summary,
} from "@/components/GameDetails"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ gameId: string; slug: string }>
  searchParams: Promise<{ query?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { gameId, slug } = await params
  const game = await searchGameById(gameId)

  return {
    title: game.name,
  }
}

export default async function GameDetailsPage({ params, searchParams }: Props) {
  const { gameId, slug } = await params
  const query = (await searchParams).query || ""

  return (
    <div className="p-2 mx-auto grid grid-cols-1 max-w-[400px] sm:max-w-[1000px]">
      <header className="w-full max-w-[400px] sm:max-w-full mx-auto flex flex-col gap-2 mt-6 mb-4 sm:grid sm:grid-cols-[auto,1fr] sm:place-items-center">
        <LinkBack />
        <SearchGame query={query} />
      </header>

      <Suspense fallback={<LoadingGameboy />}>
        <GameInfo gameId={gameId} />
      </Suspense>
    </div>
  )
}

async function GameInfo({ gameId }: { gameId: string }) {
  const game = await searchGameById(gameId)

  if (!game) {
    notFound()
  }

  return (
    <main className="grid grid-cols-1 gap-5">
      <CoverAndTitle game={game} />

      <InfoChips game={game} />

      <Summary summary={game.summary} />

      <Platforms game={game} />

      <ScreenShotsCarousel game={game} />

      <SimilarGames game={game} />
    </main>
  )
}
