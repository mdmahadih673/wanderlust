# Wanderlast

Wanderlast is a travel booking app with a Next.js frontend, an Express API, MongoDB storage, and Better Auth accounts.

## Requirements

- Node.js 20 or newer
- MongoDB connection string
- Separate terminals for the frontend and API

## Configure

Create `wanderlust/.env.local` with:

```env
MONGODB_URL=mongodb://127.0.0.1:27017
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=https://wanderlust-sarver.vercel.app
```

Google and GitHub OAuth sign-in are optional. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` when those providers are configured.

Create `wanderlust-sarver/.env` with the same `MONGODB_URL` value and optionally `PORT=5000`. Set `NEXT_PUBLIC_API_BASE_URL=https://wanderlust-sarver.vercel.app` in the frontend's Vercel project settings. Set `MONGODB_URL` in the backend's Vercel project settings as well.

## Run locally

Install dependencies in both folders, then start MongoDB. In one terminal:

```bash
cd wanderlust-sarver
npm start
```

In another terminal:

```bash
cd wanderlust
npm run dev
```

Open `http://localhost:3000`. Register an account to book trips. Signed-in users can add, edit, and delete destinations; booking and cancellation require an account.

## Verify

```bash
npm run lint
npm run build
```
