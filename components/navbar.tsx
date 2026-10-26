"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { LogOutIcon, MenuIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { signOut, useSession } from "@/lib/auth-client"
import Link from "next/link"

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Destinations", href: "/destinations" },
  { title: "My Bookings", href: "/bookings" },
  { title: "Add Destinations", href: "/add-Destinations" },
] as const

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [signingOut, setSigningOut] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const user = session?.user
  const signedIn = !!user

  // "/" must match exactly; every other link also matches nested routes.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } finally {
      setSigningOut(false)
      setOpen(false)
    }
  }

  // Account area while the session is still resolving — keeps layout stable.
  const pendingAccount = (
    <span className="inline-flex size-7 items-center justify-center" aria-hidden="true">
      <Spinner className="text-muted-foreground" />
    </span>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        {/* Left — primary navigation */}
        <nav
          className="hidden items-center justify-start gap-6 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${isActive(link.href)
                  ? "text-primary underline decoration-primary decoration-2 underline-offset-8"
                  : "text-muted-foreground underline-offset-8 hover:text-primary hover:underline decoration-transparent hover:decoration-primary/40"
                }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Mobile — hamburger */}
        <div className="flex justify-start lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>

            <SheetContent side="left" className="gap-0">
              <SheetHeader className="border-b">
                <SheetTitle>Wanderlast</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.title}
                    render={<a href={link.href} />}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                  >
                    {link.title}
                  </SheetClose>
                ))}

                <div className="mt-4 flex flex-col gap-1 border-t pt-4">
                  {isPending ? (
                    <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground">
                      <Spinner /> Loading account…
                    </div>
                  ) : signedIn ? (
                    <>
                      <SheetClose
                        render={<Link href="/profile" />}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <UserIcon className="size-4" aria-hidden="true" />
                        Profile
                      </SheetClose>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-60"
                      >
                        {signingOut ? (
                          <Spinner />
                        ) : (
                          <LogOutIcon className="size-4" aria-hidden="true" />
                        )}
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <SheetClose
                        render={<a href="/signIn" />}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        Login
                      </SheetClose>
                      <SheetClose
                        render={<a href="/signUp" />}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        Sign Up
                      </SheetClose>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center — wordmark */}
        <Link
          href="/"
          className="justify-self-center font-heading text-2xl leading-none font-bold tracking-tight text-primary transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:text-3xl"
        >
          Wanderlast
        </Link>

        {/* Right — account: signed in → Profile + Sign Out, otherwise Login + Sign Up */}
        <nav
          className="hidden items-center justify-end gap-5 lg:flex"
          aria-label="Account"
        >
          {isPending ? (
            pendingAccount
          ) : signedIn ? (
            <>
              <Link
                href="/profile"
                aria-current={isActive("/profile") ? "page" : undefined}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <Avatar size="sm">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback>{initials(user.name)}</AvatarFallback>
                </Avatar>
                Profile
              </Link>
              <Button
                variant="outline"
                size="sm"
                disabled={signingOut}
                onClick={handleSignOut}
              >
                {signingOut ? <Spinner /> : <LogOutIcon className="size-4" aria-hidden="true" />}
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <a
                href="/signIn"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Login
              </a>
              <Button
                size="sm"
                className="h-8"
                nativeButton={false}
                render={<Link href="/signUp" />}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>

        {/* Mobile — account action mirrors the desktop state */}
        <div className="flex justify-end lg:hidden">
          {isPending ? (
            pendingAccount
          ) : signedIn ? (
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              disabled={signingOut}
              onClick={handleSignOut}
            >
              {signingOut ? <Spinner /> : <LogOutIcon className="size-4" aria-hidden="true" />}
              Sign Out
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-8"
              nativeButton={false}
              render={<Link href="/signUp" />}
            >
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
