# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run build` — runs TypeScript checking too; there is no separate typecheck or test script, no CI.
- `npm run lint` — plain `eslint` (`next lint` was removed in Next.js 16).
- `npm run dev` — Turbopack is the default in 16; do not pass `--turbopack`, and never add a `webpack` key to `next.config.ts` (Turbopack builds fail if one exists).
- Dev server writes to `.next/dev`, separate from build output in `.next`.

## Next.js 16 conventions

- Full docs are bundled at `node_modules/next/dist/docs/` — consult the relevant guide before writing Next-specific code; APIs and conventions differ from training-data-era Next.js.
- `params` and `searchParams` are async everywhere — always `await` them (or `React.use()` in client components).
- `next/image`: `priority` is deprecated, use `preload`.
- Typed route helpers `PageProps<'/route'>` and `LayoutProps<'/route'>` are globally available (no import); see `src/app/layout.tsx`.

## next.config.ts flags

- `cacheComponents: true` — dynamic data (cookies, headers, searchParams, un-cached fetch) requires a Suspense boundary or `"use cache"` above it or the build/prerender fails.
- `reactCompiler: true` — React Compiler is active (via `babel-plugin-react-compiler`).
- The `turbopack.rules` entry wires `@tailwindcss/turbopack` for CSS — don't remove it.

## Auth & route protection (better-auth)

- Auth is `better-auth` with the MongoDB adapter (database `volunteer_hub`, `src/lib/auth.ts`): email/password plus Google and GitHub OAuth. Server side uses the `auth` object; client side uses `authClient` and the `signIn`/`signUp`/`useSession` exports from `src/lib/auth-client.ts`. Local route handler: `src/app/api/auth/[...all]/route.ts`.
- Route protection is `src/proxy.ts` — in Next 16 the file convention is `proxy.ts`, not `middleware.ts` (export a function named `proxy`). It redirects unauthenticated users of its matcher routes to `/login`.

## Data source

- There is no local events API. Opportunities, joined events, and organizer events are fetched (mostly server-side) from a separate backend at `process.env.NEXT_PUBLIC_API` (currently `http://localhost:5000`): `/opportunities`, `/opportunities/:id`, `/joined-events/<email>`, `/manage-events/<email>`. That backend is not in this repo; if fetches fail at runtime, check that it's running and that `NEXT_PUBLIC_API` is set.

## Env

- A local `.env` is required (gitignored via `.env*`): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`, `NEXT_PUBLIC_API`.

## Structure & conventions

- Single Next.js App Router app (no monorepo). Entrypoints: `src/app/`.
- Page-section components live in `src/components/Home/` (e.g. `site-header.tsx`, `hero-banner.tsx`); event cards in `src/components/EventsCard/`; standalone bits like `Footer.tsx` and `JoinedEventButton.tsx` sit directly in `src/components/`; shadcn-generated primitives in `src/components/ui/`; app styles in `src/app/globals.css` (Tailwind v4 CSS variables, no tailwind.config).
- shadcn style is `base-nova` (`components.json`): components are built on `@base-ui/react` primitives, not Radix, and import `cn` from the `cn` npm package (not `@/lib/utils`).
- Path alias: `@/*` → `src/*` (`tsconfig.json`). Shared domain types (`Opportunity`, `JoinedEvent`) live in root-level `type.ts` and are imported with relative paths (e.g. `../../../type`) even though the alias exists — both styles are used, keep either.
- `SiteHeader`, `Footer`, and the sonner `Toaster` are mounted once in `src/app/layout.tsx`; pages should not re-render them.

## Known quirk

- `layout.tsx` loads Geist as `--font-geist-sans`, but `globals.css` maps theme `--font-sans` to an undefined variable, so Geist isn't applied globally — apply it explicitly per-page/component (see `src/app/page.tsx`).
