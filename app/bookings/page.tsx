import type { Metadata } from "next"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

import { MyBookings } from "@/components/my-bookings"

// Reads cookies via headers() and fetches live data, so Next must not prerender it.
export const instant = false

export const metadata: Metadata = {
    title: "My Bookings",
    description: "Manage and view your upcoming travel plans.",
}

const BookingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });
    const user = session?.user

    const res = await fetch(`http://localhost:5000/my-booking/${user?.email}`)
    const data = await res.json()
    console.log(data);

    // Live bookings from the API; MyBookings falls back to its demo rows
    // while this list is empty. (Alternate card: components/bookings/booking-list-item.tsx)
    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <MyBookings data={data} />
        </div>
    )
}

export default BookingsPage
