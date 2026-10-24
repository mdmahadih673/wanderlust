"use client"

import Image from "next/image"
import * as React from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mainNav, siteConfig } from "@/lib/site"

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#content"
          className="flex shrink-0 items-center rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`${siteConfig.name} home`}
        >
          {/* The supplied logo is white-on-transparent, so invert it over light surfaces. */}
          <Image
            src="/assets/Wanderlast-1.png"
            width={130}
            height={19}
            priority
            alt={siteConfig.name}
            className="h-[19px] w-auto invert dark:invert-0"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            className="hidden sm:inline-flex"
            size="lg"
            render={<a href="#contact" />}
          >
            Plan your trip
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>

            <SheetContent side="right" className="gap-0">
              <SheetHeader className="border-b">
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Mobile navigation"
              >
                {mainNav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<a href={item.href} />}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    {item.title}
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto border-t p-4">
                <Button size="lg" className="w-full" render={<a href="#contact" />}>
                  Plan your trip
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
