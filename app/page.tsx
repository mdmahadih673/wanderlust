import { Banner } from "@/components/banner";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </>
  );
}
