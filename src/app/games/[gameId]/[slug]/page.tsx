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
import { verifySession } from "@/lib/session"

type Props = {
  params: Promise<{ gameId: string; slug: string }>
  searchParams: Promise<{ query?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { igbdToken } = await verifySession()
  const { gameId, slug } = await params
  const game = await searchGameById(gameId, igbdToken!)

  return {
    title: game.name,
    description: game.summary,
    keywords: [
      ...game.genres.map((genre) => genre.name),
      ...game.similar_games.map((item) => item.name),
      game.slug,
      game.name,
      ...game.involved_companies.map((item) => item.company.name),
    ],
    openGraph: {
      title: "Gaming Heaven Z",
      description: `Search any game. ${game.name} game sheet`,
      images: [
        {
          url: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}`,
          width: 264,
          height: 374,
          alt: `${game.name} cover`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
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
  const { igbdToken } = await verifySession()
  const game = await searchGameById(gameId, igbdToken!)

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
