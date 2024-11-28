"use client"

import { GameDetails } from "@/types/games"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SimilarGames({ game }: { game: GameDetails }) {
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort")

  if (game.similar_games) {
    return (
      <div className="mb-12">
        <h2 className="text-base">Similar games</h2>
        <ul className="w-full grid gap-2 justify-center grid-cols-[repeat(auto-fill,114px)] sm:grid-cols-[repeat(auto-fill,170px)]">
          {game.similar_games.map((item) => (
            <li
              key={item.id}
              className="relative elevateOnHover rounded-2xl w-full aspect-[170/226]"
            >
              <Link
                href={
                  currentSort
                    ? `/games/${item.id}/${item.slug}?sort=${currentSort}`
                    : `/games/${item.id}/${item.slug}`
                }
              >
                <Image
                  className="w-full aspect-[170/226] rounded-2xl object-cover"
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover?.image_id}.jpg`}
                  alt={item.name + " cover "}
                  width={170}
                  height={226}
                  sizes="(max-width: 640px) 114px, 170px"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
