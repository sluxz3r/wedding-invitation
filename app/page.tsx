import { Hero } from "@/app/_components/sections/Hero";
import { EventDetails } from "@/app/_components/sections/EventDetails";
import { NgunduhMantu } from "@/app/_components/sections/NgunduhMantu";
import { Countdown } from "@/app/_components/sections/Countdown";
import { Ucapan } from "@/app/_components/sections/Ucapan";
import { Registry } from "@/app/_components/sections/Registry";
import { Footer } from "@/app/_components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <EventDetails />
      <NgunduhMantu />
      <Countdown />
      <Ucapan />
      <Registry />
      <Footer />
    </>
  );
}
