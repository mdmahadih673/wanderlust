"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

const API = "http://localhost:5000"

// Cancels a booking server-side, then refreshes the server-rendered list so
// the destination becomes bookable again on its detail page.
export function CancelBookingButton({
  bookingId,
  title,
}: {
  bookingId: string
  title: string
}) {
  const router = useRouter()
  const [cancelling, setCancelling] = useState(false)

  const handleCancel = async () => {
    if (cancelling) return
    setCancelling(true)

    try {
      const res = await fetch(
        `${API}/my-booking/${encodeURIComponent(bookingId)}/cancel`,
        { method: "PATCH" },
      )

      if (!res.ok) {
        toast.add({
          type: "error",
          title: "Cancel failed",
          description: "Something went wrong while cancelling. Please try again.",
        })
        return
      }

      toast.add({
        type: "success",
        title: "Booking cancelled",
        description: `Your booking for ${title} has been cancelled.`,
      })

      // Re-fetch the server component so the updated status shows immediately.
      router.refresh()
    } catch (err) {
      console.error("Cancel failed:", err)
      toast.add({
        type: "error",
        title: "Cancel failed",
        description: "Something went wrong while cancelling. Please try again.",
      })
    } finally {
      setCancelling(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleCancel}
      disabled={cancelling}
      className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2Icon aria-hidden="true" />
      {cancelling ? "Cancelling…" : "Cancel"}
    </Button>
  )
}
