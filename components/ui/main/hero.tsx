"use client";
import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif } from "next/font/google";
import React, { useEffect, useRef } from "react";
import TheCard from "@/components/ui/the-card";
import MissionVision from "./mission-vision";
import OrbitDiagram from "./orbit-diagram";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const Hero = () => {
  const tagRef           = useRef(null);
  const cardRef          = useRef<HTMLDivElement>(null);
  const orbitRef         = useRef<HTMLDivElement>(null);
  const textRef          = useRef<HTMLDivElement>(null);
  const { loaderDone }   = useLoader();

  useEffect(() => {
    if (!loaderDone) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(tagRef.current, { opacity: 1, duration: 0.8 }, 0.9)
      .fromTo(
        orbitRef.current,
        { opacity: 0, x: -40, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "back.out(0.6)" },
        0.3
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.75, rotationY: -18, transformPerspective: 1000, y: 40 },
        { opacity: 1, scale: 1, rotationY: 0, y: 0, duration: 1.2, ease: "back.out(1.2)", clearProps: "transform" },
        0.55
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.8
      );

    return () => { tl.kill(); };
  }, [loaderDone]);

  return (
    <section
      id="hero"
      className={`
        ${instrumentSerif.variable}
        relative z-1 min-h-screen overflow-hidden
        px-5 sm:px-8 lg:px-13
        py-12 lg:py-16
      `}
    >
      {/* Location tag */}
      <div
        ref={tagRef}
        className="hidden lg:block absolute top-10 right-13 text-[0.58rem] font-medium tracking-[0.22em] uppercase text-black/40 text-right leading-[1.8] opacity-0"
      >
        Pune, Maharashtra
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto">
        {/* Top row: Orbit + Founder Card side by side */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-16 min-h-[calc(100vh-12rem)]">
          
          {/* LEFT - Orbit Diagram (FULLY VISIBLE) */}
          <div ref={orbitRef} className="flex-1 flex justify-center lg:justify-start opacity-0">
            <OrbitDiagram />
          </div>

          {/* RIGHT - Founder Card */}
          <div className="shrink-0 flex items-center justify-center">
            <div ref={cardRef} style={{ opacity: 0 }}>
              <TheCard />
            </div>
          </div>
        </div>

        {/* Bottom row: ONLY TEXT - Mission Vision Info */}
        <div ref={textRef} className="mt-16 lg:mt-20 opacity-0">
          <MissionVision />
        </div>
      </div>
    </section>
  );
};

export default Hero;