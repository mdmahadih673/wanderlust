"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PencilIcon, SaveIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

// Shape of what http://localhost:5000/destinations/:id returns.
export type Destination = {
  _id: string
  name: string
  country: string
  category: string
  price: string | number
  duration: string
  departureDate?: string
  imageUrl: string
  description?: string
}

const API = "http://localhost:5000"

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

type FormState = {
  name: string
  country: string
  category: string
  price: string
  duration: string
  departureDate: string
  imageUrl: string
  description: string
}

type FormKey = keyof FormState
type FieldErrors = Partial<Record<FormKey, string>>

const toFormState = (destination: Destination): FormState => ({
  name: destination.name ?? "",
  country: destination.country ?? "",
  category: destination.category ?? "Beach",
  price: String(destination.price ?? ""),
  duration: destination.duration ?? "",
  departureDate: destination.departureDate ?? "",
  imageUrl: destination.imageUrl ?? "",
  description: destination.description ?? "",
})

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.name.trim()) errors.name = "Destination name is required."
  if (!form.country.trim()) errors.country = "Country is required."
  if (!form.duration.trim()) errors.duration = "Duration is required."
  if (!form.departureDate) errors.departureDate = "Departure date is required."

  const price = Number(form.price)
  if (!form.price.trim() || !Number.isFinite(price) || price < 0) {
    errors.price = "Enter a valid price."
  }

  if (form.imageUrl.trim()) {
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

export function DestinationEditButton({
  destination,
  className,
}: {
  destination: Destination
  className?: string
}) {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState<FormState>(() => toFormState(destination))
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [saveError, setSaveError] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  const update = (key: FormKey, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
    setSaveError(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      // Reload fresh values every time the dialog opens.
      setForm(toFormState(destination))
      setErrors({})
      setSaveError(null)
    }
    setOpen(nextOpen)
  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaving(true)
    setSaveError(null)

    try {
      const res = await fetch(`${API}/destinations/${destination._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          country: form.country.trim(),
          duration: form.duration.trim(),
          price: Number(form.price),
          imageUrl: form.imageUrl.trim(),
          description: form.description.trim(),
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      setOpen(false)
      router.refresh()
    } catch {
      setSaveError("Could not save the changes. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={className ?? "h-9 gap-2 px-3.5 text-gray-700"}
          >
            <PencilIcon />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the details of &ldquo;{destination.name}&rdquo;.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} noValidate>
          {saveError && (
            <Alert variant="destructive" className="mb-4">
              <TriangleAlertIcon />
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          )}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="edit-name">Destination Name</FieldLabel>
              <Input
                id="edit-name"
                name="name"
                aria-invalid={Boolean(errors.name)}
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Bali Paradise"
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-country">Country</FieldLabel>
                <Input
                  id="edit-country"
                  name="country"
                  aria-invalid={Boolean(errors.country)}
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                  placeholder="Indonesia"
                />
                {errors.country && <FieldError>{errors.country}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-category">Category</FieldLabel>
                <NativeSelect
                  id="edit-category"
                  name="category"
                  value={form.category}
                  onChange={(event) => update("category", event.target.value)}
                >
                  {categories.map((category) => (
                    <NativeSelectOption key={category} value={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-price">Price (USD)</FieldLabel>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  min={0}
                  step="1"
                  aria-invalid={Boolean(errors.price)}
                  value={form.price}
                  onChange={(event) => update("price", event.target.value)}
                  placeholder="e.g., 1299"
                />
                {errors.price && <FieldError>{errors.price}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-duration">Duration</FieldLabel>
                <Input
                  id="edit-duration"
                  name="duration"
                  aria-invalid={Boolean(errors.duration)}
                  value={form.duration}
                  onChange={(event) => update("duration", event.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                />
                {errors.duration && <FieldError>{errors.duration}</FieldError>}
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="edit-departureDate">Departure Date</FieldLabel>
                <Input
                  id="edit-departureDate"
                  name="departureDate"
                  type="date"
                  aria-invalid={Boolean(errors.departureDate)}
                  value={form.departureDate}
                  onChange={(event) => update("departureDate", event.target.value)}
                />
                {errors.departureDate && (
                  <FieldError>{errors.departureDate}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="edit-imageUrl">Image URL</FieldLabel>
                <Input
                  id="edit-imageUrl"
                  name="imageUrl"
                  type="url"
                  aria-invalid={Boolean(errors.imageUrl)}
                  value={form.imageUrl}
                  onChange={(event) => update("imageUrl", event.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && <FieldError>{errors.imageUrl}</FieldError>}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-description">Description</FieldLabel>
              <Textarea
                id="edit-description"
                name="description"
                rows={4}
                aria-invalid={Boolean(errors.description)}
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                placeholder="Describe the travel experience..."
              />
              {errors.description && <FieldError>{errors.description}</FieldError>}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>

            <Button type="submit" disabled={saving}>
              {saving ? <Spinner /> : <SaveIcon />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
