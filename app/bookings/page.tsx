import type { Metadata } from "next"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

import { MyBookings } from "@/components/my-bookings"
import { apiFetch } from "@/lib/api"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

    if (!user?.email) {
        return <div className="mx-auto w-full max-w-lg px-4 py-20 text-center"><h1 className="font-heading text-3xl font-bold">Sign in to view bookings</h1><p className="mt-3 text-muted-foreground">Your trip reservations are linked to your account.</p><Button className="mt-6" nativeButton={false} render={<Link href="/signIn" />}>Sign In</Button></div>
    }
    let data = []
    try {
        const res = await apiFetch(`/my-booking/${encodeURIComponent(user.email)}`)
        if (res.ok) {
            const result: unknown = await res.json()
            if (Array.isArray(result)) data = result
        }
    } catch {
        // Render an empty state during temporary API outages.
    }

    // Live bookings from the API; MyBookings falls back to its demo rows
    // while this list is empty. (Alternate card: components/bookings/booking-list-item.tsx)
    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <MyBookings data={data} />
        </div>
    )
}

export default BookingsPage
