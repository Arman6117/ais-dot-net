// components/ui/the-card.tsx
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import Link from "next/link";
import { useCursor } from "@/context/cursor-context";
import { FaLinkedinIn } from "react-icons/fa";

const TheCard = () => {
  const { loaderDone } = useLoader();
  const cardRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseRingRef = useRef<HTMLDivElement>(null);
  const { setHovered } = useCursor();

  // Entrance animation after loader
  useEffect(() => {
    if (!loaderDone || !cardRef.current || window.innerWidth < 1024) return;
    if (cardRef.current.style.opacity === "0") {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, [loaderDone]);

  // Entrance animation for pulse ring - only once
  useEffect(() => {
    if (!loaderDone || !pulseRingRef.current) return;
    
    // Animate the ring scale and opacity just once on entrance
    gsap.fromTo(pulseRingRef.current,
      { scale: 1.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(0.5)",
        delay: 0.5,
      }
    );
  }, [loaderDone]);

  // 3D tilt effect on hover
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const onMouseMoveHero = (e: MouseEvent) => {
      if (!founderRef.current) return;
      const heroSection = document.getElementById("hero");
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / 260;
      const dy = (e.clientY - centerY) / 340;

      gsap.to(founderRef.current, {
        rotateY: dx * 12,
        rotateX: -dy * 12,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate glow based on mouse position
      if (glowRef.current) {
        const glowX = (e.clientX - rect.left) / rect.width;
        const glowY = (e.clientY - rect.top) / rect.height;
        gsap.to(glowRef.current, {
          opacity: 0.3,
          background: `radial-gradient(circle at ${glowX * 100}% ${glowY * 100}%, rgba(139,92,246,0.3), rgba(59,130,246,0.1))`,
          duration: 0.3,
        });
      }
    };

    const onMouseLeaveHero = () => {
      if (!founderRef.current) return;
      gsap.to(founderRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    const hero = document.getElementById("hero");
    hero?.addEventListener("mousemove", onMouseMoveHero);
    hero?.addEventListener("mouseleave", onMouseLeaveHero);

    return () => {
      hero?.removeEventListener("mousemove", onMouseMoveHero);
      hero?.removeEventListener("mouseleave", onMouseLeaveHero);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      id="the-card"
      className="relative w-[300px] h-[380px] mx-auto lg:mx-0"
    >
      {/* Static ring border - no animation after entrance */}
      <div 
        ref={pulseRingRef}
        className="absolute -inset-[6px] rounded-[26px] bg-gradient-to-r from-blue-500/30 via-purple-500/40 to-pink-500/30"
        style={{ opacity: 0 }}
      />

      {/* Main card */}
      <div
        ref={founderRef}
        className="relative w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#0D1B3E] to-[#0A0F2A] shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic glow overlay */}
        <div 
          ref={glowRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-10"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.3), rgba(59,130,246,0.1))" }}
        />

        {/* Image with subtle blue-purple tint overlay */}
        <div className="relative w-full h-full">
          <Image
            src="/founder.jpeg"
            alt="Dr. Prajyot S. Patil - Founder of AIS Solutions"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Color overlay to match theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2A]/90 via-[#111B3D]/30 to-[#0A0F2A]/10 mix-blend-multiply" />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2A]/95 via-[#0A0F2A]/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Dr. Prajyot Patil
          </div>
          <div className="text-xs opacity-80 tracking-wide mt-1 text-blue-200/80">
            Data Scientist | PhD in AI | MSc Statistics
          </div>
          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-gradient-to-r from-blue-400 to-purple-400" />
              <span className="text-[0.65rem] font-medium tracking-wider uppercase bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Founder & Director
              </span>
            </div>

            {/* LinkedIn Button with hover effects */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              <div 
                className="relative size-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Link
                  href={"https://www.linkedin.com/in/dr-prajyot-s-patil-73a99a112/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                >
                  <FaLinkedinIn className="size-3.5 text-white transition-all duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Founder badge with gradient */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 text-white rounded-lg px-3 py-1 text-[0.65rem] font-bold tracking-wider uppercase shadow-lg">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Founder
            </span>
          </div>
        </div>

        {/* Decorative corner elements matching orbit theme */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-[20px] z-10" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/15 to-transparent rounded-tl-[20px] z-10" />
        
        {/* Orbital ring accent - static, no animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-blue-400/10 pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-purple-400/5 pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default TheCard;