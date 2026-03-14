"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const teams = [
  {
    name: "Web Development Team",
    img: "/img/group1.jpg",
    description: "Building modern, performant web solutions from scratch — frontend to backend.",
  },
  {
    name: "Data Analyst Team",
    img: "/img/group3.jpg",
    description: "Turning complex datasets into clear insights using SPSS, Python, and R.",
  },
  {
    name: "Research & PhD Team",
    img: "/img/sport.jpg",
    description: "Guiding scholars through every stage — from topic selection to Scopus publication.",
  },
];

export default function TeamsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll(".team-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          id: "teams-trigger",
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => ScrollTrigger.getById("teams-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24"
    >
      {/* Header */}
      <div className="flex items-center gap-[9px] mb-4">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
          Our Teams
        </span>
      </div>
      <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111] mb-14">
        The people behind the work
      </h2>

      {/* Team cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.name}
            className="team-card opacity-0 group relative rounded-[20px] overflow-hidden h-[320px]"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            {/* Image */}
            <Image
              src={team.img}
              alt={team.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to top, rgba(26,86,219,0.7), transparent)" }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-bold text-[1rem] mb-2">{team.name}</h3>
              <p className="text-white/60 text-[0.78rem] leading-[1.6] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {team.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}