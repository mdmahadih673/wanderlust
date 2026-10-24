import Image from "next/image"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { footerNav, siteConfig } from "@/lib/site"

const contactItems = [
  { icon: MailIcon, label: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
  { icon: PhoneIcon, label: siteConfig.links.phone, href: `tel:${siteConfig.links.phone.replace(/[^+\d]/g, "")}` },
  { icon: MapPinIcon, label: siteConfig.links.address, href: null },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/assets/Wanderlast-1.png"
              width={140}
              height={21}
              alt={siteConfig.name}
              className="h-[21px] w-auto invert dark:invert-0"
            />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {contactItems.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <Icon className="size-4 shrink-0 text-primary" />
                    <span>{label}</span>
                  </>
                )

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2.5 text-sm text-muted-foreground">
                        {content}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="mt-12" />

        <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent-warm"
            />
            Made for people who would rather be lost.
          </p>
        </div>
      </div>
    </footer>
  )
}
