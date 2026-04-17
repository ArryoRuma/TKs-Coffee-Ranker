# Sippd

Sippd is a social coffee logging app with Letterboxd/Untappd energy — your personal coffee diary, taste tracker, and memory system.

## Stack

- Nuxt 4 + TypeScript
- Nuxt UI
- Supabase module integration (demo-mode data currently served locally)
- Tailwind CSS
- Legacy (Next): shadcn/ui-style component primitives (`components/ui`)
- Zod validation
- Legacy (Next): auth scaffold with demo-user mode

## Product pillars included

- Landing page
- Auth scaffold (`/auth/sign-in`)
- Home (`/dashboard`)
- Log a Sip (`/entries/new`)
- Sip Log (`/diary`)
- Top Sips (`/top-sips`)
- Saved Sips (`/saved-sips`)
- Wanna Sip (`/wanna-sip`)
- Sip detail (`/entries/[id]`)
- Profile (`/profile`)
- Legacy route redirect (`/lists` → `/saved-sips`)

## Domain model

- `User`
- `CoffeeEntry`
- `Cafe`
- `Roaster`
- `Review`
- `List`
- `ListItem`
- `Tag`

Future scaffolds are noted in Prisma TODOs for follows, comments, likes, activity feed, shop pages, and recommendation signals.

## Why a 1-10 Sip Score scale?

Coffee tasting often needs finer granularity than 1-5 (especially between cups that are all “good”). 1-10 is still intuitive for users while preserving meaningful ranking and trend analysis.

## Local setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment
   ```bash
   cp .env.example .env
   ```
3. Configure Supabase values for module wiring
   ```bash
   # values are placeholders by default in .env.example
   SUPABASE_URL=...
   SUPABASE_ANON_KEY=...
   ```
4. Run app
   ```bash
   npm run dev
   ```

## Project structure

```text
nuxt/                  # current Nuxt application surface
  app.vue
  pages/index.vue
  server/api/entries.get.ts

app/                   # legacy Next.js app surface retained during migration
components/            # shared/legacy UI components
lib/                   # shared/legacy utilities
prisma/                # Prisma schema, migrations, and TODO scaffolds
```

## MVP next steps

- TODO: real auth/session implementation (NextAuth/Clerk)
- TODO: social follows
- TODO: comments
- TODO: likes
- TODO: public Top Sips/Saved Sips/Wanna Sip sharing
- TODO: cafe/shop public pages
- TODO: recommendation engine based on taste graph
- TODO: expand the Sippd brand system (voice guidelines, themed components, and creator profile styling)
