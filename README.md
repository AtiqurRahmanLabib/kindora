# Kindora

**Community begins with you.** Kindora connects volunteers with local event organizers — browse upcoming community opportunities, join events, and manage the events you host in one place.

## Features

- **Upcoming events** — browse all community opportunities, search, filter by category, and view full event details
- **Join events** — one-click signup for any event (duplicate joins are rejected by the backend)
- **Organizer dashboard (`/manage-events`)** — see stats and manage/delete events you created
- **Create events (`/create-event`)** — publish a new opportunity (requires a signed-in organizer; requests are sent with a better-auth JWT)
- **Joined events (`/joined-events`)** — track every event you've signed up for
- **Account & auth** — email/password login plus Google and GitHub social sign-in, editable profile

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack, `cacheComponents`)
- [React](https://react.dev) 19 + React Compiler
- [Tailwind CSS](https://tailwindcss.com) v4 with `base-nova`-style shadcn/ui components
- [better-auth](https://better-auth.com) with the MongoDB adapter and JWT plugin
- MongoDB (`volunteer_hub` database) for auth/session data
- External REST backend for event data (opportunities, joined events, manage events)

⚠️ Event data is **not** served by this app. Pages fetch from a separate backend exposed through `NEXT_PUBLIC_API` — it must be running for event pages to work.

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB instance/cluster (MongoDB Atlas works fine)
- The Kindora event API backend running locally (expected at `http://localhost:5000`)

### Environment variables

Create a `.env` file in the project root (see `.env*` in `.gitignore` — it is never committed):

```bash
BETTER_AUTH_SECRET=<random secret>
BETTER_AUTH_URL=http://localhost:3000   # base URL of this app
MONGODB_URI=<MongoDB connection string>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GITHUB_CLIENT_ID=<from GitHub Developer settings>
GITHUB_CLIENT_SECRET=<from GitHub Developer settings>
NEXT_PUBLIC_API=http://localhost:5000   # base URL of the event API backend
```

### Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (also typechecks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/upcoming-events` | All opportunities, searchable and filterable |
| `/upcoming-events/[id]` | Event details with related events |
| `/joined-events` | Events you've joined *(protected)* |
| `/create-event` | Publish a new event *(protected)* |
| `/manage-events` | Organizer dashboard for your events *(protected)* |
| `/profile` | Edit your name and photo *(protected)* |
| `/login`, `/signup` | Email/password + Google/GitHub auth |

Protected routes are guarded by the auth proxy in `src/proxy.ts`, which redirects unauthenticated visitors to `/login`.

## Project structure

```
src/
├── app/            # App Router pages: home, events, auth, profile
│   └── api/auth/   # better-auth route handler ([...all])
├── components/
│   ├── Home/       # Landing-page sections
│   ├── EventsCard/ # Event cards (opportunity, manage, joined)
│   └── ui/         # shadcn/ui primitives (base-nova style, @base-ui/react)
├── lib/            # better-auth config (server + client), JWT helpers
├── hooks/          # Shared React hooks
└── proxy.ts        # Route protection (redirects to /login)
type.ts             # Shared domain types (Opportunity, JoinedEvent)
```

## Event data flow

1. All event reads/writes go to the external API configured as `NEXT_PUBLIC_API`, e.g. `GET /opportunities`, `GET /joined-events/<email>`, `GET /manage-events/<email>`, `DELETE /manage-events/<id>`.
2. Creating an event posts to `POST /opportunities` with a `Bearer` JWT issued via the better-auth JWT plugin (`auth.api.getToken` on the server, `authClient.token()` on the client).
3. Joining an event posts to `POST /joined-events`; the backend returns `409` if the user already joined.
