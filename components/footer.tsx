import { cn } from "@/lib/utils"
import { NewsletterForm } from "@/components/newsletter-form"

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "Destinations", href: "/destinations" },
  { title: "My Bookings", href: "/bookings" },
  { title: "My Profile", href: "/profile" },
] as const

const supportLinks = [
  { title: "Help Center", href: "#" },
  { title: "Terms of Service", href: "#" },
  { title: "Privacy Policy", href: "#" },
] as const

const contactLinks = [
  { title: "786 901 1622", href: "tel:7869011622" },
  { title: "info@wanderlast.com", href: "mailto:info@wanderlast.com" },
] as const

// Lucide no longer ships brand marks, so the social glyphs are inlined.
type Social = {
  label: string
  href: string
  path: string
  /** Instagram is an outline glyph; the others are solid marks. */
  outlined?: boolean
}

const socials: Social[] = [
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z",
  },
  {
    label: "Instagram",
    href: "#",
    outlined: true,
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37ZM17.5 6.5h.01M22 11.59A10 10 0 0 0 12.41 2",
  },
]

const linkClass =
  "text-sm text-neutral-400 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"

// `cacheComponents` blocks bare `new Date()` during prerender, so the year is
// read inside a cached function — it resolves once at build time.
async function getCopyrightYear(): Promise<number> {
  "use cache"
  return new Date().getFullYear()
}

export async function Footer() {
  const year = await getCopyrightYear()

  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Brand */}
        <a
          href="/"
          className="font-heading inline-block text-4xl leading-none font-bold tracking-tight text-white transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none sm:text-5xl lg:text-6xl"
        >
          Wanderlast
        </a>
        <p className="mt-4 max-w-md text-sm text-neutral-400 sm:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-medium tracking-wider text-neutral-100 uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <NewsletterForm />
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-medium tracking-wider text-neutral-100 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={linkClass}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support">
            <h3 className="text-sm font-medium tracking-wider text-neutral-100 uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={linkClass}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-wider text-neutral-100 uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              {contactLinks.map((link) => (
                <li key={link.title}>
                  <a href={link.href} className={linkClass}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-neutral-800 pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-400">
              © {year} Wanderlast. All rights reserved.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    linkClass,
                    "flex size-9 items-center justify-center rounded-full hover:bg-neutral-800"
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={cn(
                      "size-4",
                      social.outlined
                        ? "fill-none stroke-current stroke-2"
                        : "fill-current"
                    )}
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
