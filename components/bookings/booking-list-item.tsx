"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { type Destination } from "@/components/Destinations/destinations-grid"
import { cn } from "cn"
import {
    CalendarDaysIcon,
    CheckCircle2Icon,
    CheckCheckIcon,
    ClockIcon,
    EyeIcon,
    MapPinIcon,
    Trash2Icon,
    XCircleIcon,
} from "lucide-react"

// A booking document from the API: destination fields + the user who booked.
export type Booking = Destination & {
    username?: string
    email?: string
    image?: string | null
    status?: string
}

type StatusKey = "confirmed" | "pending" | "completed" | "cancelled"

const STATUS_META: Record<
    StatusKey,
    {
        label: string
        className: string
        icon: React.ComponentType<{ className?: string }>
    }
> = {
    confirmed: {
        label: "Confirmed",
        className: "bg-green-50 text-green-600",
        icon: CheckCircle2Icon,
    },
    pending: {
        label: "Pending",
        className: "bg-amber-50 text-amber-600",
        icon: ClockIcon,
    },
    completed: {
        label: "Completed",
        className: "bg-cyan-50 text-cyan-700",
        icon: CheckCheckIcon,
    },
    cancelled: {
        label: "Cancelled",
        className: "bg-red-50 text-red-600",
        icon: XCircleIcon,
    },
}

// The backend does not store a status yet — fall back on the departure date so
// the badge still makes sense. A future `status` field wins when it exists.
function resolveStatus(booking: Booking): StatusKey {
    const raw = booking.status?.toLowerCase()

    if (raw === "confirmed" || raw === "pending" || raw === "completed" || raw === "cancelled") {
        return raw
    }

    const departure = booking.departureDate ? new Date(booking.departureDate) : null
    if (departure && !Number.isNaN(departure.getTime()) && departure.getTime() < Date.now()) {
        return "completed"
    }

    return "confirmed"
}

// "2026-05-15" → "May 15, 2026" (parsed locally so the day never shifts).
function formatDate(value?: string) {
    if (!value) return "TBD"

    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    const date = dateOnly
        ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
        : new Date(value)

    if (Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

// Mongo ids are long — shorten them for display, full value stays in the title.
function shortenId(value?: string) {
    if (!value) return "—"
    if (value.length <= 14) return value
    return `${value.slice(0, 8)}…${value.slice(-4)}`
}

const BookingListItem = ({ booking }: { booking: Booking }) => {
    const status = STATUS_META[resolveStatus(booking)]
    const StatusIcon = status.icon

    return (
        <article className="rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
            <div className="flex flex-col gap-5 sm:flex-row">
                {/* Trip image */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-auto sm:min-h-40 sm:w-64">
                    <Image
                        fill
                        sizes="(max-width: 640px) 100vw, 256px"
                        src={booking.imageUrl}
                        alt={booking.name}
                        className="object-cover"
                    />
                </div>

                {/* Booking details */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <span
                        className={cn(
                            "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                            status.className
                        )}
                    >
                        <StatusIcon className="size-3.5" aria-hidden="true" />
                        {status.label}
                    </span>

                    <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {booking.name}
                    </h2>

                    <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                            <CalendarDaysIcon className="size-4 shrink-0" aria-hidden="true" />
                            Departure: {formatDate(booking.departureDate)}
                        </p>

                        <p className="flex items-center gap-2" title={booking._id}>
                            <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
                            Booking ID:{" "}
                            <span className="font-mono text-xs">{shortenId(booking._id)}</span>
                        </p>
                    </div>

                    {/* Price + actions */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                        <p className="text-3xl font-bold tracking-tight text-cyan-600">
                            {booking.price ? `$${booking.price}` : "—"}
                        </p>

                        <div className="ml-auto flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="border-red-200 px-4 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                            >
                                <Trash2Icon aria-hidden="true" />
                                Cancel
                            </Button>

                            <Button
                                nativeButton={false}
                                render={<Link href={`/destinations/${booking._id}`} />}
                                size="lg"
                                className="bg-cyan-600 px-4 text-white hover:bg-cyan-700"
                            >
                                <EyeIcon aria-hidden="true" />
                                View
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BookingListItem
