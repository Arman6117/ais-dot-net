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
import { useMemo } from "react";
import ServiceSlide from "./service-slide";
import Eyebrow from "@/components/eyebrow";

export default function OtherServicesSection() {
  const plugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    []
  );

  return (
    <section className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-[9px] mb-3">
            <Eyebrow>Beyond PhD</Eyebrow>
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
        plugins={[plugin]}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {otherServices.map((service) => (
            <CarouselItem key={service.id} className="pl-0 rounded-[24px]">
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
