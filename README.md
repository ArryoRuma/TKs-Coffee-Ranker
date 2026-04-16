# Sippd

Sippd is a social coffee logging app with Letterboxd/Untappd energy — your personal coffee diary, taste tracker, and memory system.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives (`components/ui`)
- Prisma + PostgreSQL
- Zod validation
- Auth scaffold with demo-user mode

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
3. Generate Prisma client
   ```bash
   npx prisma generate
   ```
4. (Optional) seed if Postgres is running locally
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
5. Run app
   ```bash
   npm run dev
   ```

## Project structure

```text
app/
  auth/sign-in/
  dashboard/
  diary/
  entries/[id]/
  entries/new/
  top-sips/
  saved-sips/
  wanna-sip/
  lists/
  profile/
components/
  ui/
lib/
  auth.ts
  mock-data.ts
  validation/entry.ts
prisma/
  schema.prisma
  seed.ts
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
