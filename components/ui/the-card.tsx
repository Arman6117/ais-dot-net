"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import Link from "next/link";
import { useCursor } from "@/context/cursor-context";
import {  FaLinkedinIn } from "react-icons/fa";

const TheCard = () => {
  const { loaderDone } = useLoader();
  const cardRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const { setHovered } = useCursor();
  // Entrance animation after loader (only if not animated by parent)
  useEffect(() => {
    if (!loaderDone || !cardRef.current || window.innerWidth < 1024) return;
    // Only animate if parent didn't already handle it
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

  // 3D tilt effect on hover (only in hero section)
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
    };

    const onMouseLeaveHero = () => {
      if (!founderRef.current) return;
      gsap.to(founderRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
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
      className="relative w-[280px] h-[360px] mx-auto lg:mx-0"
    >
      {/* Founder card */}
      <div
        ref={founderRef}
        className="relative w-full h-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#d0ccc6] to-[#bcb8b2] shadow-2xl hover:shadow-3xl transition-shadow duration-300"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/founder.jpg"
          alt="Dr. Prajyot S. Patil - Founder of AIS Solutions"
          fill
          className="object-cover object-top"
          priority
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="text-xl font-bold">Dr. Prajyot Patil</div>
          <div className="text-xs opacity-80 tracking-wide mt-1">
            Data Scientist| PhD in AI | MSc Statistics
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 mt-3">
              <div className="w-8 h-px bg-white/40" />
              <span className="text-[0.65rem] font-medium tracking-wider uppercase text-white/70">
                Founder & Director
              </span>
              <div className=""></div>

              <div className="relative size-6 p-0.5 hover:bg-blue-400 transition-all bg-white rounded-xs group left-10 z-10">
                <Link
                  href={"https://www.linkedin.com/in/dr-prajyot-s-patil-73a99a112/"}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <FaLinkedinIn className="size-5 text-black transition-colors group-hover:text-white " />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Founder badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg px-3 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
            Founder
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-[20px]" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-[20px]" />
      </div>
    </div>
  );
};

export default TheCard;
