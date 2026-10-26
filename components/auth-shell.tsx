"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Design-only shell shared by the sign-in and sign-up pages: a travel photo
// panel on the left, the form card on the right.
export function AuthShell({
  imageSrc,
  title,
  description,
  submitLabel,
  footer,
  children,
}: {
  imageSrc: string
  title: string
  description: string
  submitLabel: string
  footer: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Visual panel — hidden on small screens where the form is enough. */}
        <aside className="relative isolate hidden min-h-[34rem] overflow-hidden rounded-2xl ring-1 ring-foreground/10 lg:flex lg:flex-col lg:justify-between">
          <Image
            src={imageSrc}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
            aria-hidden="true"
          />

          <div className="p-8 text-white lg:p-10">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 font-heading text-lg font-semibold tracking-tight"
            >
              Wanderlast
            </Link>
          </div>

          <div className="p-8 text-white lg:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
              Explore the world with us
            </p>

            <h2 className="mt-3 max-w-md font-heading text-3xl leading-tight font-bold tracking-tight lg:text-4xl">
              Where will your story take you next?
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
              Handpicked stays, expert local guides and support at every step —
              from the first search to the trip home.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
              {[
                { value: "120+", label: "Destinations" },
                { value: "20k+", label: "Travelers" },
                { value: "4.9", label: "Avg. rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-2xl font-bold">{stat.value}</dd>
                  <dd className="mt-1 text-xs text-white/70">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        {/* Form card */}
        <div className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <StarIcon className="size-3 fill-current" aria-hidden="true" />
                Wanderlast Account
              </span>

              <CardTitle className="font-heading text-2xl sm:text-3xl">
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Design-only: nothing is submitted until auth is wired up. */}
              <form
                onSubmit={(event) => event.preventDefault()}
                noValidate
                className="flex flex-col gap-4"
              >
                {children}

                <Button type="submit" className="mt-1 h-11 w-full">
                  {submitLabel}
                  <ArrowRightIcon aria-hidden="true" />
                </Button>
              </form>
            </CardContent>

            <CardFooter className="justify-center text-center text-sm text-muted-foreground">
              {footer}
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
