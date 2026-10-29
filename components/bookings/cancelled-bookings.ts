"use client"

import { useEffect, useState } from "react"

// Frontend-only cancel tracking.
//
// The backend's DELETE /my-bookings/:id responds 200 even when it fails to
// actually delete the record (it matches _id as a string, but Mongo stores it
// as an ObjectId — deletedCount stays 0). Until the backend removes the record,
// cancelled booking ids are remembered here (localStorage per browser) and
// My Bookings filters them out client-side so the card leaves the list.
//
// Note: because the state lives in this browser only, the hide doesn't carry
// over to other devices, and it resets if localStorage is cleared.
const STORAGE_KEY = "wanderlust:cancelled-booking-ids"
const CHANGE_EVENT = "wanderlust:cancelled-booking-ids-changed"

export function readCancelledBookingIds(): string[] {
  if (typeof window === "undefined") return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []

    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : []
  } catch {
    return []
  }
}

// Records a booking id as cancelled for this browser and notifies every
// subscribed hook instance in this tab ("storage" events only fire cross-tab).
export function addCancelledBookingId(id: string): void {
  if (typeof window === "undefined") return

  const ids = readCancelledBookingIds()
  if (!ids.includes(id)) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, id]))
  }

  window.dispatchEvent(new Event(CHANGE_EVENT))
}

// Live list of cancelled booking ids, or null before mount so server render and
// hydration markup agree. Callers treat null as "don't filter anything yet".
export function useCancelledBookingIds(): string[] | null {
  const [ids, setIds] = useState<string[] | null>(null)

  useEffect(() => {
    const sync = () => setIds(readCancelledBookingIds())

    sync()
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener("storage", sync)

    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return ids
}
