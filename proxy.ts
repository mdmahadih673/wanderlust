import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { auth } from "@/lib/auth"


export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /destinations listing is public — only the [id] details page needs auth.
  const isBookings = pathname === "/bookings" || pathname.startsWith("/bookings/")
  const isDetails = pathname.startsWith("/destinations/") && pathname !== "/destinations/"
  const isAdd = pathname === "/add-Destinations" || pathname.startsWith("/add-Destinations/")

  if (!isBookings && !isDetails && !isAdd) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({ headers: await request.headers })

  if (session?.user) {
    return NextResponse.next()
  }

  // No session → send the guest to sign in.
  return NextResponse.redirect(new URL("/signIn", request.url))
}

export const config = {
  matcher: ["/bookings/:path*", "/destinations/:path*", "/add-Destinations/:path*"],
}
