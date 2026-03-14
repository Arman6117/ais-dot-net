"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function ServicesHero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(line1Ref.current,
        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .fromTo(line2Ref.current,
        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(subRef.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3");
  }, []);

  return (
    <section className={`${instrumentSerif.variable} relative min-h-[65vh] flex flex-col justify-end px-5 sm:px-8 lg:px-[52px] pb-20 pt-40 overflow-hidden`}>
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] blur-[120px] opacity-[0.07] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      {/* Eyebrow */}
      <div ref={eyebrowRef} className="flex items-center gap-[9px] mb-6 opacity-0">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
          What We Do
        </span>
      </div>

      {/* Headline */}
      <div className="overflow-hidden mb-2">
        <div ref={line1Ref} className="opacity-0">
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] text-[#111]">
            Services built
          </h1>
        </div>
      </div>
      <div className="overflow-hidden mb-8">
        <div ref={line2Ref} className="opacity-0">
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] text-[#1A56DB]">
            specifically for you.
          </h1>
        </div>
      </div>

      {/* Sub + badge row */}
      <div className="flex flex-wrap items-end gap-6">
        <div ref={subRef} className="opacity-0 max-w-[480px]">
          <p className="text-[0.9rem] text-black/50 leading-[1.8]">
            From raw data to published research — we cover every step of the journey with precision, care, and expertise.
          </p>
        </div>
        <div ref={badgeRef} className="opacity-0">
          <div
            className="px-5 py-2.5 rounded-full text-[0.72rem] font-bold tracking-[0.06em] text-[#1A56DB]"
            style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.2)" }}
          >
            8 Services Available
          </div>
        </div>
      </div>
    </section>
  );
}