import SearchGame from "@/components/SearchGame/SearchGame"
import Image from "next/image"
import Tetris from "@/components/animations/Tetris"

type SearchParams = Promise<{ query: string | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <>
      <main className="flex flex-col gap-[20px] mt-12">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="border rounded-lg border-pink-600 p-1 shadow"
          />
          <h1>Gaming Heaven Z</h1>
        </div>

        <SearchGame query={query} />

        <Tetris />
      </main>
    </>
  )
}
