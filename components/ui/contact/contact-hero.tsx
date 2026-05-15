// components/contact/contact-hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import { MessageSquare } from "lucide-react";
import ContactInfo from "./contact-info";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const DOTS = Array.from({ length: 30 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  s: 1 + (i % 3) * 0.6,
  o: 0.12 + (i % 4) * 0.06,
}));

export default function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
      .fromTo(heroRef.current,  { opacity: 0 },         { opacity: 1, duration: 0.6 },      0   )
      .fromTo(headRef.current,  { opacity: 0, y: 50 },  { opacity: 1, y: 0, duration: 1 },  0.15)
      .fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4);
  }, []);

  return (
    <section ref={heroRef} className={`${serif.variable} ${sans.variable} relative bg-[ #0b0b20] overflow-hidden min-h-screen flex flex-col font-[family-name:var(--font-sans)]`}>
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 70% at 25% 0%, #0f0a3a 0%,  #0b0b20 55%)" }} />
        
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.11]"
          style={{ top: "5%", right: "-8%", background: "#3B82F6" }} />
        <div className="absolute w-[500px] h-[400px] rounded-full blur-[80px] opacity-[0.08]"
          style={{ bottom: "-5%", left: "15%", background: "#8B5CF6" }} />
        
        <svg className="absolute inset-0 w-full h-full opacity-[0.065]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cg" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#6366f1" strokeWidth="0.35"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg)"/>
        </svg>
        
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {DOTS.map((d, i) => (
            <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.s} fill="#93c5fd" opacity={d.o} />
          ))}
        </svg>
        
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 15%,  #0b0b20ee 100%)" }} />
      </div>

      <div className="relative z-10 flex-1 w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16 flex flex-col">
        
        {/* Header */}
        <div ref={headRef} className="text-center lg:text-left mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/25 bg-[#3B82F6]/8 mb-6">
            <MessageSquare size={12} className="text-blue-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">
              Get In Touch
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-serif)] text-white leading-[1.02]">
            <span className="block text-[clamp(2rem,4vw,3.5rem)] text-white/60 italic font-light">
              Let's start a
            </span>
            <span className="block text-[clamp(3.5rem,8vw,7rem)] font-black tracking-[-0.03em]"
              style={{ 
                background: "linear-gradient(135deg, #FFFFFF 0%, #93c5fd 40%, #3B82F6 100%)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent"
              }}>
              conversation.
            </span>
          </h1>
          <p className="mt-4 text-white/30 text-[15px] leading-relaxed max-w-lg mx-auto lg:mx-0">
            PhD scholar, researcher, or business — reach out and we'll respond within 24 hours.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div ref={contentRef} className="mt-auto">
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}