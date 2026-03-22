"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { otherServices } from "@/data/services";
import Autoplay from "embla-carousel-autoplay";

import { useRef } from "react";
import ServiceSlide from "./service-slide";



// dot pattern as inline SVG data URI



export default function OtherServicesSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24">
      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(3deg); }
          66%       { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-[9px] mb-3">
            <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
            <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
              Beyond PhD
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,4vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111]">
            IT Services
          </h2>
        </div>
        <p className="hidden sm:block text-[0.75rem] text-black/40 max-w-[200px] text-right leading-relaxed">
          Auto-plays · drag or use arrows
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent >
          {otherServices.map((service) => (
            <CarouselItem key={service.id} className="overflow-hidden rounded-[24px]">
              <ServiceSlide service={service} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center gap-3 mt-6">
          <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border border-black/[0.1] bg-transparent hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-200" />
          <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border border-black/[0.1] bg-transparent hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-200" />
        </div>
      </Carousel>
    </section>
  );
}