import type { Metadata } from "next"

import { AddDestinationsForm } from "@/components/add-destinations-form"

export const metadata: Metadata = {
  title: "Add Travel Package",
  description: "Create a new travel package for the Wanderlast catalog.",
}

const AddDestinationsPage = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-heading text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Add New Travel Package
      </h1>

      <AddDestinationsForm className="mx-auto mt-10 w-full max-w-xl" />
    </div>
  )
}

export default AddDestinationsPage
