import Image from "next/image"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"

const reasons = [
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    icon: "/assets/ShieldCheck.png",
  },
  {
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
    icon: "/assets/MapTrifold.png",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    icon: "/assets/Headset.png",
  },
] as const

// The Card component derives its padding from --card-spacing, so overriding the
// token keeps every edge at the same rhythm instead of fighting individual px/py utilities.
const cardPadding = { "--card-spacing": "1.75rem" } as React.CSSProperties

export function WhyChooseUs() {
  return (
    <section id="why-wanderlast" className="bg-accent">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Why Choose Wanderlast
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <Card
              key={reason.title}
              style={cardPadding}
              className="shadow-[0_2px_16px_rgba(13,94,120,0.07)] ring-0 transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(13,94,120,0.13)]"
            >
              <CardContent className="flex flex-col">
                <Image
                  src={reason.icon}
                  width={48}
                  height={48}
                  alt=""
                  aria-hidden="true"
                  className="size-9 w-fit"
                />
                <h3 className="font-heading mt-7 text-xl font-semibold text-foreground sm:text-2xl">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
