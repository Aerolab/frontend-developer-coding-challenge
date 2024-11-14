import { CollectedGame } from "@prisma/client"
import { Loader2, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { deleteGame } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

export default function GamesList({ sortedGames }: { sortedGames: CollectedGame[] }) {
  return (
    <ul className="w-full grid gap-2 justify-center grid-cols-[repeat(auto-fill,114px)] sm:grid-cols-[repeat(auto-fill,170px)]">
      {sortedGames.map((item) => (
        <Item item={item} key={item.igbd_id} />
      ))}
    </ul>
  )
}

function Item({ item }: { item: CollectedGame }) {
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort")

  const { toast } = useToast()
  const [isLoading, setIsloading] = useState(false)

  const handleDelete = async (id: number, gameName: string) => {
    setIsloading(true)
    await deleteGame(id)
    toast({
      title: "Game removed",
      description: `${gameName} has been removed from your collection`,
      variant: "destructive",
      duration: 3000,
    })
    setIsloading(false)
  }

  return (
    <li className="relative elevateOnHover rounded-2xl">
      <Link
        href={
          currentSort
            ? `/games/${item.igbd_id}/${item.slug}?sort=${currentSort}`
            : `/games/${item.igbd_id}/${item.slug}`
        }
      >
        <img
          className="w-[114px] h-[152px] rounded-2xl object-cover sm:w-[170px] sm:h-[226px]"
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.coverImgUrl}.jpg`}
          alt={item.name + " cover "}
          loading="lazy"
        />
      </Link>

      {isLoading ? (
        <div className="top-0 bottom-0 w-full grid place-items-center z-20 absolute bg-gray-0 bg-opacity-50 rounded-xl">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <TrashIcon
          className="absolute bottom-2 right-2 z-10 bg-gray-0 h-8 w-8 rounded-full p-2 hover:bg-red hover:text-white cursor-pointer"
          onClick={() => handleDelete(item.id, item.name)}
        />
      )}
    </li>
  )
}
