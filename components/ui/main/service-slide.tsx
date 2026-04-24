"use client";
import { useCursor } from "@/context/cursor-context";
import { otherServices } from "@/data/services";
import Link from "next/link";

const dotPattern = (color: string) =>
    `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`;
  
export default function ServiceSlide({ service }: { service: typeof otherServices[0] }) {
    const Icon = service.icon;
    const { setHovered } = useCursor();

    return (
      <div
        className="relative w-full h-[70vh] min-h-[500px] rounded-[24px] overflow-hidden group/slide"
        style={{
          background: service.bg,
          boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: dotPattern(service.accent), backgroundSize: "20px 20px" }}
        />
  
        {/* Gradient mesh */}
        <div className="absolute inset-0" style={{ background: service.mesh }} />
  
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
  
        {/* Top border accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${service.accent}60, ${service.accent}, ${service.accent}60, transparent)` }}
        />
  
        {/* Floating icons with enhanced animations */}
        {service.floatingIcons.map((FIcon, i) => {
          const positions = [
            { top: "12%",  right: "18%", size: 32, delay: "0s",     dur: "7s", rotate: "0deg" },
            { top: "28%",  right: "20%", size: 20, delay: "1.2s",   dur: "9s", rotate: "45deg" },
            { top: "48%",  right: "12%", size: 24, delay: "0.5s",   dur: "8s", rotate: "-15deg" },
            { top: "65%",  right: "22%", size: 18, delay: "2s",     dur: "10s", rotate: "30deg" },
            { top: "80%",  right: "15%", size: 14, delay: "1.5s",   dur: "6.5s", rotate: "-30deg" },
          ];
          const pos = positions[i % positions.length];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: pos.top,
                right: pos.right,
                animationName: "floatIcon",
                animationDuration: pos.dur,
                animationDelay: pos.delay,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDirection: i % 2 === 0 ? "normal" : "reverse",
              }}
            >
              <div
                className="rounded-[12px] p-2.5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:backdrop-blur-md"
                style={{
                  background: `${service.accent}14`,
                  border: `1px solid ${service.accent}25`,
                  backdropFilter: "blur(4px)",
                  transform: `rotate(${pos.rotate})`,
                }}
              >
                <FIcon size={pos.size} style={{ color: service.accent, opacity: 0.7 }} strokeWidth={1.2} />
              </div>
            </div>
          );
        })}
  
        {/* Progress bar animation for autoplay */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div 
            className="h-[3px] w-full origin-left"
            style={{
              background: `linear-gradient(90deg, ${service.accent}, ${service.accent}40)`,
              animation: "progressBar 4000ms linear infinite",
            }}
          />
        </div>
  
        {/* Main content */}
        <div className="absolute inset-0 flex flex-col justify-between p-10 sm:p-12 lg:p-14">
  
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span
                className="text-[0.6rem] font-bold tracking-[0.22em] uppercase"
                style={{ color: `${service.accent}70` }}
              >
                {service.id} / {otherServices.length}
              </span>
              {/* Decorative dots */}
              <div className="flex gap-1.5">
                {otherServices.map((_, idx) => (
                  <div
                    key={idx}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: idx + 1 === parseInt(service.id) ? '20px' : '5px',
                      height: '3px',
                      background: idx + 1 === parseInt(service.id) 
                        ? service.accent 
                        : `${service.accent}25`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Main icon with hover effect */}
            <div
              className="w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3"
              style={{
                background: `${service.accent}18`,
                border: `1px solid ${service.accent}35`,
                boxShadow: `0 0 20px ${service.accent}20`,
              }}
            >
              <Icon size={24} style={{ color: service.accent }} strokeWidth={1.5} />
            </div>
          </div>
  
          {/* Bottom content */}
          <div className="flex flex-col gap-5 max-w-[580px]" style={{ animationName: "slideUp", animationDuration: "0.6s", animationFillMode: "both" }}>
            {/* Accent line */}
            <div className="w-12 h-[2px] rounded-full transition-all duration-300 group-hover/slide:w-20" style={{ background: service.accent }} />
  
            {/* Title */}
            <h3 className="text-[clamp(2rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
              {service.title}
            </h3>
  
            {/* Description */}
            <p className="text-[0.88rem] leading-[1.7] text-white/50 max-w-[440px]">
              {service.description}
            </p>
  
            {/* CTA Button */}
            <Link
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              href="/services"
              className="inline-flex items-center gap-3 w-fit group/btn mt-2"
              style={{ color: service.accent }}
            >
              <span
                className="text-[0.72rem] font-bold tracking-[0.1em] uppercase border-b pb-[2px] transition-all duration-300 group-hover/btn:pb-[3px]"
                style={{ borderColor: `${service.accent}40` }}
              >
                Learn more
              </span>
              <span className="text-lg transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:scale-110">→</span>
            </Link>
          </div>
        </div>
  
        {/* Hover overlay effect */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${service.accent}08, transparent)`,
          }}
        />
      </div>
    );
}