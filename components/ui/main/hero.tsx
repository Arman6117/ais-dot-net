"use client";

import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif, Inter } from "next/font/google";
import React, { useEffect, useRef, useState, useCallback } from "react";
import OrbitDiagram from "./orbit-diagram";
import Link from "next/link";
import { ArticleAnimation, BiographyAnimation, BookAnimation, BusinessAnimation, CaseStudyAnimation, DissertationAnimation, JournalAnimation, ResearchAnimation, ThesisAnimation } from "../animations/hero";

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


/* ─── Service definitions with animation components ─────────── */
const services = [
  { number:"01", title:"Thesis Writing",        description:"Comprehensive manuscript development with rigorous academic standards and structural integrity.",              accent:"from-blue-400 to-cyan-300",      glow:"#3B82F6", Animation: ThesisAnimation       },
  { number:"02", title:"Dissertation Writing",   description:"Specialized doctoral-level support focusing on original contribution and defense-ready depth.",               accent:"from-indigo-400 to-blue-400",    glow:"#6366F1", Animation: DissertationAnimation },
  { number:"03", title:"Research Paper",         description:"Targeted research papers structured for peer-review success and high-impact factor journals.",                 accent:"from-violet-400 to-purple-300",  glow:"#8B5CF6", Animation: ResearchAnimation     },
  { number:"04", title:"Article Writing",        description:"Clarity-driven scholarly articles designed for broader academic reach and citation growth.",                   accent:"from-purple-400 to-pink-400",    glow:"#A855F7", Animation: ArticleAnimation      },
  { number:"05", title:"Biography Writing",      description:"Professional academic and professional biographies highlighting scholarly impact and expertise.",               accent:"from-sky-400 to-blue-400",       glow:"#0EA5E9", Animation: BiographyAnimation    },
  { number:"06", title:"Business Proposal",      description:"Persuasive, data-backed proposals that bridge academic rigor with corporate objectives.",                      accent:"from-cyan-400 to-teal-300",      glow:"#22D3EE", Animation: BusinessAnimation     },
  { number:"07", title:"Case Study Writing",     description:"In-depth qualitative and quantitative analysis of specific research phenomena and outcomes.",                  accent:"from-teal-400 to-emerald-300",   glow:"#14B8A6", Animation: CaseStudyAnimation    },
  { number:"08", title:"Book Publication",       description:"End-to-end support for academic monographs, from manuscript preparation to publisher acquisition.",           accent:"from-blue-500 to-indigo-500",    glow:"#3B82F6", Animation: BookAnimation         },
  { number:"09", title:"Journal Publication",    description:"Strategic submission management for high-tier Q1 and Q2 indexed international journals worldwide.",           accent:"from-indigo-500 to-violet-500",  glow:"#6366F1", Animation: JournalAnimation      },
];

/* ─── Particles ─────────────────────────────────────────────── */
const PARTICLES = [
  {x:8,y:12,s:1.5,o:.35},{x:15,y:35,s:1,o:.18},{x:22,y:68,s:2,o:.28},{x:5,y:82,s:1,o:.15},
  {x:31,y:22,s:1.5,o:.22},{x:38,y:55,s:1,o:.32},{x:45,y:8,s:2,o:.2},{x:52,y:78,s:1.5,o:.18},
  {x:58,y:42,s:1,o:.28},{x:65,y:18,s:2,o:.15},{x:72,y:65,s:1,o:.32},{x:78,y:30,s:1.5,o:.2},
  {x:85,y:88,s:1,o:.18},{x:91,y:52,s:2,o:.25},{x:96,y:15,s:1,o:.28},{x:12,y:50,s:1.5,o:.15},
  {x:28,y:90,s:1,o:.22},{x:42,y:35,s:2,o:.18},{x:55,y:95,s:1,o:.32},{x:68,y:72,s:1.5,o:.25},
  {x:80,y:5,s:1,o:.28},{x:88,y:44,s:2,o:.15},{x:3,y:60,s:1.5,o:.2},{x:19,y:15,s:1,o:.18},
  {x:35,y:75,s:2,o:.28},{x:49,y:28,s:1,o:.32},{x:62,y:85,s:1.5,o:.15},{x:74,y:48,s:1,o:.22},
  {x:93,y:70,s:2,o:.18},{x:7,y:95,s:1.5,o:.28},
];

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const orbitRef      = useRef<HTMLDivElement>(null);
  const cardRef       = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const animBoxRef    = useRef<HTMLDivElement>(null);
  const miniNavRef    = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimRef = useRef(false);
  const timerRef  = useRef<NodeJS.Timeout | null>(null);
  const { loaderDone } = useLoader();

  /* ── Switch ───────────────────────────────────────────────── */
  const switchService = useCallback((idx: number) => {
    if (isAnimRef.current || idx === activeIndex) return;
    isAnimRef.current = true;
    gsap.timeline({
      onComplete: () => {
        setActiveIndex(idx);
        isAnimRef.current = false;
        gsap.fromTo(
          [contentRef.current, animBoxRef.current],
          { opacity:0, y:18, filter:"blur(10px)" },
          { opacity:1, y:0, filter:"blur(0px)", duration:0.55, ease:"power3.out", stagger:0.07 }
        );
      },
    }).to([contentRef.current, animBoxRef.current], {
      opacity:0, y:-16, filter:"blur(10px)", duration:0.28, ease:"power3.in", stagger:0.04,
    });
  }, [activeIndex]);

  /* ── Auto-rotate ──────────────────────────────────────────── */
  useEffect(() => {
    if (!loaderDone) return;
    timerRef.current = setInterval(() => {
      switchService((activeIndex + 1) % services.length);
    }, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeIndex, switchService, loaderDone]);

  /* ── Entrance ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!loaderDone) return;
    gsap.timeline({ defaults:{ ease:"expo.out" } })
      .fromTo(sectionRef.current,  {opacity:0},            {opacity:1, duration:0.7},                   0   )
      .fromTo(orbitRef.current,    {opacity:0,scale:0.82}, {opacity:1,scale:1,duration:1.4},             0.15)
      .fromTo(cardRef.current,     {opacity:0,x:80},       {opacity:1,x:0,duration:1.2},                0.4 )
      .fromTo(animBoxRef.current,  {opacity:0,scale:0.9},  {opacity:1,scale:1,duration:0.9},             0.6 )
      .fromTo(miniNavRef.current,  {opacity:0,y:16},       {opacity:1,y:0,duration:0.7},                0.9 );
  }, [loaderDone]);

  const cur = services[activeIndex];
  const { Animation } = cur;

  return (
    <section
      ref={sectionRef}
      className={`
        ${instrumentSerif.variable} ${inter.variable}
        relative min-h-screen flex items-center
        bg-[#03020f] font-sans overflow-hidden
      `}
    >

      {/* ══ RICH BACKGROUND ══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

        {/* 1. Deep aurora base — two competing gradients */}
        <div className="absolute inset-0"
          style={{ background:"radial-gradient(ellipse 140% 80% at 50% -10%, #130a4a 0%, #03020f 55%)" }}/>
        <div className="absolute inset-0"
          style={{ background:"radial-gradient(ellipse 80% 60% at 100% 100%, #0c1a3a 0%, transparent 60%)" }}/>

        {/* 2. Service-color megaglow — transitions with active service */}
        <div
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width:1100, height:1100,
            top:"50%", left:"60%",
            transform:"translate(-50%,-50%)",
            background:`radial-gradient(circle, ${cur.glow}1a 0%, transparent 55%)`,
            filter:"blur(40px)",
          }}
        />

        {/* 3. Left-side static indigo glow */}
        <div className="absolute rounded-full"
          style={{ width:700, height:600, top:"-10%", left:"-15%",
            background:"radial-gradient(circle, #4f46e515 0%, transparent 60%)", filter:"blur(60px)" }}/>

        {/* 4. Bottom-right warm accent */}
        <div className="absolute rounded-full transition-all duration-1000"
          style={{ width:500, height:400, bottom:"-5%", right:"-5%",
            background:`radial-gradient(circle, ${cur.glow}0f 0%, transparent 60%)`, filter:"blur(50px)" }}/>

        {/* 5. Aurora horizontal bands */}
        <div className="absolute inset-x-0"
          style={{
            top:"15%", height:2,
            background:"linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 30%, rgba(139,92,246,0.18) 50%, rgba(99,102,241,0.12) 70%, transparent 100%)",
          }}/>
        <div className="absolute inset-x-0"
          style={{
            top:"72%", height:1,
            background:"linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 40%, rgba(99,102,241,0.12) 50%, rgba(59,130,246,0.08) 60%, transparent 100%)",
          }}/>

        {/* 6. Fine grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#5b6fbe" strokeWidth="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>

        {/* 7. Dot overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="#7c8fce"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>

        {/* 8. Star particles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {PARTICLES.map((p,i)=>(
            <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.s} fill="#93c5fd" opacity={p.o}/>
          ))}
        </svg>

        {/* 9. Noise grain */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize:"160px 160px",
          }}/>

        {/* 10. Radial vignette */}
        <div className="absolute inset-0"
          style={{ background:"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, #03020fee 100%)" }}/>

        {/* 11. Top edge darkener (below navbar) */}
        <div className="absolute top-0 left-0 right-0 h-24"
          style={{ background:"linear-gradient(to bottom, #03020f 0%, transparent 100%)" }}/>
      </div>
      {/* ══ END BACKGROUND ══════════════════════════════════════ */}

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — Orbit diagram */}
          <div ref={orbitRef} className="flex justify-center items-center h-[400px] lg:h-[600px]">
            <div className="scale-75 lg:scale-100 origin-center">
              <OrbitDiagram />
            </div>
          </div>

          {/* RIGHT — Service card */}
          <div className="flex flex-col gap-5">

            {/* Main card */}
            <div
              ref={cardRef}
              className="relative rounded-[2rem] overflow-hidden"
              style={{
                border:"1px solid rgba(255,255,255,0.08)",
                background:"linear-gradient(155deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.008) 100%)",
                backdropFilter:"blur(32px)",
                boxShadow:`0 8px 80px ${cur.glow}18, 0 2px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.3) inset`,
                transition:"box-shadow 0.8s ease",
              }}
            >
              {/* Top gradient accent bar */}
              <div className={`h-[2.5px] w-full bg-gradient-to-r ${cur.accent} transition-all duration-700`}/>

              <div className="flex flex-col md:flex-row">

                {/* ANIMATION PANEL */}
                <div
                  ref={animBoxRef}
                  className="relative md:w-[220px] lg:w-[240px] shrink-0 flex items-center justify-center overflow-hidden"
                  style={{
                    minHeight:220,
                    background:`linear-gradient(135deg, ${cur.glow}12 0%, rgba(15,10,40,0.6) 100%)`,
                    borderRight:"1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Grid lines inside panel */}
                  <div className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:"linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                      backgroundSize:"24px 24px",
                    }}/>
                  {/* Corner accent dots */}
                  {[["8px","8px"],["8px","auto"],["auto","8px"],["auto","auto"]].map(([t,l],i)=>(
                    <div key={i} className="absolute w-1.5 h-1.5 rounded-full transition-all duration-700"
                      style={{
                        top: t === "8px" ? "10px":"auto", bottom: t !== "8px" ? "10px":"auto",
                        left: l === "8px" ? "10px":"auto", right: l !== "8px" ? "10px":"auto",
                        background: cur.glow, opacity:0.5,
                      }}/>
                  ))}
                  {/* The actual SVG animation */}
                  <div className="w-[170px] h-[170px] relative z-10">
                    <Animation />
                  </div>
                  {/* Service number watermark */}
                  <span className="absolute bottom-2 right-4 text-[4.5rem] font-serif italic select-none pointer-events-none"
                    style={{ color:`${cur.glow}18`, lineHeight:1 }}>
                    {cur.number}
                  </span>
                </div>

                {/* TEXT PANEL */}
                <div ref={contentRef} className="flex flex-col justify-center p-8 md:p-9 flex-1 min-w-0">
                  <span className={`text-[9px] font-mono font-bold tracking-[0.5em] bg-gradient-to-r ${cur.accent} bg-clip-text text-transparent uppercase mb-3`}>
                    Domain Module // {cur.number}
                  </span>

                  <h2 className="text-4xl md:text-5xl font-serif text-white leading-[1.1] mb-3">
                    {cur.title}
                  </h2>

                  <div className={`h-px w-12 bg-gradient-to-r ${cur.accent} opacity-45 mb-4`}/>

                  <p className="text-white/42 text-[14px] font-light leading-relaxed mb-7">
                    {cur.description}
                  </p>

                  <div className="flex items-center gap-4">
                   
                    <Link href="/phd-services"
                      className={`text-[10px] font-bold tracking-[0.25em] uppercase bg-gradient-to-r ${cur.accent} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300`}>
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom inner glow */}
              <div className="absolute bottom-0 right-0 w-56 h-40 pointer-events-none transition-all duration-1000"
                style={{
                  background:`radial-gradient(circle, ${cur.glow}14 0%, transparent 70%)`,
                  filter:"blur(20px)",
                  transform:"translate(25%,30%)",
                }}/>
            </div>

            {/* Mini-nav */}
            <div ref={miniNavRef}>
              <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => switchService(i)}
                    className="relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300"
                    style={{
                      border: activeIndex === i ? `1px solid ${cur.glow}45` : "1px solid rgba(255,255,255,0.05)",
                      background: activeIndex === i ? `${cur.glow}10` : "transparent",
                      opacity: activeIndex === i ? 1 : 0.35,
                      transform: activeIndex === i ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <span className="text-[9px] font-mono font-bold text-white/60">{s.number}</span>
                    <div className="h-0.5 w-full rounded-full overflow-hidden bg-white/5">
                      <div
                        className={`h-full bg-gradient-to-r ${s.accent} transition-all ease-linear`}
                        style={{
                          width: activeIndex === i ? "100%" : "0%",
                          transitionDuration: activeIndex === i ? "6000ms" : "200ms",
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

 
    </section>
  );
}