"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { MenuIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Destinations", href: "/destinations" },
  { title: "My Bookings", href: "/bookings" },
  { title: "Add Destinations", href: "/add-Destinations" },
] as const

const authLinks = [
  { title: "Profile", href: "/profile", icon: true },
  { title: "Login", href: "/login", icon: false },
  { title: "Sign Up", href: "/signup", icon: false },
] as const

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // "/" must match exactly; every other link also matches nested routes.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        {/* Left — primary navigation */}
        <nav
          className="hidden items-center justify-start gap-6 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${
                isActive(link.href)
                  ? "text-primary underline decoration-primary decoration-2 underline-offset-8"
                  : "text-muted-foreground underline-offset-8 hover:text-primary hover:underline decoration-transparent hover:decoration-primary/40"
              }`}
            >
              {link.title}
            </a>
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
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.title}
                  </SheetClose>
                ))}

                <div className="mt-4 flex flex-col gap-1 border-t pt-4">
                  {authLinks.map((link) => (
                    <SheetClose
                      key={link.title}
                      render={<a href={link.href} />}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {link.title}
                    </SheetClose>
                  ))}
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

        {/* Right — account */}
        <nav
          className="hidden items-center justify-end gap-6 lg:flex"
          aria-label="Account"
        >
          {authLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.icon && <UserIcon className="size-4" aria-hidden="true" />}
              {link.title}
            </a>
          ))}
        </nav>

        {/* Mobile — sign up */}
        <div className="flex justify-end lg:hidden">
          <Button
            size="sm"
            className="h-8"
            nativeButton={false}
            render={<a href="/signup" />}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}
