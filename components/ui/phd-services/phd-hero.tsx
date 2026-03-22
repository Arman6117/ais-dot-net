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

export default function PhdHero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);

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
      .fromTo(badgesRef.current,
        { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
  }, []);

  return (
    <section className={`${instrumentSerif.variable} relative min-h-[65vh] flex flex-col justify-end px-5 sm:px-8 lg:px-[52px] pb-20 pt-40 overflow-hidden`}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      <div ref={eyebrowRef} className="flex items-center gap-[9px] mb-6 opacity-0">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
          PhD Services
        </span>
      </div>

      <div className="overflow-hidden mb-2">
        <div ref={line1Ref} className="opacity-0">
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] text-[#111]">
            Every word,
          </h1>
        </div>
      </div>
      <div className="overflow-hidden mb-8">
        <div ref={line2Ref} className="opacity-0">
          <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] text-[#1A56DB]">
            perfectly crafted.
          </h1>
        </div>
      </div>

      <div ref={subRef} className="opacity-0 max-w-[500px] mb-8">
        <p className="text-[0.9rem] text-black/50 leading-[1.8]">
          From your first thesis draft to your final journal publication — we provide expert academic writing services that meet the highest scholarly standards.
        </p>
      </div>

      <div ref={badgesRef} className="opacity-0 flex flex-wrap gap-3">
        {["9 Services", "500+ Scholars Guided", "Scopus Publications", "Expert Writers"].map((b) => (
          <div key={b}
            className="px-4 py-1.5 rounded-full text-[0.68rem] font-bold tracking-[0.05em] text-[#1A56DB]"
            style={{ background: "rgba(26,86,219,0.07)", border: "1px solid rgba(26,86,219,0.15)" }}
          >
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}