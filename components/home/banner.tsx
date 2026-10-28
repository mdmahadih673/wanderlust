"use client"

import Image from "next/image"
import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

const searchFields = [
  {
    id: "location",
    label: "Location",
    placeholder: "Address, City Or Zip",
    type: "text",
    inputMode: "text" as const,
  },
  {
    id: "dates",
    label: "Date/Duration",
    placeholder: "Anytime/3 Days",
    type: "text",
    inputMode: "text" as const,
  },
  {
    id: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
    type: "text",
    inputMode: "numeric" as const,
  },
  {
    id: "people",
    label: "People",
    placeholder: "5-10",
    type: "text",
    inputMode: "numeric" as const,
  },
] as const

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/Banner.png"
          fill
          priority
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      </div>

      {/* Headline */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:py-24">
        <h1 className="font-heading max-w-4xl text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-5 max-w-2xl text-balance text-base text-white/80 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#destinations"
            className="inline-flex h-11 items-center justify-center gap-3 rounded-lg bg-primary px-7 text-sm font-semibold tracking-[0.06em] text-primary-foreground uppercase shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Explore Now
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </a>

          <a
            href="#destinations"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 bg-white/15 px-7 text-sm font-semibold tracking-[0.06em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none"
          >
            View Destination
          </a>
        </div>
      </div>

      {/* Search bar */}
      <form
        onSubmit={(event) => event.preventDefault()}
        aria-label="Search trips"
        className="relative w-full border-t border-white/20 bg-black/55 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col divide-y divide-white/20 lg:flex-row lg:divide-x lg:divide-y-0">
          {searchFields.map((field) => (
            <label
              key={field.id}
              htmlFor={field.id}
              className="group flex flex-1 cursor-text flex-col gap-0.5 px-5 py-3.5 text-left transition-colors hover:bg-white/5 focus-within:bg-white/10"
            >
              <span className="text-sm font-semibold text-white">
                {field.label}
              </span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                inputMode={field.inputMode}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/55"
              />
            </label>
          ))}

          <button
            type="submit"
            className="shrink-0 bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 focus-visible:outline-none lg:min-w-40"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  )
}
