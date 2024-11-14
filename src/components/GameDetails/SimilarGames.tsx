"use client"

import { GameDetails } from "@/types/games"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SimilarGames({ game }: { game: GameDetails }) {
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort")

  if (game.similar_games) {
    return (
      <div className="mb-12">
        <h2 className="text-base">Similar games</h2>
        <div className="grid gap-2 justify-items-center grid-cols-[repeat(auto-fill,minmax(114px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] ">
          {game.similar_games.map((item) => (
            <Link
              key={item.id}
              href={
                currentSort
                  ? `/games/${item.id}/${item.slug}?sort=${currentSort}`
                  : `/games/${item.id}/${item.slug}`
              }
            >
              <img
                className="rounded-md object-cover elevateOnHover w-full aspect-[170/226]"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover?.image_id}.jpg`}
                alt={item.name + " cover "}
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
