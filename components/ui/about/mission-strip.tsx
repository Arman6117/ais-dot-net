"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function MissionStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { id: "mission-trigger", trigger: sectionRef.current, start: "top 75%" },
      }
    );
    return () => ScrollTrigger.getById("mission-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative bg-[#0a0a18] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden`}
    >
      {/* Top sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,86,219,0.5), transparent)" }} />

      {/* Blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      <div ref={textRef} className="opacity-0 max-w-[900px]">
        <div className="flex items-center gap-[9px] mb-8">
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            Our Mission
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.03em] text-white mb-8">
          Empowering every scholar,<br />
          every business, every idea —<br />
          <span className="text-[#1A56DB]">with the right data partner.</span>
        </h2>

        <p className="text-[0.9rem] text-white/40 leading-[1.8] max-w-[560px]">
          We believe that behind every research paper, every business decision, and every data challenge is a person who deserves precision, clarity, and support. That's why AIS Solutions exists.
        </p>
      </div>
    </section>
  );
}