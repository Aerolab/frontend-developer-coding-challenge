// Obs:
// User session expiration is shorter than the api token expiration,
// Generate a new igbd api token in every new user session so:
//  => timeToken > timeSession and you always get a new one when login or signup
// token is extracted from cookie session and passed as parameter

import { Game, GameDetails } from "@/types/games"

const BASE_URL = "https://api.igdb.com/v4"

export async function searchGames(gameName: string, igbdToken: string): Promise<Game[]> {
  try {
    const res = await fetch(BASE_URL + "/games", {
      method: "POST",
      body: `search "${gameName}"; limit 8; fields id,cover.*,name, slug;`,
      headers: {
        "Client-ID": process.env.CLIENT_ID_TWITCH as string,
        Authorization: `Bearer ${igbdToken}` as string,
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

export async function searchGameById(id: string, igbdToken: string): Promise<GameDetails> {
  try {
    const res = await fetch(BASE_URL + "/games", {
      method: "POST",
      body: `fields name, slug, involved_companies.publisher, involved_companies.company.name, rating, first_release_date, genres.name, summary, cover.*, platforms.*, screenshots.image_id, similar_games.name, similar_games.slug, similar_games.cover.image_id; where id = (${id});`,
      headers: {
        "Client-ID": process.env.CLIENT_ID_TWITCH as string,
        Authorization: `Bearer ${igbdToken}` as string,
      },
    })

    if (!res.ok) {
      throw new Error(`Error searching game`)
    }

    const games = await res.json()
    const game = games[0]
    return game
  } catch (error) {
    console.log(error)
    throw Error("Error searching game")
  }
}
