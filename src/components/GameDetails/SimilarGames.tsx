import { GameDetails } from "@/types/games"
import Link from "next/link"

export default function SimilarGames({ game }: { game: GameDetails }) {
  if (game.similar_games) {
    return (
      <div className="mb-12">
        <h2 className="text-base">Similar games</h2>
        <div className="grid gap-2 justify-items-center grid-cols-[repeat(auto-fill,minmax(114px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] ">
          {game.similar_games.map((item) => (
            <Link key={item.id} href={`/games/${item.id}`}>
              <img
                className="w-[114px] h-[152px] rounded-md object-cover elevateOnHover sm:w-[170px] sm:h-[226px]"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover?.image_id}.jpg`}
                alt={item.name + " cover "}
              />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
