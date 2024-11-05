"use server"

import { Game, searchGames } from "@/lib/games"

export interface SearchState {
  games: Game[]
  input: string
}

export async function searchGameAction(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  let input = formData.get("search") as string

  if (!input) {
    return { games: [], input: "" }
  }

  input = input.trim()
  const games = await searchGames(input)
  return { games, input }
}
