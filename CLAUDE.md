# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wanderlust is a travel agency web application built with Next.js 16 (App Router), featuring destination browsing, user authentication, and a backend API integration. The app uses MongoDB for data persistence and Better Auth for authentication.

## Development Commands

```bash
# Start development server (default: http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### App Router Structure

This project uses Next.js App Router with the following key patterns:

- **Route groups**: `(auth)` group contains sign-in/sign-up pages without affecting URL structure
- **Dynamic routes**: `destinations/[id]` for individual destination pages
- **API routes**: `app/api/auth/[...all]/route.ts` handles all Better Auth endpoints via catch-all route

### Authentication

Authentication is powered by Better Auth with MongoDB adapter:

- **Server config**: `lib/auth.ts` exports the `auth` instance with email/password enabled
- **Client hooks**: `lib/auth-client.ts` exports `authClient` and convenience methods (`signIn`, `signUp`, `signOut`, `updateUser`, `useSession`)
- **API handler**: All auth routes go through `/api/auth/*` (handled by Better Auth's `toNextJsHandler`)
- **User model extensions**: Adds optional `location` and `nationality` fields to the base user schema

Environment variables required:
- `BETTER_AUTH_SECRET`: Secret for session signing
- `BETTER_AUTH_URL`: Base URL of the app
- `MONGODB_URL`: MongoDB connection string

### Data Fetching

The app fetches destination data from an external backend API at `http://localhost:5000`:

- Pages that fetch live data set `export const instant = false` to prevent Next.js from prerendering
- Destination type is defined in `components/destinations-grid.tsx`

### UI Components

- **Component library**: shadcn/ui (Base Nova style) with path aliases configured
- **Icons**: lucide-react
- **Typography**: Geist (sans/mono) and Outfit (display font for headings)
- **Styling**: Tailwind CSS 4 with Turbopack loader configured in `next.config.ts`

Path aliases:
- `@/*` maps to project root
- `@/components` for all components
- `@/lib` for utilities and configurations
- `@/hooks` for custom hooks

### Remote Images

Next.js image optimization is configured for these domains:
- `images.unsplash.com`
- `dynamic-media-cdn.tripadvisor.com`

To add more domains, update `next.config.ts` under `images.remotePatterns`.

## Key Files

- `lib/auth.ts`: Better Auth server configuration
- `lib/auth-client.ts`: Client-side auth hooks and methods
- `lib/utils.ts`: Utility functions (likely includes `cn` for className merging)
- `components.json`: shadcn/ui configuration
- `app/layout.tsx`: Root layout with Navbar, Footer, and metadata

## Important Notes

- **Next.js 16**: This version has breaking changes from earlier versions. Check `node_modules/next/dist/docs/` for current APIs before writing code
- **MongoDB connection**: Ensure the MongoDB URL in `.env` is valid; the app connects on startup
- **Backend dependency**: The destinations pages expect `http://localhost:5000/destinations` to be running
- **Session management**: Use `useSession()` hook from `lib/auth-client.ts` to access user session in client components
- **TypeScript strict mode**: The project has strict TypeScript enabled

## Common Patterns

When adding new destination-related features:
1. Check the `Destination` type exported from `components/destinations-grid.tsx`
2. Fetch from the appropriate `/destinations` endpoint
3. Use `instant = false` export to ensure fresh data

When adding authenticated features:
1. Import session hooks from `@/lib/auth-client`
2. Use `useSession()` for client components
3. Use `auth.api.getSession()` for server components/route handlers

When adding UI components:
1. Use shadcn/ui components from `@/components/ui`
2. Follow the existing pattern of client components marked with `"use client"`
3. Use the `font-heading` utility class for Outfit font (brand typography)
