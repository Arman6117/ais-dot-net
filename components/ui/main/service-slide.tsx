import { useCursor } from "@/context/cursor-context";
import { otherServices } from "@/data/services";
import Link from "next/link";

const dotPattern = (color: string) =>
    `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`;
  
export default function ServiceSlide({ service }: { service: typeof otherServices[0] }) {
    const Icon = service.icon;
    const {setHovered} = useCursor()
    return (
      <div
        className="relative w-full h-[70vh] min-h-[500px] rounded-[24px] overflow-hidden"
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
  
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }}
        />
  
        {service.floatingIcons.map((FIcon, i) => {
          const positions = [
            { top: "15%",  right: "22%", size: 28, delay: "0s",   dur: "6s" },
            { top: "32%",  right: "22%", size: 18, delay: "1.5s", dur: "8s" },
            { top: "55%",  right: "10%", size: 22, delay: "0.8s", dur: "7s" },
            { top: "68%",  right: "24%", size: 16, delay: "2s",   dur: "9s" },
          ];
          const pos = positions[i];
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
                className="rounded-[10px] p-2 flex items-center justify-center"
                style={{
                  background: `${service.accent}14`,
                  border: `1px solid ${service.accent}25`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <FIcon size={pos.size} style={{ color: service.accent, opacity: 0.6 }} strokeWidth={1.2} />
              </div>
            </div>
          );
        })}
  
        {/* Main content */}
        <div className="absolute inset-0 flex flex-col justify-between p-10 sm:p-14">
  
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span
              className="text-[0.6rem] font-bold tracking-[0.22em] uppercase"
              style={{ color: `${service.accent}70` }}
            >
              {service.id} / 06
            </span>
            {/* Main icon */}
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center"
              style={{
                background: `${service.accent}18`,
                border: `1px solid ${service.accent}35`,
                boxShadow: `0 0 20px ${service.accent}20`,
              }}
            >
              <Icon size={22} style={{ color: service.accent }} strokeWidth={1.5} />
            </div>
          </div>
  
          {/* Bottom content — slides up on mount via CSS animation */}
          <div className="flex flex-col gap-5 max-w-[580px]" style={{ animationName: "slideUp", animationDuration: "0.6s", animationFillMode: "both" }}>
            <div className="w-10 h-[2px] rounded-full" style={{ background: service.accent }} />
  
            <h3 className="text-[clamp(2.4rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] text-white">
              {service.title}
            </h3>
  
            <p className="text-[0.88rem] leading-[1.8] text-white/50 max-w-[440px]">
              {service.description}
            </p>
  
            <Link
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
              href="/services"
              className="inline-flex items-center gap-3 w-fit group/link"
              style={{ color: service.accent }}
            >
              <span
                className="text-[0.72rem] font-bold tracking-[0.1em] uppercase border-b pb-[1px] transition-all duration-200 group-hover/link:gap-4"
                style={{ borderColor: `${service.accent}50` }}
              >
                Learn more
              </span>
              <span className="text-lg transition-transform duration-200 group-hover/link:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }