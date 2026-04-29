"use client";

import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif, Inter } from "next/font/google";
import React, { useEffect, useRef, useState, useCallback } from "react";
import OrbitDiagram from "./orbit-diagram";
import Link from "next/link";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const services = [
  { number: "01", title: "Thesis Writing",             description: "Comprehensive manuscript development with rigorous academic standards and structural integrity.",                                  accent: "from-blue-400 to-cyan-300",    glow: "rgba(59,130,246,0.15)"   },
  { number: "02", title: "Dissertation Writing",        description: "Specialized doctoral-level support focusing on original contribution and defense-ready depth.",                                  accent: "from-indigo-400 to-blue-400",  glow: "rgba(99,102,241,0.15)"   },
  { number: "03", title: "Research Paper Writing",      description: "Targeted research papers structured for peer-review success and high-impact factor journals.",                                   accent: "from-violet-400 to-purple-300",glow: "rgba(139,92,246,0.15)"   },
  { number: "04", title: "Article Writing",             description: "Clarity-driven scholarly articles designed for broader academic reach and citation growth.",                                     accent: "from-purple-400 to-pink-400",  glow: "rgba(168,85,247,0.15)"   },
  { number: "05", title: "Biography Writing",           description: "Professional academic and professional biographies highlighting scholarly impact and expertise.",                                 accent: "from-sky-400 to-blue-400",     glow: "rgba(14,165,233,0.15)"   },
  { number: "06", title: "Business Proposal Writing",   description: "Persuasive, data-backed business proposals that bridge academic rigor with corporate objectives.",                              accent: "from-cyan-400 to-teal-300",    glow: "rgba(34,211,238,0.15)"   },
  { number: "07", title: "Case Study Writing",          description: "In-depth qualitative and quantitative analysis of specific research phenomena and outcomes.",                                   accent: "from-teal-400 to-emerald-300", glow: "rgba(20,184,166,0.15)"   },
  { number: "08", title: "Book Publication",            description: "End-to-end support for academic monographs, from manuscript preparation to publisher acquisition.",                            accent: "from-blue-500 to-indigo-500",  glow: "rgba(59,130,246,0.15)"   },
  { number: "09", title: "Journal Publication",         description: "Strategic submission management for high-tier Q1 and Q2 indexed international journals.",                                       accent: "from-indigo-500 to-violet-500",glow: "rgba(99,102,241,0.15)"   },
];

// Deterministic particles — no random() on every render
const PARTICLES = [
  { x: 8,  y: 12, s: 1.5, o: 0.4 }, { x: 15, y: 35, s: 1,   o: 0.25 },
  { x: 22, y: 68, s: 2,   o: 0.35 }, { x: 5,  y: 82, s: 1,   o: 0.2  },
  { x: 31, y: 22, s: 1.5, o: 0.3  }, { x: 38, y: 55, s: 1,   o: 0.4  },
  { x: 45, y: 8,  s: 2,   o: 0.3  }, { x: 52, y: 78, s: 1.5, o: 0.25 },
  { x: 58, y: 42, s: 1,   o: 0.35 }, { x: 65, y: 18, s: 2,   o: 0.2  },
  { x: 72, y: 65, s: 1,   o: 0.4  }, { x: 78, y: 30, s: 1.5, o: 0.3  },
  { x: 85, y: 88, s: 1,   o: 0.25 }, { x: 91, y: 52, s: 2,   o: 0.3  },
  { x: 96, y: 15, s: 1,   o: 0.35 }, { x: 12, y: 50, s: 1.5, o: 0.2  },
  { x: 28, y: 90, s: 1,   o: 0.3  }, { x: 42, y: 35, s: 2,   o: 0.25 },
  { x: 55, y: 95, s: 1,   o: 0.4  }, { x: 68, y: 72, s: 1.5, o: 0.3  },
  { x: 80, y: 5,  s: 1,   o: 0.35 }, { x: 88, y: 44, s: 2,   o: 0.2  },
  { x: 3,  y: 60, s: 1.5, o: 0.3  }, { x: 19, y: 15, s: 1,   o: 0.25 },
  { x: 35, y: 75, s: 2,   o: 0.35 }, { x: 49, y: 28, s: 1,   o: 0.4  },
  { x: 62, y: 85, s: 1.5, o: 0.2  }, { x: 74, y: 48, s: 1,   o: 0.3  },
  { x: 93, y: 70, s: 2,   o: 0.25 }, { x: 7,  y: 95, s: 1.5, o: 0.35 },
];

