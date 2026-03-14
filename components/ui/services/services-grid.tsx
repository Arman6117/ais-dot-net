"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import ServiceCard from "./services-card";
import gsap from "gsap";


export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          id: "services-grid-trigger",
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => ScrollTrigger.getById("services-grid-trigger")?.kill();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24">

      {/* Header */}
      <div className="flex items-center gap-[9px] mb-4">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
          All Services
        </span>
      </div>
      <div className="flex items-end justify-between mb-14">
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111]">
          Click a service to explore
        </h2>
        <p className="hidden sm:block text-[0.75rem] text-black/35 max-w-[180px] text-right leading-relaxed">
          Each card expands with full details
        </p>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}