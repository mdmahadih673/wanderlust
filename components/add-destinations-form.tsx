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
type FormState = Record<FormKey, string>
type FieldErrors = Partial<Record<FormKey, string>>

export type TravelPackageInput = Omit<FormState, "category" | "price"> & {
  category: string
  price: number
}

// ---------------------------------------------------------------------------
// TODO: wire this to your backend.
// Replace the body with your fetch / server action / DB call, e.g.
//   const res = await fetch("/api/destinations", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   })
//   return res.ok
// ---------------------------------------------------------------------------
async function submitPackage(payload: TravelPackageInput): Promise<boolean> {
  console.log("Submitting package:", payload)

  // Simulated latency so the pending state is visible; delete when real.
  await new Promise((resolve) => setTimeout(resolve, 500))

  return true
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.name.trim()) errors.name = "Destination name is required."
  if (!form.country.trim()) errors.country = "Country is required."
  if (!form.duration.trim()) errors.duration = "Duration is required."
  if (!form.departureDate) errors.departureDate = "Departure date is required."
  if (!form.description.trim()) errors.description = "Description is required."

  const price = Number(form.price)
  if (!form.price.trim() || !Number.isFinite(price) || price < 0) {
    errors.price = "Enter a valid price."
  }

  if (!form.imageUrl.trim()) {
    errors.imageUrl = "Image URL is required."
  } else {
    try {
      const url = new URL(form.imageUrl.trim())
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.imageUrl = "Use an http(s) URL."
      }
    } catch {
      errors.imageUrl = "Enter a valid URL."
    }
  }

  return errors
}

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-muted px-3.5 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30"

const textareaClass =
  "min-h-32 w-full rounded-lg border border-input bg-muted px-3.5 py-3 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30"

// Card applies this to `py`, CardContent to `px` — one token keeps both axes square.
const cardPadding = { "--card-spacing": "1.75rem" } as React.CSSProperties

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function AddDestinationsForm({ className }: { className?: string }) {
  const [form, setForm] = React.useState<FormState>(emptyForm)
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [pending, setPending] = React.useState(false)
  const [status, setStatus] = React.useState<{
    kind: "success" | "error"
    message: string
  } | null>(null)

  const update = (key: FormKey, value: string) => {
    console.log("[onChange]", key, "=", value)
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  const reset = () => {
    console.log("[onClick] Cancel clicked — form cleared")
    setForm(emptyForm)
    setErrors({})
    setStatus(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await fetch('http://localhost:5000/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()



    

    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      console.log("[onSubmit] validation failed:", nextErrors)
      setStatus({ kind: "error", message: "Please fix the highlighted fields." })
      return
    }

    console.log("[onSubmit] validation passed — sending payload")
    setPending(true)
    setStatus(null)

    const payload: TravelPackageInput = {
      name: form.name.trim(),
      country: form.country.trim(),
      category: form.category,
      price: Number(form.price),
      duration: form.duration.trim(),
      departureDate: form.departureDate,
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim(),
    }

    try {
      const ok = await submitPackage(payload)

      if (ok) {
        setStatus({ kind: "success", message: `"${payload.name}" was added.` })
        setForm(emptyForm)
      } else {
        setStatus({
          kind: "error",
          message: "Could not save the package. Please try again.",
        })
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Card style={cardPadding} className={className}>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <Field id="name" label="Destination Name" error={errors.name}>
            <Input
              id="name"
              name="name"
              aria-invalid={Boolean(errors.name)}
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Bali Paradise"
              className={fieldClass}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="country" label="Country" error={errors.country}>
              <Input
                id="country"
                name="country"
                aria-invalid={Boolean(errors.country)}
                value={form.country}
                onChange={(event) => update("country", event.target.value)}
                placeholder="Indonesia"
                className={fieldClass}
              />
            </Field>

            <Field id="category" label="Category" error={errors.category}>
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
            <Field id="price" label="Price (USD)" error={errors.price}>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                step="1"
                aria-invalid={Boolean(errors.price)}
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                placeholder="e.g., 1299"
                className={fieldClass}
              />
            </Field>

            <Field id="duration" label="Duration" error={errors.duration}>
              <Input
                id="duration"
                name="duration"
                aria-invalid={Boolean(errors.duration)}
                value={form.duration}
                onChange={(event) => update("duration", event.target.value)}
                placeholder="e.g., 7 Days/6 Nights"
                className={fieldClass}
              />
            </Field>
          </div>

          <Field
            id="departureDate"
            label="Departure Date"
            error={errors.departureDate}
          >
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              aria-invalid={Boolean(errors.departureDate)}
              value={form.departureDate}
              onChange={(event) => update("departureDate", event.target.value)}
              className={fieldClass}
            />
          </Field>

          <Field id="imageUrl" label="Image URL" error={errors.imageUrl}>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              aria-invalid={Boolean(errors.imageUrl)}
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              placeholder="https://example.com/image.jpg"
              className={fieldClass}
            />
          </Field>

          <Field id="description" label="Description" error={errors.description}>
            <Textarea
              id="description"
              name="description"
              rows={5}
              aria-invalid={Boolean(errors.description)}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              placeholder="Describe the travel experience..."
              className={textareaClass}
            />
          </Field>

          {status && (
            <p
              role={status.kind === "error" ? "alert" : "status"}
              className={`rounded-lg px-4 py-3 text-sm font-medium ${status.kind === "error"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
                }`}
            >
              {status.message}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="destructive"
              className="h-11 px-5 sm:w-auto"
              onClick={reset}
            >
              <TrashIcon aria-hidden="true" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="h-11 px-5 sm:w-auto"
              disabled={pending}
            >
              <SaveIcon aria-hidden="true" />
              {pending ? "Saving..." : "Add Travel Package"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
