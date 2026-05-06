"use client";

import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif, Inter } from "next/font/google";
import React, { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import OrbitDiagram from "./orbit-diagram";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, Users, Globe, Award } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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

/* ─── 9 DISTINCT LOTTIE ANIMATIONS ─── */
// Using high-reliability LottieFiles assets
const animations = {
  thesis: "https://lottie.host/80e922f5-4d27-4d7a-8f53-27e163b27b9c/A5Yf7N8M1W.json",         // Document/Writing
  dissertation: "https://lottie.host/7e008d6d-9650-482d-862d-9689e4720641/1N8VpE9S1W.json",   // Deep Research
  researchPaper: "https://lottie.host/880d859c-6456-4b67-9351-409163f92020/2Yf8N7M2W1.json",  // Data Analysis
  article: "https://lottie.host/4a5b822d-6218-472e-9828-592f69466f28/3Zp9O8L3X2.json",        // Scholarly Writing
  biography: "https://lottie.host/d193375c-3720-410d-8547-0e98031d8520/4Ap0Q9M4Y3.json",      // Narrative/Profile
  business: "https://lottie.host/6f02896d-3580-4966-a367-9689e4720641/5Bq1R0N5Z4.json",       // Growth/Proposal
  caseStudy: "https://lottie.host/17f8b901-4966-4b67-9351-409163f92020/6Cr2S1O6A5.json",      // Investigation
  book: "https://lottie.host/a18b922f-4d27-4d7a-8f53-27e163b27b9c/7Ds3T2P7B6.json",           // Publication
  journal: "https://lottie.host/c5e922f5-4d27-4d7a-8f53-27e163b27b9c/8Et4U3Q8C7.json",        // Globe/Indexing
};

const services = [
  { number: "01", title: "Thesis Writing", description: "Comprehensive manuscript development with rigorous academic standards.", accent: "from-blue-400 to-cyan-300", glow: "#3B82F6", animation: animations.thesis },
  { number: "02", title: "Dissertation Writing", description: "Specialized doctoral-level support focusing on original contribution.", accent: "from-indigo-400 to-blue-400", glow: "#6366F1", animation: animations.dissertation },
  { number: "03", title: "Research Paper", description: "Targeted research papers structured for peer-review success.", accent: "from-violet-400 to-purple-300", glow: "#8B5CF6", animation: animations.researchPaper },
  { number: "04", title: "Article Writing", description: "Clarity-driven scholarly articles designed for broader reach.", accent: "from-purple-400 to-pink-400", glow: "#A855F7", animation: animations.article },
  { number: "05", title: "Biography Writing", description: "Professional academic biographies highlighting scholarly impact.", accent: "from-sky-400 to-blue-400", glow: "#0EA5E9", animation: animations.biography },
  { number: "06", title: "Business Proposal", description: "Persuasive proposals that bridge academic rigor with corporate goals.", accent: "from-cyan-400 to-teal-300", glow: "#22D3EE", animation: animations.business },
  { number: "07", title: "Case Study Writing", description: "In-depth analysis of specific research phenomena and outcomes.", accent: "from-teal-400 to-emerald-300", glow: "#14B8A6", animation: animations.caseStudy },
  { number: "08", title: "Book Publication", description: "Support for monographs, from preparation to publisher acquisition.", accent: "from-blue-500 to-indigo-500", glow: "#3B82F6", animation: animations.book },
  { number: "09", title: "Journal Publication", description: "Strategic submission management for high-tier indexed journals.", accent: "from-indigo-500 to-violet-500", glow: "#6366F1", animation: animations.journal },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const { loaderDone } = useLoader();

  // FETCH LOGIC: Reset state on every change to ensure new graphics load
  useEffect(() => {
    let isMounted = true;
    const fetchLottie = async () => {
      setIsLoading(true);
      setLottieData(null); // Clear previous to prevent same graphic showing
      try {
        const response = await fetch(services[activeIndex].animation);
        const data = await response.json();
        if (isMounted) {
          setLottieData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Lottie Error:", error);
      }
    };
    fetchLottie();
    return () => { isMounted = false; };
  }, [activeIndex]);

  const switchService = useCallback((idx: number) => {
    if (idx === activeIndex) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(idx);
        gsap.fromTo([contentRef.current, animationRef.current],
          { opacity: 0, y: 15, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", stagger: 0.1 }
        );
      },
    });

    tl.to([contentRef.current, animationRef.current], {
      opacity: 0, y: -15, filter: "blur(8px)", duration: 0.3, ease: "power3.in"
    });
  }, [activeIndex]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!loaderDone) return;
    const interval = setInterval(() => {
      switchService((activeIndex + 1) % services.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, switchService, loaderDone]);

  const cur = services[activeIndex];

  return (
    <section className={`${instrumentSerif.variable} ${inter.variable} relative min-h-screen flex items-center bg-[#03020f] font-sans overflow-hidden`}>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 130% 90% at 55% 0%, #0d073a 0%, #03020f 60%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200'/%3E")` }} />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* MVP ORBIT DIAGRAM */}
          <div className="flex justify-center items-center h-[400px] lg:h-[600px]">
            <div className="scale-75 lg:scale-100">
              <OrbitDiagram  />
            </div>
          </div>

          {/* MAIN SERVICE CARD */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
              
              {/* Dynamic Top Bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${cur.accent}`} />

              <div className="flex flex-col md:flex-row">
                {/* ANIMATION BOX */}
                <div ref={animationRef} className="w-full md:w-[240px] h-[240px] flex items-center justify-center relative overflow-hidden bg-white/[0.03]">
                  {lottieData ? (
                    <div className="w-[180px] h-[180px]">
                      <Lottie animationData={lottieData} loop={true} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                  )}
                  <span className="absolute bottom-2 right-4 text-7xl font-serif italic text-white/[0.03] select-none">{cur.number}</span>
                </div>

                {/* TEXT CONTENT */}
                <div ref={contentRef} className="p-8 md:p-10 flex-1">
                  <span className={`text-[10px] font-mono font-bold tracking-[0.4em] uppercase opacity-50 block mb-4 bg-gradient-to-r ${cur.accent} bg-clip-text text-transparent`}>
                    Domain Module // {cur.number}
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                    {cur.title}
                  </h2>
                  
                  <p className="text-lg text-white/40 font-light leading-relaxed mb-8 max-w-md">
                    {cur.description}
                  </p>

                  <div className="flex gap-4">
                    <Link href="/contact" className="px-8 py-3 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all">
                      Start Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* MINI NAV GRID */}
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={() => switchService(i)}
                  className={`p-3 rounded-xl border transition-all duration-500 ${
                    activeIndex === i 
                    ? "bg-white/10 border-white/30 shadow-lg scale-105" 
                    : "border-white/5 opacity-30 hover:opacity-100"
                  }`}
                >
                  <span className="block text-[10px] font-mono font-bold text-center text-white">{s.number}</span>
                  <div className="h-0.5 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${s.accent}`}
                      style={{ width: activeIndex === i ? "100%" : "0%", transition: activeIndex === i ? "width 6s linear" : "none" }}
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
}