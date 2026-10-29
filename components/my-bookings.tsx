import Image from "next/image"
import {
  CalendarDaysIcon,
  CircleCheckIcon,
  ClockIcon,
  EyeIcon,
  HashIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import Link from "next/link"
import { CancelBookingButton } from "@/components/bookings/cancel-booking-button"

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
  // Cancelled bookings are hidden here — cancelling removes the card from this
  // list. The backend keeps the record (status "Cancelled") so the destination
  // becomes bookable again.
  const bookings = (data ?? [])
    .filter((booking) => {
      const status = booking.status?.toLowerCase()
      return status !== "cancelled" && status !== "canceled"
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
          <p className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            You don&apos;t have any bookings yet.
          </p>
        )}
      </div>
    </div>
  )
}
