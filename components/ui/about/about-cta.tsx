"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "../transition-link";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { id: "about-cta-trigger", trigger: sectionRef.current, start: "top 80%" },
      }
    );
    return () => ScrollTrigger.getById("about-cta-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative bg-[#0a0a18] px-5 sm:px-8 lg:px-[52px] py-28 overflow-hidden`}
    >
      {/* Sheens */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,86,219,0.5), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,86,219,0.2), transparent)" }} />

      {/* Blue glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[300px] blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      <div ref={contentRef} className="opacity-0 max-w-[700px]">
        <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-white mb-6">
          Ready to start your<br />
          <span className="text-[#1A56DB]">research journey?</span>
        </h2>
        <p className="text-[0.9rem] text-white/40 leading-[1.8] mb-10 max-w-[480px]">
          Whether you're a PhD scholar, a business, or just getting started — we're here to help you every step of the way.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <TransitionLink
            href="/contact"
            className="group relative inline-flex items-center gap-[9px] px-6 py-3.5 bg-[#1A56DB] text-white text-[0.78rem] font-bold tracking-[0.04em] rounded-[8px] overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="relative">Get a Free Consultation</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </TransitionLink>
          <TransitionLink
            href="/services"
            className="inline-flex items-center gap-[9px] px-6 py-3.5 border border-white/10 text-white/60 text-[0.78rem] font-bold tracking-[0.04em] rounded-[8px] hover:border-white/30 hover:text-white transition-all duration-300"
          >
            View Services →
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}