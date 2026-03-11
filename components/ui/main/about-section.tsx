"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      [eyebrowRef.current, headlineRef.current, bodyRef.current, statsRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          id: "about-trigger",
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    return () => ScrollTrigger.getById("about-trigger")?.kill();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-1 px-5 sm:px-8 lg:px-13 py-24`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left: founder card anchor ── */}
      {/* Left anchor — hidden on mobile */}
<div className="hidden lg:flex items-center justify-center min-h-85">
  <div id="aboutAnchor" className="w-65 h-85" />
</div>
        {/* ── Right: text content ── */}
        <div className="flex flex-col gap-8">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-2.25 opacity-0">
            <div className="w-5.5 h-[1.5px] bg-[#1A56DB]" />
            <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
              Who We Are
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="opacity-0">
            <h2 className="font-serif italic text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-[#111]">
              Building a thriving<br />
              <span className="text-[#1A56DB]">Analytics Ecosystem</span>
            </h2>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="opacity-0 flex flex-col gap-4">
            <p className="text-[0.88rem] text-black/60 leading-[1.8]">
              AIS Solutions Pvt. Ltd. is a leading consulting and solutions company based in Pune, founded with a vision to empower individuals and businesses through real-world, industry-driven analytics training and innovative data solutions.
            </p>
            <p className="text-[0.88rem] text-black/60 leading-[1.8]">
              In today&apos;s digital era, data is generated at an unprecedented rate. The true challenge lies in extracting meaningful insights to drive smarter decisions. We believe data holds immense potential — unlocking its value requires the right approach, the right guidance, and the right partner.
            </p>
            <p className="text-[0.88rem] text-black/60 leading-[1.8]">
              Beyond analytics, we have guided 500+ PhD scholars across Pune through every stage of their research journey — from topic selection to Scopus publication and viva preparation.
            </p>
          </div>

          {/* Stats + CTA */}
          <div ref={statsRef} className="opacity-0 flex items-end gap-10 pt-4 border-t border-black/6">

            <div>
              <div className="font-serif italic text-[3.5rem] leading-1 text-[#111] tracking-[-0.03em]">
                15<span className="text-[#1A56DB]">+</span>
              </div>
              <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-black/35 mt-1">
                Years of Experience
              </div>
            </div>

            <div className="w-px h-12 bg-black/6" />

            <div>
              <div className="font-serif italic text-[3.5rem] leading-1 text-[#111] tracking-[-0.03em]">
                Pune
              </div>
              <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-black/35 mt-1">
                Maharashtra, India
              </div>
            </div>

            <a
              href="/about"
              className="group ml-auto relative inline-flex items-center gap-2.25 px-5.5 py-3 bg-[#111] text-[#FDFCF9] text-[0.72rem] font-bold tracking-[0.04em] no-underline overflow-hidden rounded-[6px]"
            >
              <span className="absolute inset-0 bg-[#1A56DB] scale-x-0 origin-left transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-0 rounded-[6px]" />
              <span className="relative z-10">Our Story</span>
              <svg className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1.5 6.5h10M7 2l4.5 4.5L7 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}