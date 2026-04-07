"use client";
import { Instrument_Serif } from "next/font/google";
import { serviceGroups } from "@/data/services";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "./service-card";
import Eyebrow from "@/components/eyebrow";

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
      className={`${instrumentSerif.variable} relative z-1 px-5 sm:px-8 lg:px-13 py-24 bg-gradient-to-b from-white to-gray-50`}
    >
      {/* Section header */}
      <div className="mb-16 text-center">
        <div className="flex items-center justify-center gap-2.25 mb-3">
          <Eyebrow>  What We Do</Eyebrow>
          <div className="w-5.5 h-[1.5px] bg-[#1A56DB]" />
        </div>
        <h2 className="font-serif italic text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.1] tracking-[-0.02em] text-[#111]">
          PhD Services
        </h2>
        <p className="text-[0.75rem] text-gray-500 mt-3 tracking-[0.02em]">
          Click on any card to explore what's included
        </p>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-20 max-w-7xl mx-auto">
        {serviceGroups.map((group, index) => (
          <div
            key={group.id}
            ref={(el) => { groupRefs.current[group.id - 1] = el; }}
          >
            <div className="mb-8">
              <p className="text-[0.7rem] font-bold tracking-[0.22em] uppercase text-[#1A56DB] mb-2">
                {String(group.id).padStart(2, "0")} — {group.category}
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#1A56DB] to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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