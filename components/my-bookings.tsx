"use client"

import Image from "next/image"
import {
  CalendarDaysIcon,
  CircleCheckIcon,
  ClockIcon,
  CompassIcon,
  EyeIcon,
  HashIcon,
  PlaneTakeoffIcon,
} from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import Link from "next/link"
import { CancelBookingButton } from "@/components/bookings/cancel-booking-button"
import { useCancelledBookingIds } from "@/components/bookings/cancelled-bookings"

// Shape of what http://localhost:5000/my-booking/:email returns — the
// destination fields plus the user who booked it.
export type ApiBooking = {
  _id: string
  name: string
  imageUrl: string
  price: string | number
  departureDate?: string
  status?: string
}

// Row shape this component renders.
type Booking = {
  id: string
  title: string
  status: "Confirmed" | "Pending"
  departure: string
  bookingId: string
  price: string | number
  image: string
}

// "2026-05-15" → "May 15, 2026" (parsed locally so the day never shifts).
function formatDate(value?: string) {
  if (!value) return "TBD"

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  const date = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(value)

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

// Mongo ids are long — shorten them for display.
function shortenId(value: string) {
  if (value.length <= 14) return value
  return `${value.slice(0, 8)}…${value.slice(-4)}`
}

// API document → the row shape this component renders.
function fromApi(booking: ApiBooking): Booking {
  const rawStatus = booking.status?.toLowerCase()

  let status: Booking["status"] = "Confirmed"
  if (rawStatus === "pending") status = "Pending"

  return {
    id: booking._id,
    title: booking.name,
    // No status field yet — default to Confirmed, honour it if the API adds one.
    status,
    departure: formatDate(booking.departureDate),
    bookingId: shortenId(booking._id),
    price: booking.price,
    image: booking.imageUrl,
  }
}

const statusStyle = {
  confirmed: { className: "bg-green-50 text-green-600", Icon: CircleCheckIcon },
  pending: { className: "bg-amber-50 text-amber-600", Icon: ClockIcon },
} as const

const defaultStatusStyle = {
  className: "bg-gray-50 text-gray-600",
  Icon: CircleCheckIcon,
} as const

// Tolerate any casing/label the API sends so a status we don't know
// still renders instead of crashing on the lookup.
function getStatusStyle(status: string) {
  return statusStyle[status.toLowerCase() as keyof typeof statusStyle] ?? defaultStatusStyle
}

export function MyBookings({ data }: { data?: ApiBooking[] }) {
  // Cancelled booking ids remembered in this browser (see cancelled-bookings.ts).
  const cancelledIds = useCancelledBookingIds()

  // Cards disappear from this list when the user cancels: the status filter
  // covers records the backend marked "Cancelled", and the id filter covers
  // records it reported deleting but kept — either way the card goes.
  const bookings = (data ?? [])
    .filter((booking) => {
      const status = booking.status?.toLowerCase()
      if (status === "cancelled" || status === "canceled") return false

      if (cancelledIds === null) return true
      return !cancelledIds.includes(booking._id)
    })
    .map(fromApi)

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        My Bookings
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {bookings.map((booking, index) => {
          const { className, Icon } = getStatusStyle(booking.status)

          return (
            <article
              key={`${booking.id}-${index}`}
              className="grid gap-5 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[20rem_1fr] sm:p-5"
            >
              <Image
                src={booking.image}
                alt={booking.title}
                width={640}
                height={360}
                className="aspect-[16/9] w-full rounded-xl object-cover"
              />

              <div className="flex flex-col">
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${className}`}
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {booking.status}
                </span>

                <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {booking.title}
                </h2>

                <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <CalendarDaysIcon className="size-4" aria-hidden="true" />
                    Departure: {booking.departure}
                  </span>
                  <span className="flex items-center gap-2">
                    <HashIcon className="size-4" aria-hidden="true" />
                    Booking ID: {booking.bookingId}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                  <p className="font-heading text-3xl font-bold text-primary">
                    ${booking.price}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <CancelBookingButton
                      bookingId={booking.id}
                      title={booking.title}
                    />

                    <Link
                      href="/destinations"
                      className={cn(buttonVariants())}
                    >
                      <EyeIcon aria-hidden="true" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )
        })}

        {bookings.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center sm:py-20">
            <div className="flex size-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 ring-8 ring-cyan-50/50">
              <PlaneTakeoffIcon className="size-8" aria-hidden="true" />
            </div>

            <h2 className="font-heading mt-6 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              No bookings yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Your upcoming trips will show up here once you book. Explore our
              destinations and plan your next adventure.
            </p>

            <Link
              href="/destinations"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
            >
              <CompassIcon className="size-4" aria-hidden="true" />
              Book now
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
