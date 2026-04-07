"use client";
import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Magnetic from "../magnetic";
import { ArrowRight } from "lucide-react";
import { useCursor } from "@/context/cursor-context";
import TheCard from "@/components/ui/the-card"
import Eyebrow from "@/components/eyebrow";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const Hero = () => {
  const tagRef = useRef(null);
  const eyebrowRef = useRef(null);
  const hl1Ref = useRef(null);
  const hl2Ref = useRef(null);
  const hl3Ref = useRef(null);
  const stripRef = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { loaderDone } = useLoader();
  const { setHovered } = useCursor();
  
  useEffect(() => {
    if (!loaderDone) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      .to(hl1Ref.current, { y: "0%", duration: 1.4 }, 0.4)
      .to(hl2Ref.current, { y: "0%", duration: 1.4 }, 0.55)
      .to(hl3Ref.current, { y: "0%", duration: 1.4 }, 0.7)
      .to(tagRef.current, { opacity: 1, duration: 0.8 }, 0.9)
      .to(stripRef.current, { opacity: 1, duration: 0.9 }, 1.1)
      // GSAP animation for card
      .fromTo(cardRef.current,
        {
          opacity: 0,
          scale: 0.7,
          rotationY: -20,
          rotationX: 10,
          transformPerspective: 1000,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          clearProps: "transform"
        },
        0.7
      );

    return () => {
      tl.kill();
    };
  }, [loaderDone]);
  
  return (
    <section
      id="hero"
      className={`${instrumentSerif.variable} relative z-1 min-h-screen px-5 sm:px-8 lg:px-13 py-12 lg:py-20 overflow-hidden`}
    >
      {/* Location tag */}
      <div
        ref={tagRef}
        className="hidden lg:block absolute top-23 right-13 text-[0.58rem] font-medium tracking-[0.22em] uppercase text-black/22 text-right leading-[1.8] opacity-0"
      >
        Pune, Maharashtra
      </div>
      
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[calc(100vh-6rem)]">
          {/* Left column - Hero text content - takes more space */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex flex-col justify-center space-y-6 max-w-3xl">
              {/* Eyebrow */}
              <div
                ref={eyebrowRef}
                className="flex items-center gap-2.25 mb-5.5 opacity-0 translate-y-2.5"
              >
               <Eyebrow >
                  PhD Research Consulting
               </Eyebrow>
              </div>
              {/* Headlines */}
              <div className="overflow-hidden">
                <span
                  ref={hl1Ref}
                  style={{ display: "block", transform: "translateY(105%)" }}
                  className="font-serif py-2.5 italic text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] tracking-[-0.025em] text-[#111]"
                >
                  Guiding Scholars
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  ref={hl2Ref}
                  style={{ display: "block", transform: "translateY(105%)" }}
                  className="font-extrabold text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] tracking-[-0.05em] text-[#1A56DB] pl-[clamp(0.5rem,2vw,2rem)]"
                >
                  From Research
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  ref={hl3Ref}
                  style={{ display: "block", transform: "translateY(105%)" }}
                  className="font-serif py-2.5 italic text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] tracking-[-0.025em] text-[#111]"
                >
                  to Recognition.
                </span>
              </div>
              
              {/* Bottom strip */}
              <div
                ref={stripRef}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-black/6 pt-5 pb-5 gap-5 sm:gap-0 opacity-0"
              >
                <p className="text-[clamp(0.75rem,1vw,0.88rem)] text-black/40 leading-relaxed max-w-md">
                  Helping scholars navigate complex research with clarity.
                  <br />
                  Thesis writing, statistical analysis, Scopus publications, viva
                  preparation.
                </p>
                <div className="flex items-center gap-5 shrink-0">
                  <div className="flex items-center gap-2 text-[0.6rem] font-medium tracking-[0.2em] uppercase text-black/25">
                    <span>Scroll</span>
                    <div className="w-7 h-7 rounded-full border border-black/6 grid place-items-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M5 1v8M2 6l3 3 3-3"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <Magnetic>
                    <Link
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      href="#services"
                      className="group relative inline-flex items-center gap-2.25 px-6.5 py-3 bg-[#111] text-[#FDFCF9] text-[0.72rem] font-bold tracking-[0.04em] no-underline overflow-hidden rounded-[6px]"
                    >
                      <span className="absolute inset-0 bg-[#1A56DB] scale-x-0 origin-left transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-0 rounded-[6px]" />
                      <span className="relative z-10">See PhD Services</span>
                      <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 size-3" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Founder Card - fixed width */}
          <div className="shrink-0 w-full lg:w-auto flex items-center justify-center lg:justify-end">
            <div ref={cardRef} style={{ opacity: 0 }}>
              <TheCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;