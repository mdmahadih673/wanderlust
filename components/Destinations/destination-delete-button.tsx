"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { TrashIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Destination = {
  _id: string
  name: string
}

const API = "http://localhost:5000"

export function DestinationDeleteButton({
  destination,
  className,
}: {
  destination: Destination
  className?: string
}) {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [deleting, setDeleting] = React.useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    setError(null)

    try {
      const res = await fetch(`${API}/destinations/${destination._id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Request failed")

      setOpen(false)
      router.push("/destinations")
      router.refresh()
    } catch {
      setError("Could not delete this destination. Please try again.")
      setDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={
              className ??
              "h-9 gap-2 border-destructive/30 px-3.5 text-sm text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
            }
          >
            <TrashIcon size={14} />
            Delete
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this destination?</AlertDialogTitle>
          <AlertDialogDescription>
            &ldquo;{destination.name}&rdquo; will be removed permanently. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            variant="destructive"
            onClick={(event) => {
              event.preventDefault()
              void handleDelete()
            }}
            disabled={deleting}
          >
            {deleting ? <Spinner /> : <TrashIcon />}
            {deleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
