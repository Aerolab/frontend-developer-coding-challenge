// Obs:
// the generated access token expires in 62 days
// For the challenge and to keep it simple, I just put it in the process.env
//
// But could be better checking the expiration time before using it and generating a new one if necessary
//
// Other strategy could be generating a shorter user session than the api token expiration,
// and generate a new token in every new user session.
//  => timeToken > timeSession and you always get a new one when login

import { Game, GameDetails } from "@/types/games"

const BASE_URL = "https://api.igdb.com/v4"

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

export async function searchGameById(id: string): Promise<GameDetails> {
  try {
    const res = await fetch(BASE_URL + "/games", {
      method: "POST",
      body: `fields name, involved_companies.publisher, involved_companies.company.name, rating, first_release_date, genres.name, summary, cover.*, platforms.*, screenshots.image_id, similar_games.name, similar_games.cover.image_id; where id = (${id});`,
      headers: {
        "Client-ID": process.env.CLIENT_ID_TWITCH as string,
        Authorization: `Bearer ${process.env.IGBD_TOKEN}` as string,
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
