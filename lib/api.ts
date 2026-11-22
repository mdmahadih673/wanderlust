const defaultApiBaseUrl = "https://wanderlust-sarver.vercel.app"

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? defaultApiBaseUrl
).replace(/\/$/, "")

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${API_BASE_URL}${path}`, { cache: "no-store", ...init })
}
