export interface GameDetails {
  id: number
  name: string
  slug: string
  involved_companies: {
    publisher: boolean
    company: {
      id: number
      name: string
    }
  }[]
  rating: number
  first_release_date: number
  genres: { id: number; name: string }[]
  summary: string
  cover: {
    id: number
    image_id: string
    url: string
    height: number
    width: number
  }
  platforms: { id: number; name: string }[]
  screenshots: {
    id: number
    image_id: string
  }[]
  similar_games: {
    id: number
    name: string
    slug: string
    cover: { id: number; image_id: string }
  }[]
}

export interface Game {
  id: number
  cover: {
    id: number
    image_id: string
    url: string
    height: number
    width: number
  }
  name: string
  slug: string
}
