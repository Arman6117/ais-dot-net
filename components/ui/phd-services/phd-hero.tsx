"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

// Refined particles - fewer, more elegant
const PARTICLES = Array.from({ length: 45 }, (_, i) => ({
  x: ((i * 131.071) % 100),
  y: ((i * 89.367) % 100),
  s: i % 5 === 0 ? 1.2 : i % 3 === 0 ? 0.8 : 0.5,
  o: i % 4 === 0 ? 0.35 : i % 2 === 0 ? 0.25 : 0.15,
}));

export default function PhdHero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(accentLineRef.current,
        { width: 0 }, { width: 32, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .fromTo(line1Ref.current,
        { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
      .fromTo(line2Ref.current,
        { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .fromTo(subRef.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(badgesRef.current,
        { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
  }, []);

  return (
    <section className={`${instrumentSerif.variable} relative min-h-[100vh] flex flex-col justify-center px-5 sm:px-8 lg:px-[52px] py-20 overflow-hidden`}>

      {/* ══ BACKGROUND - Balanced, not too dark ═══════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Base gradient - rich but not overwhelming */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0f1123 0%, #1a1a3e 50%, #0f1123 100%)" }} />

        {/* Warm subtle glow - center */}
        <div className="absolute rounded-full"
          style={{
            width: 600, height: 500,
            top: "30%", left: "25%",
            background: "radial-gradient(circle, #1A56DB20, transparent)",
            filter: "blur(90px)",
          }} />

        {/* Soft accent glow - right side */}
        <div className="absolute rounded-full"
          style={{
            width: 500, height: 400,
            bottom: "10%", right: "5%",
            background: "radial-gradient(circle, #6366f120, transparent)",
            filter: "blur(80px)",
          }} />

        {/* Refined grid - more subtle */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="phd-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#8b9dc3" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#phd-grid)" />
        </svg>

        {/* Elegant particles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {PARTICLES.map((p, i) => (
            <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.s} fill="#a5c9ff" opacity={p.o} />
          ))}
        </svg>

        {/* Diagonal accent lines - adds movement */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="80" stroke="#ffffff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>

        {/* Soft vignette - not too harsh */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(15,17,35,0.6) 100%)" }} />

        {/* Top fade for navbar transition */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0f1123] to-transparent" />

      </div>
      {/* ══ END BACKGROUND ════════════════════════════════════════ */}

      {/* ══ CONTENT - Cleaner typography ══════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">

        {/* Eyebrow with animated accent */}
        <div className="flex items-center gap-3 mb-8">
          <div 
            ref={accentLineRef}
            className="h-[2px] bg-[#1A56DB] rounded-full"
            style={{ width: 0 }}
          />
          <div ref={eyebrowRef} className="opacity-0 flex items-center gap-2">
            <span className="text-[0.55rem] font-bold tracking-[0.22em] uppercase text-[#1A56DB] bg-[#1A56DB]/10 px-3 py-1 rounded-full">
              PHD SERVICES
            </span>
          </div>
        </div>

        {/* Main heading with better spacing */}
        <div className="space-y-2 mb-8">
          <div className="overflow-hidden">
            <div ref={line1Ref} className="opacity-0">
              <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3.2rem,7vw,6rem)] leading-[1.05] tracking-[-0.02em] text-white">
                Every word,
              </h1>
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={line2Ref} className="opacity-0">
              <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3.2rem,7vw,6rem)] leading-[1.05] tracking-[-0.02em] bg-gradient-to-r from-[#1A56DB] to-[#6366f1] bg-clip-text text-transparent">
                perfectly crafted.
              </h1>
            </div>
          </div>
        </div>

        {/* Description - improved readability */}
        <div ref={subRef} className="opacity-0 max-w-xl mb-10">
          <p className="text-[0.9rem] md:text-[1rem] text-white/45 leading-[1.75] tracking-wide">
            From your first thesis draft to your final journal publication — we provide expert academic writing services that meet the highest scholarly standards.
          </p>
        </div>

        {/* Badges - refined styling */}
        <div ref={badgesRef} className="opacity-0 flex flex-wrap gap-3">
          <span className="px-4 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wide text-white/60 bg-white/5 border border-white/10 backdrop-blur-sm">
            9 Services
          </span>
          <span className="px-4 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wide text-white/60 bg-white/5 border border-white/10 backdrop-blur-sm">
            500+ Scholars Guided
          </span>
          <span className="px-4 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wide text-white/60 bg-white/5 border border-white/10 backdrop-blur-sm">
            Scopus Publications
          </span>
          <span className="px-4 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wide text-white/60 bg-white/5 border border-white/10 backdrop-blur-sm">
            Expert Writers
          </span>
        </div>

        {/* Subtle decorative element at bottom */}
        <div className="mt-16 flex items-center gap-4 opacity-30">
          <div className="w-12 h-px bg-gradient-to-r from-[#1A56DB] to-transparent" />
          <span className="text-[0.55rem] tracking-[0.2em] uppercase text-white/30">Academic Excellence</span>
        </div>

      </div>
      {/* ══ END CONTENT ══════════════════════════════════════════ */}

      {/* Smooth bottom transition */}

    </section>
  );
}