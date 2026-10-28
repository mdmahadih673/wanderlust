// "use client"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// Reads cookies via headers() and fetches live data, so Next must not prerender it.
export const instant = false

const BookingsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });
    const user = session?.user

    const res = await fetch(`http://localhost:5000/my-booking/${user?.email}`)
    const data = await res.json()
    console.log(data);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            
        </div>
    )
}

export default BookingsPage