const Hero = () => {
  const containerRef        = useRef<HTMLDivElement>(null);
  const orbitContainerRef   = useRef<HTMLDivElement>(null);
  const featuredCardRef     = useRef<HTMLDivElement>(null);
  const contentWrapperRef   = useRef<HTMLDivElement>(null);
  const miniCardsRef        = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIndex, setActiveIndex]   = useState(0);
  const isAnimatingRef                  = useRef(false);
  const intervalRef                     = useRef<NodeJS.Timeout | null>(null);

  const { loaderDone } = useLoader();

  const switchService = useCallback((newIdx: number) => {
    if (isAnimatingRef.current || newIdx === activeIndex) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIdx);
        isAnimatingRef.current = false;
        gsap.fromTo(
          contentWrapperRef.current,
          { opacity: 0, y: 15, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
        );
      },
    });
    tl.to(contentWrapperRef.current, {
      opacity: 0, y: -15, filter: "blur(10px)", duration: 0.35, ease: "power3.in",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!loaderDone) return;
    intervalRef.current = setInterval(() => {
      switchService((activeIndex + 1) % services.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeIndex, switchService, loaderDone]);

  useEffect(() => {
    if (!loaderDone || !containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(containerRef.current,     { opacity: 0 },             { opacity: 1, duration: 1         }, 0   )
      .fromTo(orbitContainerRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5 }, 0.2)
      .fromTo(featuredCardRef.current,   { opacity: 0, x: 50 },      { opacity: 1, x: 0, duration: 1.2 },     0.4)
      .fromTo(miniCardsRef.current,      { opacity: 0, y: 20 },      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 0.6);
  }, [loaderDone]);

  const currentService = services[activeIndex];

  return (
    <section
      className={`
        ${instrumentSerif.variable} ${inter.variable}
        relative min-h-screen flex items-center
        bg-[#010309] font-sans overflow-hidden
      `}
    >

      {/* ── BACKGROUND LAYER ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* 1. Glow blobs */}
        <div className="absolute top-[-10%] left-[-5%]   w-[500px] h-[500px] rounded-full bg-blue-700/10   blur-[130px]" />
        <div className="absolute top-[20%]  right-[-8%]  w-[420px] h-[420px] rounded-full bg-indigo-600/10 blur-[110px]" />
        <div className="absolute bottom-[-8%] left-[30%] w-[480px] h-[480px] rounded-full bg-violet-700/8  blur-[140px]" />
        <div className="absolute top-[55%]  left-[10%]   w-[280px] h-[280px] rounded-full bg-cyan-600/8    blur-[90px]"  />
        {/* Dynamic glow that follows active service color */}
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000"
          style={{ background: currentService.glow }}
        />

        {/* 2. Dot grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#4a7fbe" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* 3. Subtle diagonal lines (depth) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={`${i * 8 - 10}%`} y1="0%"
              x2={`${i * 8 + 20}%`} y2="100%"
              stroke="#60a5fa"
              strokeWidth="0.6"
            />
          ))}
        </svg>

        {/* 4. Particle field */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {PARTICLES.map((p, i) => (
            <circle
              key={i}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.s}
              fill="#93c5fd"
              opacity={p.o}
            />
          ))}
        </svg>

        {/* 5. Vignette — keeps edges dark so content pops */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #010309 100%)",
          }}
        />
      </div>
      {/* ── END BACKGROUND ───────────────────────────────────────── */}

      <div ref={containerRef} className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ORBIT DIAGRAM */}
          <div ref={orbitContainerRef} className="flex justify-center items-center h-[500px] lg:h-[700px]">
            <div className="relative scale-90 lg:scale-110">
              <OrbitDiagram />
            </div>
          </div>

          {/* SERVICE CONTENT */}
          <div className="space-y-8">
            <div ref={featuredCardRef} className="relative group">
              <div
                className="absolute -inset-1 rounded-[2.5rem] blur-2xl opacity-20 transition-all duration-1000"
                style={{ background: currentService.glow }}
              />
              <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-14 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
                <div ref={contentWrapperRef} className="space-y-6">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-[0.5em] bg-gradient-to-r ${currentService.accent} bg-clip-text text-transparent uppercase`}
                  >
                    Research Domain // {currentService.number}
                  </span>

                  <h3 className="text-5xl w-full md:text-6xl font-serif text-white leading-tight">
                    {currentService.title}
                  </h3>

                  <p className="text-xl text-white/40 font-light leading-relaxed max-w-lg">
                    {currentService.description}
                  </p>

                  <div className="pt-6">
                    <Link
                      href="/phd-services"
                      className={`inline-flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase transition-all hover:gap-6 bg-gradient-to-r ${currentService.accent} bg-clip-text text-transparent`}
                    >
                      Explore Service <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini-Nav Grid */}
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {services.map((s, i) => (
                <button
                  key={i}
                  ref={(el) => { miniCardsRef.current[i] = el; }}
                  onClick={() => switchService(i)}
                  className={`relative p-3 rounded-xl border transition-all duration-500 ${
                    activeIndex === i
                      ? "bg-white/10 border-white/20 shadow-lg"
                      : "border-white/5 opacity-40 hover:opacity-100"
                  }`}
                >
                  <span
                    className={`block text-[8px] font-mono font-bold text-center ${
                      activeIndex === i ? "text-white" : "text-white/20"
                    }`}
                  >
                    {s.number}
                  </span>
                  <div className="h-0.5 w-full bg-white/5 mt-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${s.accent} transition-all duration-[5000ms] ease-linear`}
                      style={{ width: activeIndex === i ? "100%" : "0%" }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;