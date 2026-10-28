import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { AddDestinationsForm } from "@/components/Add-Destinations/add-destinations-form"

export const metadata: Metadata = {
  title: "Add Travel Package",
  description: "Create a new travel package for the Wanderlast catalog.",
}

const AddDestinationsPage = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col gap-6">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Back to home
        </Link>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Add New Travel Package
        </h1>
      </div>

      <AddDestinationsForm className="mx-auto mt-10 w-full max-w-xl" />
    </div>
  )
}

export default AddDestinationsPage
