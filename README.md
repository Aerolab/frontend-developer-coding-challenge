
> [!TIP]
> Apply for [UI Developer here](https://aerolab.recruitee.com/o/ui-developer-ssr-sr) and for [Full-stack Developer here](https://aerolab.recruitee.com/o/semisenior-senior-javascript-developer)

# Aerolab Coding Challenge — Live Interview

> This is the **live, pair-programming version** of our challenge. For the take-home version, see the [`main` branch](https://github.com/Aerolab/frontend-developer-coding-challenge/tree/main).

![image](https://github.com/user-attachments/assets/7a8c6020-c744-4542-8e72-68b0b928614b)

* [Overview](#Overview)
* [Format](#Format)
* [Design resources](#Design-resources)
* [Tech Stack](#Tech-Stack)
* [Games API](#Games-API)
* [Requirements](#Requirements)
* [Evaluation](#Evaluation)

## Overview

Your task is to build a small web application that lets users search for video games and save them into a personal collection stored in the browser. We'll work on it together, live, during the interview.

The goal isn't to ship a complete product — it's to see how you think, how you make decisions, and how you collaborate with us (and with AI tools) to solve a problem under realistic conditions.

![image](https://github.com/user-attachments/assets/92b96f68-561e-4326-8e8d-72dec6251b9d)

## Format

> [!IMPORTANT]
> This is a **pair-programming session**, not a solo exam. Think out loud, ask questions, push back on ideas — that's the point.

- ⏱ **Duration:** ~60–90 minutes of building, plus time to chat about the result.
- 🤖 **AI is welcome and encouraged.** Bring whatever AI tooling you already use day-to-day (Cursor, Claude Code, Copilot, ChatGPT, etc.). We want to see how you actually work in 2026.
- 💻 **You'll share your screen** and drive the keyboard. We'll be there to discuss tradeoffs, unblock you, and explore the problem together.
- 🎯 **Scope > polish.** Aim for a working, opinionated MVP. Anything you don't get to we can talk through verbally.

## Design resources

A reference Figma is provided so you have something to anchor visual decisions, but **pixel-perfect matching is not the goal** in this format. Capture the spirit of the design and prioritize a clean, responsive layout.

[Figma design here](https://www.figma.com/design/3O7BxHFnSSawJeny3lXWkE/Aerolab-Frontend-Developer-Coding-Challenge---Public?node-id=16996-5165&t=uLiMR18T28Jegm4s-4)

## Tech Stack

### Recommended
- `TypeScript`
- `Next.js` (App Router) — or another framework you're confident in; just let us know beforehand.
- `Tailwind CSS` or `CSS Modules`
- Any UI library you like: `shadcn`, `Radix`, `NextUI`, `MagicUI`, `MUI`.
- `Vercel` for deployment (optional in the live format).

> Use whatever libraries help you move faster. We care about decisions, not memorized APIs.

## Games API

To skip API setup and let us focus on building, we provide a small public API with a curated dataset of popular games. **No auth, no rate limits, no environment variables.**

**Base URL:** `https://aero-games-api.vercel.app`

### Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET`  | `/api/games` | Returns the full list of games. |
| `GET`  | `/api/games?q={query}&limit={n}` | Search by name (case-insensitive, partial match). `limit` defaults to `10`. |
| `GET`  | `/api/games/{slug}` | Returns the full record for a single game by slug. Returns `404` if not found. |

### Response shape

`/api/games` returns:

```json
{
  "count": 20,
  "results": [
    {
      "id": 1942,
      "name": "The Witcher 3: Wild Hunt",
      "slug": "the-witcher-3-wild-hunt",
      "first_release_date": 1431993600,
      "rating": 93.8,
      "total_rating_count": 5266,
      "cover": { "url": "/images/coaarl.webp", "width": 600, "height": 800 },
      "screenshots": [{ "url": "/images/...webp" }],
      "platforms": [{ "name": "PC (Microsoft Windows)" }],
      "genres": [{ "name": "Role-playing (RPG)" }],
      "similar_games": []
    }
  ]
}
```

### Images

All image URLs are **relative paths** under the same host. Prefix with the base URL to display them:

```
https://aero-games-api.vercel.app/images/coaarl.webp
```

### Notes

- The dataset is small (~20 top-rated games) on purpose — enough to build a meaningful UX without dataset noise.
- `first_release_date` is a **Unix timestamp in seconds**.
- All fields are derived from the IGDB schema, so you can reference the [IGDB docs](https://api-docs.igdb.com/) for additional context if needed.

## Requirements

We don't expect you to ship everything below. Pick what you can build well in the time you have, and we'll talk through the rest.

### Must-have

- **Search.** Users can type in a search input and see matching games. Show cover art and title for each result. Update results dynamically as the user types (debounce as you see fit).
- **Collection.** Users can add a game to their personal collection. The collection persists across page reloads (localStorage is fine).
- **Empty state.** When the collection is empty, show a clear empty state.
- **Collection grid.** Collected games render as a grid of covers.
- **Responsive.** It should work on mobile and desktop — mobile-first is a plus.

### Nice-to-have (in order of typical priority)

- Remove games from the collection with feedback (toast, confirmation, etc.).
- Sort the collection by release date or date added.
- A game detail view (modal or `/games/{slug}` route) showing rating, release date, platforms, screenshots, similar games.
- Loading and error states for the API calls.
- Smooth micro-interactions / animations.
- Accessibility: keyboard navigation, focus states, semantic HTML.

## Evaluation

We're not grading a finished product. We're trying to understand:

- **How you reason.** Tradeoffs, scope decisions, what you choose to build first and why.
- **How you collaborate.** With us, and with your AI tools. Showing how you steer, verify, and correct AI output is a strong signal.
- **Code quality at speed.** Clean, readable code under time pressure. Naming, structure, types.
- **Product sense.** Does what you build feel good to use? Did you notice the small things?
- **Communication.** Thinking out loud, asking the right questions, knowing when to say "let's not bother with that now."

## Aerolab

Aerolab is a Digital Product Studio based in Buenos Aires, Argentina.

We design and develop top-tier websites and apps for startups and leading brands.

We are remote-first!

### 👩‍💻 Are you looking for a remote developer job?

We are open to work! We have remote positions for Frontend and Fullstack developers, plus Product Designers, Project Managers and more. Apply at https://aerolab.co/jobs

## Follow us!

- [Twitter](https://twitter.com/aerolab)
- [Instagram](https://www.instagram.com/aerolab/)
- [Dribbble](https://dribbble.com/aerolab)
- [Behance](https://www.behance.net/aerolab)
- [Linkedin](https://www.linkedin.com/company/aerolab-digital)

🪁
