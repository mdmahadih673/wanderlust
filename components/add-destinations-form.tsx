"use client"

import * as React from "react"
import { SaveIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

const categories = [
  "Beach",
  "Mountain",
  "Island",
  "City Break",
  "Adventure",
  "Cultural",
  "Wildlife",
  "Desert",
] as const

const emptyForm = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
}

type FormKey = keyof typeof emptyForm

// Filled fields rather than the kit's default transparent inputs.
// One shared class keeps every control on the same height, radius and focus ring.
const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-muted px-3.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"

const textareaClass =
  "min-h-32 w-full rounded-lg border border-input bg-muted px-3.5 py-3 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"

// Drives both axes: Card applies it to `py`, CardContent to `px`, so the
// card's padding stays square from one token instead of two hand-tuned values.
const cardPadding = { "--card-spacing": "1.75rem" } as React.CSSProperties

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

export function AddDestinationsForm({ className }: { className?: string }) {
  const [form, setForm] = React.useState(emptyForm)
  const [saved, setSaved] = React.useState(false)

  const update = (key: FormKey, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }))
    setSaved(false)
  }

  return (
    <Card style={cardPadding} className={className}>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault()
            setSaved(true)
          }}
        >
          <Field id="name" label="Destination Name">
            <Input
              id="name"
              name="name"
              required
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Bali Paradise"
              className={fieldClass}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="country" label="Country">
              <Input
                id="country"
                name="country"
                required
                value={form.country}
                onChange={(event) => update("country", event.target.value)}
                placeholder="Indonesia"
                className={fieldClass}
              />
            </Field>

            <Field id="category" label="Category">
              <NativeSelect
                id="category"
                name="category"
                value={form.category}
                onChange={(event) => update("category", event.target.value)}
                className={fieldClass}
              >
                {categories.map((category) => (
                  <NativeSelectOption key={category} value={category}>
                    {category}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="price" label="Price (USD)">
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                required
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                placeholder="e.g., 1299"
                className={fieldClass}
              />
            </Field>

            <Field id="duration" label="Duration">
              <Input
                id="duration"
                name="duration"
                required
                value={form.duration}
                onChange={(event) => update("duration", event.target.value)}
                placeholder="e.g., 7 Days/6 Nights"
                className={fieldClass}
              />
            </Field>
          </div>

          <Field id="departureDate" label="Departure Date">
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              required
              value={form.departureDate}
              onChange={(event) =>
                update("departureDate", event.target.value)
              }
              className={fieldClass}
            />
          </Field>

          <Field id="imageUrl" label="Image URL">
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              placeholder="https://example.com/image.jpg"
              className={fieldClass}
            />
          </Field>

          <Field id="description" label="Description">
            <Textarea
              id="description"
              name="description"
              rows={5}
              required
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              placeholder="Describe the travel experience..."
              className={textareaClass}
            />
          </Field>

          {saved && (
            <p
              role="status"
              className="rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
            >
              Travel package saved. Connect a backend to persist it.
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="destructive"
              className="h-11 px-5 sm:w-auto"
              onClick={() => {
                setForm(emptyForm)
                setSaved(false)
              }}
            >
              <TrashIcon aria-hidden="true" />
              Cancel
            </Button>

            <Button type="submit" className="h-11 px-5 sm:w-auto">
              <SaveIcon aria-hidden="true" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
