"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Lightbulb, BadgeCheck, ShieldOff } from "lucide-react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const reasons = [
  {
    icon: Star,
    title: "Versatility Across Topics",
    accent: "#1A56DB",
  },
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    accent: "#4ade80",
  },
  {
    icon: BadgeCheck,
    title: "Professional Standards",
    accent: "#a78bfa",
  },
  {
    icon: ShieldOff,
    title: "Confidentiality",
    accent: "#fb923c",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { id: "why-header", trigger: sectionRef.current, start: "top 80%" },
      }
    );

    const cards = sectionRef.current?.querySelectorAll(".why-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          id: "why-cards",
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => {
      ScrollTrigger.getById("why-header")?.kill();
      ScrollTrigger.getById("why-cards")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden`}
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      {/* Header */}
      <div ref={headerRef} className="opacity-0 text-center mb-16 max-w-[680px] mx-auto">
        <div className="flex items-center justify-center gap-[9px] mb-4">
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            Why AIS Solutions
          </span>
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        </div>
        <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-[#111] mb-5">
          Why Choose Us
        </h2>
        <p className="text-[0.88rem] text-black/50 leading-[1.85]">
          Choose us for expert-driven, tailored solutions that ensure precision, quality, and timely delivery in all your academic and publication needs. Experience excellence that transforms your ideas into impactful results.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map(({ icon: Icon, title, accent }) => (
          <div
            key={title}
            className="why-card opacity-0 group relative rounded-[20px] p-8 flex flex-col items-center text-center gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
              style={{ background: `radial-gradient(ellipse at 50% 100%, ${accent}10, transparent 70%)` }}
            />

            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            />

            {/* Icon */}
            <div
              className="w-16 h-16 rounded-[18px] flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: `${accent}10`,
                border: `1px solid ${accent}20`,
                boxShadow: `0 4px 20px ${accent}15`,
              }}
            >
              <Icon size={28} strokeWidth={1.4} style={{ color: accent }} />
            </div>

            {/* Title */}
            <h3 className="text-[0.95rem] font-bold text-[#111] leading-[1.4]">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}