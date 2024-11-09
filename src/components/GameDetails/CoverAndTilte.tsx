import { GameDetails } from "@/types/games"

export default function CoverAndTitle({ game }: { game: GameDetails }) {
  // It appears that the igbd api does not support nested queries for filtering 'where'
  // So I filtered here to get the name of the publisher company.
  // Also, there are games with undefined property 'involved_companies' and publisher=true
  let company = ""
  if (game.involved_companies) {
    const publisher = game.involved_companies?.filter((company) => company.publisher === true)
    company = publisher[0]?.company?.name || ""
  }

  // to configure srcset for img -> :sm breakpoint changes size cover both css and src
  // there are two endpoints t_cover_small and t_cover_big
  const baseUrl = "https://images.igdb.com/igdb/image/upload/"

  const coverSmallUrl = baseUrl + "t_cover_small"
  const coverBigUrl = baseUrl + "t_cover_big"

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] gap-3">
        {game?.cover?.image_id ? (
          <img
            className="w-[82.5px] h-[110px] sm:h-[226px] sm:w-[170px] rounded-lg object-cover sm:row-span-2"
            srcSet={`${coverSmallUrl}/${game.cover.image_id}.jpg 90w, ${coverBigUrl}/${game.cover.image_id}.jpg 264w`}
            sizes="(max-width: 640px) 90px, 264px"
            alt={`${game.name} cover`}
          />
        ) : (
          <img
            className="w-[82.5px] h-[110px] sm:h-[226px] sm:w-[170px] rounded-lg object-cover sm:row-span-2"
            src={"/No-Image-Placeholder.svg"}
            alt={`${game.name} cover`}
          />
        )}

        <div>
          <h1>{game.name}</h1>
          <h3>{company}</h3>
        </div>
        <button className="btn col-span-2 sm:col-span-1 sm:col-start-2 sm:max-w-[180px] sm:ml-3">
          Collect game
        </button>
      </div>
    </>
  )
}
