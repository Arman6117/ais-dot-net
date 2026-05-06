"use client";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Lightbulb, BadgeCheck, ShieldOff } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Eyebrow from "@/components/eyebrow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const dotPattern = (color: string) =>
  `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`;

const reasons = [
  {
    icon: Star,
    title: "Versatility Across Topics",
    description: "From humanities to cutting-edge sciences, our expertise spans across diverse academic disciplines, ensuring comprehensive support for any research domain you're working in.",
    accent: "#1A56DB",
    bg: "linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #1A56DB18 0%, transparent 70%)",
  },
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    description: "We bring innovative thinking and creative problem-solving to every project, transforming complex ideas into clear, impactful academic work that stands out.",
    accent: "#4ade80",
    bg: "linear-gradient(135deg, #0d1f18 0%, #0d3b2e 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #4ade8018 0%, transparent 70%)",
  },
  {
    icon: BadgeCheck,
    title: "Professional Standards",
    description: "Our work adheres to the highest academic and professional standards, with rigorous quality checks, proper citations, and adherence to journal guidelines.",
    accent: "#a78bfa",
    bg: "linear-gradient(135deg, #12102e 0%, #1e1b4b 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #a78bfa18 0%, transparent 70%)",
  },
  {
    icon: ShieldOff,
    title: "Confidentiality",
    description: "Your research and personal data are protected with strict confidentiality protocols. We ensure your work remains secure and private throughout our engagement.",
    accent: "#fb923c",
    bg: "linear-gradient(135deg, #2a0e04 0%, #431407 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #fb923c18 0%, transparent 70%)",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const plugin = useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    []
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          id: "why-header",
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getById("why-header")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden`}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }}
      />

      {/* Header */}
      <div
        ref={headerRef}
        className="opacity-0 mb-16 max-w-[680px]"
      >
        <div className="flex items-center gap-[9px] mb-4">
          <Eyebrow>Why AIS Solutions</Eyebrow>
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        </div>
        <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-[#111] mb-5">
          Why Choose Us
        </h2>
        <p className="text-[0.88rem] text-black/50 leading-[1.85] max-w-[560px]">
          Choose us for expert-driven, tailored solutions that ensure precision,
          quality, and timely delivery in all your academic and publication
          needs.
        </p>
      </div>

      {/* Carousel - 1 slide at a time */}
      <Carousel
        plugins={[plugin]}
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent>
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <CarouselItem key={reason.title} className="basis-full">
                <div className="relative w-full h-[70vh] min-h-[500px] rounded-[24px] overflow-hidden group/slide"
                  style={{
                    background: reason.bg,
                    boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Dot pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{ backgroundImage: dotPattern(reason.accent), backgroundSize: "20px 20px" }}
                  />

                  {/* Gradient mesh */}
                  <div className="absolute inset-0" style={{ background: reason.mesh }} />

                  {/* Grain texture */}
                  <div
                    className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "128px 128px",
                    }}
                  />

                  {/* Top border accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${reason.accent}60, ${reason.accent}, ${reason.accent}60, transparent)` }}
                  />

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div 
                      className="h-[3px] w-full origin-left"
                      style={{
                        background: `linear-gradient(90deg, ${reason.accent}, ${reason.accent}40)`,
                        animation: "progressBar 4000ms linear infinite",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center p-10 sm:p-14 lg:p-20">
                    <div className="max-w-[600px]">
                      {/* Accent line */}
                      <div 
                        className="w-12 h-[2px] rounded-full mb-8"
                        style={{ background: reason.accent }}
                      />

                      {/* Icon */}
                      <div
                        className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-8"
                        style={{
                          background: `${reason.accent}18`,
                          border: `1px solid ${reason.accent}35`,
                          boxShadow: `0 0 30px ${reason.accent}20`,
                        }}
                      >
                        <Icon size={36} strokeWidth={1.4} style={{ color: reason.accent }} />
                      </div>

                      {/* Title */}
                      <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.02em] text-white mb-6">
                        {reason.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[1rem] sm:text-[1.1rem] leading-[1.8] text-white/50 max-w-[520px]">
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${reason.accent}08, transparent)`,
                    }}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-[0.75rem] text-black/40 leading-relaxed">
            Auto-plays · drag or use arrows
          </p>
          <div className="flex items-center gap-3">
            <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border border-black/[0.1] bg-transparent hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-200" />
            <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border border-black/[0.1] bg-transparent hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-200" />
          </div>
        </div>
      </Carousel>

      <style jsx>{`
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}