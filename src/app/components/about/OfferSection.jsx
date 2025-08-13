"use client";
import InteractiveCards from "./InteractiveCards";

export function OfferSection() {
  return (
    <section id='ofrecemos' className='relative z-10 pt-10 pb-32'>
      <h2 className='text-center text-2xl md:text-3xl font-semibold mb-10'>Qué ofrecemos</h2>
      <InteractiveCards />
    </section>
  );
}
