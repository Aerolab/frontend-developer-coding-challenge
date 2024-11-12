"use client"
import Link from "next/link"
import { Game } from "@/types/games"
import { useSearchParams } from "next/navigation"

export default function ResultsItem({ item }: { item: Game }) {
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort")

  return (
    <li className="hover:bg-gray-100">
      <Link
        className="flex gap-2 items-center sm:p-2"
        href={currentSort ? `/games/${item.id}?sort=${currentSort}` : `/games/${item.id}`}
      >
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
