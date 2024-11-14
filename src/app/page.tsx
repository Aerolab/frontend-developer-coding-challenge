import SearchGame from "@/components/SearchGame/SearchGame"
import Image from "next/image"
import Tetris from "@/components/animations/Tetris"
import { verifySession } from "@/lib/session"
import { getCollectedGamesbyUser } from "@/lib/users"
import { Suspense } from "react"
import SortedGames from "@/components/SortedGames/SortedGames"
import noItemsImg from "../../public/no-items.svg"

type SearchParams = Promise<{ query: string | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <>
      <main className="p-2 mx-auto grid grid-cols-1 max-w-[400px] sm:max-w-[1000px] gap-3 sm:gap-[20px] mt-1 sm:mt-12">
        <div className="flex items-center gap-3 w-full max-w-[358px] sm:w-auto mx-auto">
          <Image
            src="/Logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="border rounded-lg border-pink-600 p-1 shadow-lg animate-fadeInUpShort h-[32px] w-[32px]"
          />
          <h1 className="animate-fadeInUpLong">Gaming Heaven Z</h1>
        </div>

        <SearchGame query={query} />

        <Tetris />

        <Suspense>
          <GamesCollected />
        </Suspense>
      </main>
    </>
  )
}

async function GamesCollected() {
  const session = await verifySession()
  const games = session.userId ? await getCollectedGamesbyUser(session.userId) : []

  if (!games || games.length === 0) {
    return <NoItems />
  }
  return <SortedGames games={games} />
}

function NoItems() {
  return (
    <div className="mt-8 mb-12 w-screen max-w-full mx-auto" id="savedGames">
      <h2 className="text-xl pl-2 mb-1 text-violet-600 sm:text-center">Saved games</h2>

      <div className="flex flex-col items-center gap-1 mt-12">
        <Image src={noItemsImg} alt="no items" className="mb-3" />
        <h2>Nothing collected yet</h2>
        <p>Here you will see your collected games</p>
      </div>
    </div>
  )
}
