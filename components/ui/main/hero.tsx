"use client";
import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Magnetic from "../magnetic";
import { ArrowRight } from "lucide-react";
import { useCursor } from "@/context/cursor-context";

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
  const { loaderDone } = useLoader();
  const {setHovered} = useCursor()
  useEffect(() => {
    if (!loaderDone) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      .to(hl1Ref.current, { y: "0%", duration: 1.4 }, 0.4)
      .to(hl2Ref.current, { y: "0%", duration: 1.4 }, 0.55)
      .to(hl3Ref.current, { y: "0%", duration: 1.4 }, 0.7)
      .to(tagRef.current, { opacity: 1, duration: 0.8 }, 0.9)
      .to(stripRef.current, { opacity: 1, duration: 0.9 }, 1.1);

    return () => {
      tl.kill();
    };
  }, [loaderDone]);
  return (
    <section
    id="hero"
      className={`${instrumentSerif.variable}  relative z-1 min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_300px] items-end pt-15.5 px-5 sm:px-8 lg:px-13 gap-12`}
    >
      <div
        ref={tagRef}
        className="hidden lg:block absolute top-23 right-13 text-[0.58rem] font-medium tracking-[0.22em] uppercase text-black/22 text-right leading-[1.8] opacity-0"
      >
        Pune, Maharashtra
      </div>
      <div className="flex flex-col justify-end">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="flex items-center gap-2.25 mb-5.5 opacity-0 translate-y-2.5"
        >
          <div className="w-5.5 h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            PhD Research Consulting
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            ref={hl1Ref}
            style={{ display: "block", transform: "translateY(105%)" }}
            className="font-serif italic text-[clamp(3.2rem,8.5vw,9rem)] leading-[0.9] tracking-[-0.025em] text-[#111]"
          >
            Guiding Scholars
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            ref={hl2Ref}
            style={{ display: "block", transform: "translateY(105%)" }}
            className="font-extrabold text-[clamp(3.2rem,8.5vw,9rem)] leading-[0.9] tracking-[-0.05em] text-[#1A56DB] pl-[clamp(0.8rem,2.5vw,2.5rem)]"
          >
            From Research
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            ref={hl3Ref}
            style={{ display: "block", transform: "translateY(105%)" }}
            className="font-serif italic text-[clamp(3.2rem,8.5vw,9rem)] leading-[0.9] tracking-[-0.025em] text-[#111]"
          >
            to Recognition.
          </span>
        </div>
        <div
          ref={stripRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-black/6 pt-5 pb-5 gap-5 sm:gap-0 opacity-0"
        >
          <p className="text-[clamp(0.75rem,1vw,0.88rem)] text-black/40 leading-relaxed max-w-85">
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
            <Magnetic  >
              <Link
              onMouseEnter={()=> setHovered(true)}
              onMouseLeave={()=> setHovered(false)}
                href="#services"
                className="group relative inline-flex items-center gap-2.25 px-6.5 py-3 bg-[#111] text-[#FDFCF9] text-[0.72rem] font-bold tracking-[0.04em] no-underline overflow-hidden"
              >
                <span className="absolute inset-0 bg-[#1A56DB] scale-x-0 origin-left transition-transform duration-400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-0" />
                <span className="relative z-10">See PhD Services</span>
                <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 size-3" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
      <div
        id="heroAnchor"
        className="flex items-center justify-center min-h-75 lg:min-h-0 lg:h-full order-last lg:order-0"
      />
    </section>
  );
};

export default Hero;
