"use client"
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
    type Destination,
} from "@/components/Destinations/destinations-grid"
import { useSession } from '@/lib/auth-client';
import { toast } from "@/components/ui/toast";

const API = "http://localhost:5000"

const BookingCard = ({ data, }: { data: Destination; }) => {
    const { data: session, } = useSession()

    const user = session?.user

    // One active booking per account per destination — if this user already
    // booked this destination, the Book Now button is disabled.
    const [alreadyBooked, setAlreadyBooked] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        const email = user?.email
        let active = true

        if (!email) {
            // Defer the reset so we don't set state synchronously in the effect body.
            Promise.resolve().then(() => {
                if (active) setAlreadyBooked(false)
            })
            return () => {
                active = false
            }
        }

        fetch(`${API}/my-booking/${encodeURIComponent(email)}`)
            .then((res) => (res.ok ? res.json() : []))
            .then((bookings) => {
                if (active && Array.isArray(bookings)) {
                    setAlreadyBooked(
                        bookings.some(
                            (b: { destinationId?: string; status?: string }) =>
                                b.destinationId === data._id && b.status !== "Cancelled",
                        ),
                    )
                }
            })
            .catch(() => {
                /* leave the button enabled if the check fails */
            })

        return () => {
            active = false
        }
    }, [user?.email, data._id])

    const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (alreadyBooked || submitting) {
            toast.add({
                type: "info",
                title: "Already booked",
                description: `You've already booked this destination. Cancel it from My Bookings to rebook.`,
            })
            return
        }

        const departureDate = new FormData(e.currentTarget).get("departureDate")

        const result = {
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...data,
            departureDate: departureDate,

        }

        setSubmitting(true)
        const toastId = toast.add({
            type: "loading",
            title: "Booking your trip…",
            timeout: 0,
        })

        try {
            const res = await fetch(`${API}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            })

            // res.json() would choke on Express's HTML error page — check first.
            if (res.status === 409) {
                setAlreadyBooked(true)
                toast.add({
                    type: "warning",
                    title: "Already booked",
                    description: "You've already booked this destination. Cancel it from My Bookings to rebook.",
                })
                return
            }

            if (!res.ok) {
                console.error("Booking failed:", res.status, await res.text())
                toast.add({
                    type: "error",
                    title: "Booking failed",
                    description: "Something went wrong while booking. Please try again.",
                })
                return
            }

            const booking = await res.json()
            console.log(booking);

            setAlreadyBooked(true)
            toast.add({
                type: "success",
                title: "Booking confirmed!",
                description: `${data.name} has been added to My Bookings.`,
            })
        } catch (err) {
            console.error("Booking failed:", err)
            toast.add({
                type: "error",
                title: "Booking failed",
                description: "Something went wrong while booking. Please try again.",
            })
        } finally {
            setSubmitting(false)
            toast.update(toastId, { timeout: 1 })
        }
    }


    return (
        <aside>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
                <p className="text-sm text-gray-500">Starting from</p>

                <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight text-cyan-600">
                        ${Number(data.price).toLocaleString("en-US")}
                    </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">per person</p>

                <div className="mt-6 space-y-4">
                    <div className="rounded-lg border border-gray-200 p-3">
                        <label className="mb-1 block text-xs text-gray-500">
                            Trip Duration
                        </label>

                        <p className="text-sm font-medium text-gray-800">
                            {data.duration}
                        </p>
                    </div>

                    <form onSubmit={handleBooking}>

                        <div className="rounded-lg border border-gray-200 p-3">
                            <label className="mb-1 block text-xs text-gray-500">
                                Departure Date
                            </label>
                            <input
                                name='departureDate'
                                type="date"
                                aria-label='Departure Date'
                                defaultValue={data.departureDate} />

                        </div>

                        <button
                            type="submit"
                            disabled={alreadyBooked || submitting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300"
                        >
                            {alreadyBooked ? "Already Booked" : submitting ? "Booking…" : "Book Now"}
                            <ArrowRight size={17} />
                        </button>

                    </form>



                </div>

                {alreadyBooked && (
                    <p className="mt-3 text-center text-xs text-amber-600">
                        You&apos;ve already booked this trip. Cancel it from My Bookings to rebook.
                    </p>
                )}

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                    {[
                        "Free cancellation up to 7 days",
                        "Travel assistance included",
                        "24/7 customer support",
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-xs text-gray-500"
                        >
                            <Check size={14} className="shrink-0 text-green-600" />
                            {benefit}
                        </div>
                    ))}
                </div>

                <div className="mt-5 rounded-lg bg-cyan-50 p-3">
                    <p className="text-xs leading-5 text-cyan-800">
                        Ready for your next adventure? Reserve your trip and start
                        planning your journey.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default BookingCard;
