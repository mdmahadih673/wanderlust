import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export function Cta() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-96 items-center overflow-hidden sm:min-h-112"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/CTA.png"
          fill
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="object-cover"
        />
        {/* Heavier at the edges so the headline keeps its contrast over the
            brighter middle of the photo. */}
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-4 text-pretty text-base text-white/80 sm:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="/destinations"
          className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-white px-8 text-sm font-semibold tracking-[0.06em] text-neutral-900 uppercase shadow-lg transition-colors hover:bg-white/90 focus-visible:ring-3 focus-visible:ring-white/70 focus-visible:outline-none"
        >
          Book Your Trip Today
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
