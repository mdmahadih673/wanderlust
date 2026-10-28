import Image from "next/image"
import {
  CalendarDaysIcon,
  CircleCheckIcon,
  ClockIcon,
  EyeIcon,
  HashIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export type Booking = {
  id: string
  title: string
  status: "Confirmed" | "Pending"
  departure: string
  bookingId: string
  price: number
  image: string
}

// Placeholder rows matching the reference — swap for API data via the
// `bookings` prop once there is something to show.
const demoBookings: Booking[] = [
  {
    id: "1",
    title: "Bali Paradise",
    status: "Confirmed",
    departure: "May 15, 2026",
    bookingId: "b1",
    price: 1299,
    image: "/assets/destinations/image1.png",
  },
  {
    id: "2",
    title: "Bali Paradise",
    status: "Confirmed",
    departure: "May 15, 2026",
    bookingId: "b1",
    price: 1299,
    image: "/assets/destinations/image2.png",
  },
  {
    id: "3",
    title: "Venice & Italian Riviera",
    status: "Pending",
    departure: "May 15, 2026",
    bookingId: "b1",
    price: 1299,
    image: "/assets/destinations/image3.png",
  },
]

const statusStyle = {
  Confirmed: { className: "bg-green-50 text-green-600", Icon: CircleCheckIcon },
  Pending: { className: "bg-amber-50 text-amber-600", Icon: ClockIcon },
} as const

export function MyBookings({ bookings = demoBookings }: { bookings?: Booking[] }) {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        My Bookings
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {bookings.map((booking) => {
          const { className, Icon } = statusStyle[booking.status]

          return (
            <article
              key={booking.id}
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
                    <Button
                      variant="outline"
                      className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2Icon aria-hidden="true" />
                      Cancel
                    </Button>

                    <Button>
                      <EyeIcon aria-hidden="true" />
                      View
                    </Button>
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
