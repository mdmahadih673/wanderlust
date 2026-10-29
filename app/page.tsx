import { Banner } from "@/components/home/banner";
import { FeaturedDestinations } from "@/components/home/featured-destinations";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";
import type { Destination } from "@/components/Destinations/destinations-grid";

// Live data from the backend on every request, so Next must not prerender it.
export const instant = false;

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch("http://localhost:5000/destinations");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    // Backend offline — render the homepage without the featured carousel.
    return [];
  }
}

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <>
      <Banner />
      <FeaturedDestinations destinations={destinations} />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </>
  );
}
