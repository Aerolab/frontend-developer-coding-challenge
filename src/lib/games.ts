// Obs: the generated access token expires in 62 days
// For the challenge I just put in the process.env
//

const BASE_URL = "https://api.igdb.com/v4"

interface GameDetails {
  id: number
  category: number
  cover: number
  first_release_date: number
  genres: number[]
  involved_companies: number[]
  name: string
  platforms: number[]
  screenshots: number[]
  similar_games: number[]
  slug: string
  storyline: string
  summary: string
  tags: number[]
  url: string
  videos: number[]
  checksum: string
}

export interface Game {
  id: number
  cover: {
    id: number
    url: string
    height: number
    width: number
  }
  name: string
}

export async function searchGames(gameName: string): Promise<Game[]> {
  try {
    const res = await fetch(BASE_URL + "/games", {
      method: "POST",
      body: `search "${gameName}"; limit 8; fields id,cover.*,name;`,
      headers: {
        "Client-ID": process.env.CLIENT_ID_TWITCH as string,
        Authorization: `Bearer ${process.env.IGBD_TOKEN}` as string,
      },
    })

    if (!res.ok) {
      throw new Error(`Error searching game`)
    }

    const games = await res.json()

    return games
  } catch (error) {
    throw Error("Error searching game")
  }
}
