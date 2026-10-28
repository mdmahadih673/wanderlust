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
import { Spinner } from "@/components/ui/spinner"
import { updateUser } from "@/lib/auth-client"

export type ProfileUser = {
  id: string
  name: string
  email: string
  image?: string | null
  emailVerified?: boolean
  createdAt?: string | Date
}

type FormState = {
  name: string
  image: string
}

const toFormState = (user: ProfileUser): FormState => ({
  name: user.name ?? "",
  image: user.image ?? "",
})

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {}

  if (!form.name.trim()) errors.name = "Name is required."

  if (form.image.trim()) {
    try {
      const url = new URL(form.image.trim())
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.image = "Use an http(s) URL."
      }
    } catch {
      errors.image = "Enter a valid URL."
    }
  }

  return errors
}

export function ProfileEditButton({
  user,
  trigger,
  className,
}: {
  user: ProfileUser
  trigger?: React.ReactElement
  className?: string
}) {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState<FormState>(() => toFormState(user))
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormState, string>>
  >({})
  const [saveError, setSaveError] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)

  const update = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
    setSaveError(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setForm(toFormState(user))
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
      const { error } = await updateUser({
        name: form.name.trim(),
        image: form.image.trim() || undefined,
      })

      if (error) throw new Error(error.message)

      setOpen(false)
      router.refresh()
    } catch (err) {
      setSaveError(
        err instanceof Error && err.message
          ? err.message
          : "Could not save the changes. Please try again."
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button
              variant="outline"
              size="sm"
              className={className ?? "h-9 gap-2 px-3.5"}
            >
              <PencilIcon />
              Edit Profile
            </Button>
          )
        }
      />

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update how your profile looks to other travellers.
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
              <FieldLabel htmlFor="profile-name">Full Name</FieldLabel>
              <Input
                id="profile-name"
                name="name"
                aria-invalid={Boolean(errors.name)}
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Sarah Mitchell"
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="profile-image">Profile Image URL</FieldLabel>
              <Input
                id="profile-image"
                name="image"
                type="url"
                aria-invalid={Boolean(errors.image)}
                value={form.image}
                onChange={(event) => update("image", event.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              {errors.image && <FieldError>{errors.image}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="profile-email">Email</FieldLabel>
              <Input
                id="profile-email"
                name="email"
                value={user.email}
                readOnly
                disabled
                aria-describedby="profile-email-hint"
              />
              <p
                id="profile-email-hint"
                className="text-xs text-muted-foreground"
              >
                Email cannot be changed here.
              </p>
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
