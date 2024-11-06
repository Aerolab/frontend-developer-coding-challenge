import SearchGame from "@/components/SearchGame/SearchGame"

type SearchParams = Promise<{ query: string | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <>
      <main className="flex flex-col gap-8 mt-6">
        <h1>Gaming Heaven Z</h1>

        <SearchGame query={query} />
      </main>
    </>
  )
}
