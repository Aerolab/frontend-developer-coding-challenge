"use client"
import { useActionState, useEffect, useRef } from "react"
import { GameDetails } from "@/types/games"
import { collectGame } from "./actions"
import { useFormStatus } from "react-dom"
import { LoaderCircle } from "lucide-react"
import { CollectedGame } from "@prisma/client"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function CollectGameButton({
  game,
  gamesCollected,
}: {
  game: GameDetails
  gamesCollected: CollectedGame[]
}) {
  const { toast } = useToast()
  const [state, collectGameAction] = useActionState(collectGame, undefined)

  const isCollected =
    gamesCollected && gamesCollected.some((collectedGame) => collectedGame.igbd_id === game.id)

  //   Play sound and toast on success
  const soundRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    soundRef.current = new Audio("/excellent.mp3")
    if (state?.success) {
      soundRef.current.play()
      toast({
        title: "Game collected",
        description: `${game.name} has been added to your collection`,
      })
    }
  }, [state])

  if (isCollected) {
    return <GameCollected />
  }

  return (
    <form
      action={collectGameAction}
      className="btn col-span-2 sm:col-span-1 sm:col-start-2 sm:max-w-[180px] sm:ml-3"
    >
      <input name="gameId" value={game.id} type="text" hidden readOnly />
      <input name="name" value={game.name} type="text" hidden readOnly />
      <input name="coverImgUrl" value={game.cover?.url} type="text" hidden readOnly />
      <input name="date" value={game.first_release_date} type="text" hidden readOnly />

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit" className="w-full relative">
      {pending ? <LoaderCircle className="animate-spin mx-auto" /> : "Collect game"}
    </button>
  )
}

function GameCollected() {
  return (
    <button
      disabled={true}
      className="btn-collected col-span-2 sm:col-span-1 sm:col-start-2 sm:max-w-[180px] sm:ml-3"
    >
      Game Collected
    </button>
  )
}
