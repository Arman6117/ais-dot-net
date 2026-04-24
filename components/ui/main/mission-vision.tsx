// components/ui/mission-vision-text.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Target } from "lucide-react";

export default function MissionVision() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="w-full max-w-4xl mx-auto opacity-0">
      {/* Two column text layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Vision */}
        <div className="group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
              style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.14)" }}>
              <Eye size={18} strokeWidth={1.5} className="text-[#1A56DB]" />
            </div>
            <div>
              <h3 className="font-serif italic text-xl md:text-2xl text-[#111]">Our Vision</h3>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#1A56DB] to-transparent mt-1" />
            </div>
          </div>
          <p className="text-[0.85rem] text-black/60 leading-relaxed pl-13">
            <span className="font-semibold text-[#1A56DB]">Our Vision</span> is to be a leading partner for corporates and scholars alike — empowering innovation, growth, and academic excellence through data-driven insights and strategic research.
          </p>
        </div>

        {/* Mission */}
        <div className="group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
              style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.14)" }}>
              <Target size={18} strokeWidth={1.5} className="text-[#1A56DB]" />
            </div>
            <div>
              <h3 className="font-serif italic text-xl md:text-2xl text-[#111]">Our Mission</h3>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#1A56DB] to-transparent mt-1" />
            </div>
          </div>
          <p className="text-[0.85rem] text-black/60 leading-relaxed pl-13">
            <span className="font-semibold text-[#1A56DB]">Our Mission</span> is to deliver data-driven insights and strategic research support to businesses, while providing scholars with structured guidance and expert document reviews for academic success.
          </p>
        </div>
      </div>

      {/* Decorative line */}
      <div className="flex items-center justify-center gap-2 mt-8 pt-4">
        <div className="w-1 h-1 rounded-full bg-[#1A56DB]/20" />
        <div className="w-2 h-1 rounded-full bg-[#1A56DB]/30" />
        <div className="w-3 h-1 rounded-full bg-[#1A56DB]/40" />
        <div className="w-4 h-1 rounded-full bg-[#1A56DB]/50" />
        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#1A56DB] to-transparent" />
      </div>
    </div>
  );
}