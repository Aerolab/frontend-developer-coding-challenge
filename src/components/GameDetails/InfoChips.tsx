import { GameDetails } from "@/types/games"
import RatingIcon from "../Icons/RatingIcon"
import CalendarIcon from "../Icons/CalendarIcon"
import PuzzleIcon from "../Icons/PuzzleIcon"

export default function InfoChips({ game }: { game: GameDetails }) {
  return (
    <ul className="flex gap-2 flex-wrap text-violet-600 text-sm">
      <li className="flex gap-1 items-center border border-violet-300 rounded-3xl py-2 px-3">
        <RatingIcon />
        Rating:
        <span className="text-base text-violet-900 font-semibold">
          {game.rating ? (game.rating / 10).toFixed(1) : "n/a"}
        </span>
      </li>

      <li className="flex flex-wrap gap-1 items-center border border-violet-300 rounded-3xl py-2 px-3">
        <CalendarIcon />
        Release:
        <span className="text-base text-violet-900 font-semibold">
          {game.first_release_date
            ? new Date(game.first_release_date * 1000).toLocaleDateString()
            : "n/a"}
        </span>
      </li>

      <li className="flex gap-1 items-center border border-violet-300 rounded-3xl py-2 px-3">
        <span className="flex gap-1 items-start">
          <PuzzleIcon />
          Genre:
        </span>

        <span className="text-base text-violet-900 font-semibold">
          {game.genres && game.genres.map((genre) => genre.name).join(" & ")}
        </span>
      </li>
    </ul>
  )
}
