"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instrument_Serif } from "next/font/google";
import { Eye, Target } from "lucide-react";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

// Orbital dots data
const orbitals = [
  { r: 80,  angle: 60,  size: 10, delay: 0 },
  { r: 80,  angle: 220, size:  7, delay: 1 },
  { r: 140, angle: 30,  size: 12, delay: 0.5 },
  { r: 140, angle: 200, size:  8, delay: 1.5 },
  { r: 200, angle: 90,  size: 10, delay: 0.8 },
  { r: 200, angle: 270, size:  7, delay: 2 },
];

export default function MissionVision() {
  const sectionRef  = useRef<HTMLElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const dot1Refs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Entrance
    gsap.fromTo([orbitRef.current, textRef.current],
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.2,
        scrollTrigger: { id: "mv-entrance", trigger: sectionRef.current, start: "top 75%" },
      }
    );

    // Orbit rotation — each ring spins at different speed
    const rings = orbitRef.current?.querySelectorAll(".orbit-ring");
    rings?.forEach((ring, i) => {
      gsap.to(ring, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 18 + i * 6,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    });

    // Dots pulse
    dot1Refs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        scale: 1.4,
        opacity: 0.5,
        duration: 1.2 + i * 0.3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: orbitals[i].delay,
      });
    });

    return () => {
      ScrollTrigger.getById("mv-entrance")?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden`}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[400px] h-[400px] blur-[120px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left: Orbital diagram ── */}
        <div ref={orbitRef} className="opacity-0 flex items-center justify-center">
          <div className="relative w-[420px] h-[420px] shrink-0">

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full z-10 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1A56DB, #3b7de8)",
                boxShadow: "0 0 0 8px rgba(26,86,219,0.1), 0 0 0 16px rgba(26,86,219,0.05)",
              }}>
              <div className="w-3 h-3 rounded-full bg-white opacity-80" />
            </div>

            {/* Orbit rings */}
            {[80, 140, 200].map((r, i) => (
              <div key={r}
                className="orbit-ring absolute top-1/2 left-1/2 rounded-full border border-[#1A56DB]/15"
                style={{
                  width: r * 2,
                  height: r * 2,
                  marginLeft: -r,
                  marginTop: -r,
                }}
              >
                {/* Dots on this ring */}
                {orbitals.filter(o => o.r === r).map((o, j) => {
                  const idx = orbitals.indexOf(o);
                  const rad = (o.angle * Math.PI) / 180;
                  const x   = Math.round((r + r * Math.cos(rad) - o.size / 2) * 100) / 100;
                  const y   = Math.round((r + r * Math.sin(rad) - o.size / 2) * 100) / 100;
                  return (
                    <div
                      key={j}
                      ref={el => { dot1Refs.current[idx] = el; }}
                      className="absolute rounded-full" suppressHydrationWarning
                      style={{
                        width: o.size,
                        height: o.size,
                        left: x,
                        top: y,
                        background: `linear-gradient(135deg, #1A56DB, #3b7de8)`,
                        boxShadow: "0 0 8px rgba(26,86,219,0.5)",
                      }}
                    />
                  );
                })}
              </div>
            ))}

            {/* Floating person avatars */}
            {[
              { top: "8%",  left: "42%", label: "Scholar"  },
              { top: "25%", left: "72%", label: "Business" },
              { top: "55%", left: "5%",  label: "Research" },
              { top: "72%", left: "50%", label: "Partner"  },
            ].map(({ top, left, label }) => (
              <div key={label}
                className="absolute flex flex-col items-center gap-1 z-10"
                style={{ top, left }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[0.6rem] font-bold"
                  style={{
                    background: "linear-gradient(135deg, #e8eef8, #d0ddf5)",
                    border: "2px solid rgba(26,86,219,0.2)",
                    boxShadow: "0 4px 16px rgba(26,86,219,0.12)",
                    color: "#1A56DB",
                    fontSize: "0.55rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}>
                  {label.slice(0, 3).toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Vision + Mission text ── */}
        <div ref={textRef} className="opacity-0 flex flex-col gap-12">

          {/* Vision */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.15)" }}>
                <Eye size={18} strokeWidth={1.5} className="text-[#1A56DB]" />
              </div>
              <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2rem,3.5vw,3rem)] leading-[1] tracking-[-0.02em] text-[#111]">
                Our Vision
              </h2>
            </div>
            <div className="w-10 h-[2px] bg-[#1A56DB] opacity-40" />
            <p className="text-[0.88rem] text-black/55 leading-[1.85]">
              <span className="font-bold text-[#1A56DB]">Our Vision</span> is to be a leading partner for corporates and scholars alike, empowering innovation, growth, and academic excellence through data-driven insights, strategic research, and comprehensive support.
            </p>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-black/[0.06]" />

          {/* Mission */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.15)" }}>
                <Target size={18} strokeWidth={1.5} className="text-[#1A56DB]" />
              </div>
              <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2rem,3.5vw,3rem)] leading-[1] tracking-[-0.02em] text-[#111]">
                Our Mission
              </h2>
            </div>
            <div className="w-10 h-[2px] bg-[#1A56DB] opacity-40" />
            <p className="text-[0.88rem] text-black/55 leading-[1.85]">
              <span className="font-bold text-[#1A56DB]">Our Mission</span> is to deliver data-driven insights and strategic research support to businesses, ensuring they stay ahead in their industries. Simultaneously, we provide research scholars with comprehensive guidance, offering structured outlines and expert document reviews to facilitate their academic success.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}