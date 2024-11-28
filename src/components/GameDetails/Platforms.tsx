import { GameDetails } from "@/types/games"

export default function Platforms({ game }: { game: GameDetails }) {
  if (game.platforms)
    return (
      <div>
        <h2 className="text-base">Platforms</h2>
        <p>{game.platforms.map((item) => item.name).join(", ")}</p>
      </div>
    )
}
