"use client";
import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif } from "next/font/google";
import React, { useEffect, useRef } from "react";
import TheCard from "@/components/ui/the-card";
import MissionVision from "./mission-vision";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const Hero = () => {
  const tagRef           = useRef(null);
  const cardRef          = useRef<HTMLDivElement>(null);
  const missionVisionRef = useRef<HTMLDivElement>(null);
  const { loaderDone }   = useLoader();

  useEffect(() => {
    if (!loaderDone) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(tagRef.current, { opacity: 1, duration: 0.8 }, 0.9)
      .fromTo(
        missionVisionRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
        0.3
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.75, rotationY: -18, transformPerspective: 1000, y: 40 },
        { opacity: 1, scale: 1, rotationY: 0, y: 0, duration: 1.2, ease: "back.out(1.2)", clearProps: "transform" },
        0.55
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
        className="hidden lg:block absolute top-23 right-13 text-[0.58rem] font-medium tracking-[0.22em] uppercase text-black text-right leading-[1.8] opacity-0"
      >
        Pune, Maharashtra
      </div>

      {/* Main layout — stack on mobile, side-by-side on lg+ */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 xl:gap-16 min-h-[calc(100vh-8rem)]">

        {/* LEFT — MissionVision, takes all available space */}
        <div ref={missionVisionRef} className="flex-1 min-w-0 opacity-0 w-full">
          <MissionVision />
        </div>

        {/* RIGHT — Founder card, never shrinks or grows */}
        <div className="shrink-0 flex items-center justify-center">
          <div ref={cardRef} style={{ opacity: 0 }}>
            <TheCard />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;