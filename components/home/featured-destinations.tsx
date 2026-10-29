"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import type { Destination } from "@/components/Destinations/destinations-grid"

// The API has no rating field, so the badge always reads 4.5 like the mockup.
const RATING = 4.5

const priceOf = (destination: Destination) => Number(destination.price)

export function FeaturedDestinations({
  destinations,
}: {
  destinations: Destination[]
}) {
  // The API can return the same document twice; dedupe by _id and keep the
  // first 5 so React keys stay unique and the carousel stays short.
  const featured = React.useMemo(() => {
    const seen = new Map<string, Destination>()
    for (const destination of destinations) {
      if (!seen.has(destination._id)) seen.set(destination._id, destination)
    }
    return Array.from(seen.values()).slice(0, 5)
  }, [destinations])

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [total, setTotal] = React.useState(featured.length)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
      setTotal(api.scrollSnapList().length)
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    onSelect()
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api])

  // Nothing to show — hide the whole section rather than an empty carousel.
  if (featured.length === 0) return null

  // Progress of the carousel as a 0–100 fill for the bar under the cards.
  const progress = total > 1 ? (current / (total - 1)) * 100 : 100

  return (
    <section id="featured" className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 gap-2 rounded-lg px-5 text-xs font-bold tracking-wider uppercase",
            )}
          >
            All Destinations
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="mt-10 w-full"
        >
          <CarouselContent className="-ml-4">
            {featured.map((destination) => (
              <CarouselItem
                key={destination._id}
                className="basis-[80%] pl-4 sm:basis-[48%] lg:basis-[38%]"
              >
                <article className="flex flex-col">
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
                      <StarIcon
                        className="size-3.5 fill-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPinIcon className="size-4" aria-hidden="true" />
                      {destination.country}
                    </span>

                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {destination.name}
                      </h3>
                      <p className="shrink-0">
                        <span className="font-heading text-lg font-bold text-foreground">
                          ${priceOf(destination)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /Person
                        </span>
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Counter + progress bar + arrows */}
        <div className="mt-8 flex items-center gap-4">
          <span className="shrink-0 text-sm font-medium tabular-nums text-foreground">
            {current + 1}/{total}
          </span>

          <div
            className="h-px flex-1 bg-border"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={current + 1}
          >
            <div
              className="h-px bg-primary transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
