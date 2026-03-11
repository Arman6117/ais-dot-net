"use client";
import { Instrument_Serif } from "next/font/google";
import { serviceGroups } from "@/data/services";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./service-card";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});



export default function ServicesSection() {
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    groupRefs.current.forEach((group) => {
      if (!group) return;
      const cards = group.querySelectorAll(".service-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="services"
      className={`${instrumentSerif.variable} relative z-1 px-5 sm:px-8 lg:px-13 py-24`}
    >
      {/* Section header */}
      <div className="mb-16">
        <div className="flex items-center gap-2.25 mb-3">
          <div className="w-5.5 h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            What We Do
          </span>
        </div>
        <h2 className="font-serif italic text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.1] tracking-[-0.02em] text-[#111]">
          PhD Services
        </h2>
        <p className="text-[0.65rem] text-black/40 mt-2 tracking-[0.04em]">
          Hover over a card to explore what&apos;s included
        </p>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-16">
        {serviceGroups.map((group) => (
          <div
            key={group.id}
            ref={(el) => { groupRefs.current[group.id - 1] = el; }}
          >
            <p className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-black/30 mb-6">
              {String(group.id).padStart(2, "0")} — {group.category}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}