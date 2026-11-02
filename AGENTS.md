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

## Structure & conventions

- Single Next.js App Router app (no monorepo). Entrypoints: `src/app/`.
- Site page sections live in `src/components/site/` (e.g. `site-header.tsx`, `hero-banner.tsx`); shadcn-generated primitives in `src/components/ui/`; app styles in `src/app/globals.css` (Tailwind v4 CSS variables, no tailwind.config).
- shadcn style is `base-nova` (`components.json`): components are built on `@base-ui/react` primitives, not Radix, and import `cn` from the `cn` npm package (not `@/lib/utils`).
- Path alias: `@/*` → `src/*` (`tsconfig.json`).

## Known quirk

- `layout.tsx` loads Geist as `--font-geist-sans`, but `globals.css` maps theme `--font-sans` to an undefined `--font-sans` variable, so Geist isn't applied globally — apply it explicitly per-page/component (see `src/app/page.tsx`).
