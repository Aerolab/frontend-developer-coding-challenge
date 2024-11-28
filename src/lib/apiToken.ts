type tokenResponse = {
  access_token: string
  expires_in: number
  token_type: string
}

const GET_TOKEN_URL = "https://id.twitch.tv/oauth2/token"

const queryParams = {
  client_id: process.env.CLIENT_ID_TWITCH,
  client_secret: process.env.IGBD_API_CLIENT_SECRET,
  grant_type: "client_credentials",
}

const url = new URL(GET_TOKEN_URL)

// Add queries to URL
Object.entries(queryParams).forEach(([key, value]) => {
  url.searchParams.append(key, value as string)
})

export async function generateApiToken() {
  try {
    const res = await fetch(url, {
      method: "POST",
    })

    const tokenData = await res.json()

    return tokenData as tokenResponse
  } catch (error) {
    throw new Error("Error getting IGBD token")
  }
}
