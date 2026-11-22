export const API_BASE_URL = (process.env.API_BASE_URL ?? "http://localhost:5000").replace(/\/$/, "")

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${API_BASE_URL}${path}`, { cache: "no-store", ...init })
}
