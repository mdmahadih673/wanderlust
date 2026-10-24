import type { Metadata } from "next"

import {
  DestinationsGrid,
  type Destination,
} from "@/components/destinations-grid"

// Live data from the backend on every request, so Next must not prerender it.
export const instant = false

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Find your perfect travel experience from our curated collection.",
}

const DestinationsPage = async () => {
  const res = await fetch("http://localhost:5000/destinations")
  const data: Destination[] = await res.json()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      <DestinationsGrid destinations={data} className="mt-8" />
    </div>
  )
}

export default DestinationsPage
