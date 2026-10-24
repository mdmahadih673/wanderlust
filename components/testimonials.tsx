"use client"

import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
  {
    quote:
      "We booked Peru on three weeks' notice and every transfer, permit and hotel was already sorted. Genuinely the least stressed I have been on a trip.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    quote:
      "Round-the-clock support that actually answers. A flight got cancelled and they had us rebooked before we reached the gate. Worth every penny.",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
] as const

export function Testimonials() {
  return (
    <section id="reviews" className="bg-background">
      <Carousel
        opts={{ align: "start", loop: false }}
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24"
      >
        {/* Header + controls */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CarouselPrevious
              size="icon-lg"
              className="static size-9 border-border"
            />
            <CarouselNext
              size="icon-lg"
              className="static size-9 border-border"
            />
          </div>
        </div>

        <CarouselContent className="mt-10">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={`${testimonial.name}-${index}`}
              className="basis-full md:basis-1/2"
            >
              <figure className="flex h-full flex-col gap-6 border border-border bg-card p-6 sm:p-7">
                <blockquote className="text-pretty text-base leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-auto flex items-end justify-between gap-6 pt-6">
                  <div>
                    <div className="font-medium text-primary">
                      &mdash; {testimonial.name}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>

                  <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-lg sm:h-48 sm:w-44">
                    <Image
                      src={testimonial.image}
                      fill
                      sizes="(max-width: 640px) 144px, 176px"
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  </div>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
