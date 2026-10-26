import { createAuthClient } from "better-auth/react"

// Single client for the whole app. Default base URL resolves to "/api/auth",
// which matches app/api/auth/[...all]/route.ts — no custom baseURL needed.
export const authClient = createAuthClient()

export const { signIn, signUp, signOut, updateUser, useSession } = authClient
