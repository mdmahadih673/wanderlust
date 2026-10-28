"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react"

// Shape of what http://localhost:5000/destinations returns.
// `price` arrives as a string, so every comparison goes through priceOf().
export interface Destination{
  _id: string
  name: string
  country: string
  category: string
  price: string
  duration: string
  departureDate?: string
  imageUrl: string
  description?: string
}

const priceOf = (destination: Destination) => Number(destination.price)

// The API has no rating field, so the badge always reads 4.5 like the mockup.
const RATING = 4.5

const priceOptions = ["Any", "Under $1500", "$1500 - $1900", "Over $1900"]

// No "Top Rated" yet — the API returns no rating field to sort on.
const sortOptions = ["Sort By", "Price: Low to High", "Price: High to Low"]

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="relative flex-1">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-xs font-semibold tracking-wider text-muted-foreground uppercase outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )
}

export function DestinationsGrid({
  destinations,
  className,
}: {
  destinations: Destination[]
  className?: string
}) {
  const [category, setCategory] = React.useState("All")
  const [price, setPrice] = React.useState("Any")
  const [sort, setSort] = React.useState("Sort By")

  // Category options come from the data, so new categories need no code change.
  const categories = [
    "All",
    ...Array.from(new Set(destinations.map((destination) => destination.category))),
  ]

  let visible = destinations.filter(
    (destination) => category === "All" || destination.category === category
  )

  if (price === "Under $1500") visible = visible.filter((d) => priceOf(d) < 1500)
  if (price === "$1500 - $1900")
    visible = visible.filter((d) => priceOf(d) >= 1500 && priceOf(d) <= 1900)
  if (price === "Over $1900") visible = visible.filter((d) => priceOf(d) > 1900)

  if (sort === "Price: Low to High")
    visible = [...visible].sort((a, b) => priceOf(a) - priceOf(b))
  if (sort === "Price: High to Low")
    visible = [...visible].sort((a, b) => priceOf(b) - priceOf(a))

  console.log("[filters]", { category, price, sort }, "->", visible.length, "results")

  return (
    <div className={className}>
      {/* Filter bar */}
      <div className="flex flex-col divide-y divide-input overflow-hidden rounded-lg border border-input bg-background sm:flex-row sm:divide-x sm:divide-y-0">
        <FilterSelect
          label="Category"
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <FilterSelect
          label="Price Range"
          value={price}
          options={priceOptions}
          onChange={setPrice}
        />
        <FilterSelect
          label="Sort By"
          value={sort}
          options={sortOptions}
          onChange={setSort}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {visible.length} destinations
      </p>

      {/* Card grid */}
      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((destination) => (
          <article key={destination._id} className="flex flex-col">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                width={640}
                height={427}
                className="aspect-[3/2] w-full object-cover"
              />

              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-background px-2 py-1 text-xs font-bold text-foreground shadow-md">
                {RATING}
                <StarIcon className="size-3.5 fill-foreground" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPinIcon className="size-4" aria-hidden="true" />
                {destination.country}
              </span>

              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  {destination.name}
                </h2>
                <p className="shrink-0">
                  <span className="font-heading text-lg font-bold text-foreground">
                    ${priceOf(destination)}
                  </span>
                  <span className="text-xs text-muted-foreground">/Person</span>
                </p>
              </div>

              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDaysIcon className="size-4" aria-hidden="true" />
                {destination.duration}
              </span>

              <Link
                href={`/destinations/${destination._id}`}
                className="mt-2 flex w-fit items-center gap-1 text-xs font-bold tracking-wider text-primary uppercase hover:underline"
              >
                Book Now
                <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}

        {visible.length === 0 && (
          <p className="text-sm text-muted-foreground sm:col-span-2 lg:col-span-3">
            No destinations match these filters.
          </p>
        )}
      </div>
    </div>
  )
}
