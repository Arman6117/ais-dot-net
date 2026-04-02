"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    items: string[];
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get gradient color based on category
  const getGradientColors = () => {
    const id = parseInt(service.id);
    if (id <= 5) {
      // Thesis & Writing - Blue/Purple
      return {
        from: "#3B82F6",
        to: "#8B5CF6",
        hoverFrom: "#2563EB",
        hoverTo: "#7C3AED",
      };
    } else if (id <= 10) {
      // Research & Analysis - Green/Teal
      return {
        from: "#10B981",
        to: "#14B89A",
        hoverFrom: "#059669",
        hoverTo: "#0D9488",
      };
    } else {
      // Publication & Quality - Amber/Orange
      return {
        from: "#F59E0B",
        to: "#F97316",
        hoverFrom: "#D97706",
        hoverTo: "#EA580C",
      };
    }
  };

  const colors = getGradientColors();

  return (
    <div
      className="service-card group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2"
      style={{
        height: "clamp(280px, 30vw, 340px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Card - Default State */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          background: `linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)`,
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" 
            : "0 4px 24px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.07)",
          opacity: isHovered ? 0 : 1,
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full opacity-20 blur-2xl transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${colors.from}, transparent)` }}
        />
        
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <span className="text-[0.58rem] font-bold tracking-[0.22em] text-white/20">
              {service.id}
            </span>
            <div
              className="size-1.75 rounded-full transition-all duration-300"
              style={{ 
                background: colors.from,
                boxShadow: `0 0 8px ${colors.from}`,
              }}
            />
          </div>

          <h3 className="font-serif italic text-[1.7rem] leading-[1.15] text-white px-2">
            {service.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="h-px flex-1 bg-white/6" />
            <span className="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-white/15 ml-3">
              Click
            </span>
          </div>
        </div>
      </div>

      {/* Hover Overlay - Modern Design */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${colors.from} 0%, ${colors.to} 100%)`,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "scale(1)" : "scale(0.95)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
        
        <div className="absolute inset-0 flex flex-col justify-between p-7">
          <div>
            <span className="text-[0.58rem] font-bold tracking-[0.22em] text-white/70 uppercase">
              {service.id} — Includes
            </span>
            <h3 className="font-serif italic text-[1.6rem] leading-[1.15] text-white mt-2 mb-5">
              {service.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {service.items.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.8rem] text-white/90 leading-snug animate-slideIn"
                  style={{
                    animationDelay: `${idx * 0.05}s`,
                    animationFillMode: "both",
                  }}
                >
                  <span 
                    className="mt-1.5 size-1 rounded-full bg-white/80 shrink-0"
                    style={{ boxShadow: "0 0 4px white" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <a
            href="/phd-services"
            className="group/link inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.06em] text-white no-underline hover:gap-3 transition-all duration-300"
          >
            <span className="border-b border-white/50 pb-px">Learn more</span>
            <ArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1 size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}