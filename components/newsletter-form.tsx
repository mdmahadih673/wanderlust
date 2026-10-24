"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

export function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <form
      className="mt-4 max-w-xs"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="relative">
        <input
          type="email"
          required
          name="email"
          aria-label="Email address"
          placeholder={
            submitted ? "Thanks for subscribing!" : "Enter email"
          }
          disabled={submitted}
          className="h-11 w-full rounded-md bg-neutral-800 pr-11 pl-4 text-sm text-white transition-colors placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-70"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute inset-y-0 right-1 my-auto flex size-9 items-center justify-center rounded-md text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}
