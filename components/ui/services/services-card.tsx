import { useCursor } from "@/context/cursor-context";
import { services } from "@/data/services";
import gsap from "gsap";
import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const [open, setOpen] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    const Icon = service.icon;
    const {setHovered} = useCursor()
    // Animate open/close
    useEffect(() => {
      if (!bodyRef.current) return;
      if (open) {
        gsap.fromTo(bodyRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(bodyRef.current,
          { height: 0, opacity: 0, duration: 0.4, ease: "power3.in" }
        );
      }
    }, [open]);
  
    return (
      <div
        className="service-card opacity-0 rounded-[20px] overflow-hidden cursor-pointer transition-shadow duration-300"
        style={{
          background: open ? service.bg : "#ffffff",
          border: open ? `1px solid ${service.accent}30` : "1px solid rgba(0,0,0,0.07)",
          boxShadow: open
            ? `0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)`
            : "0 2px 16px rgba(0,0,0,0.05)",
          transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
        }}
        onClick={() => setOpen(!open)}
      >
        {/* ── Card header (always visible) ── */}
        <div className="p-7 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 mt-0.5 transition-all duration-400"
              style={{
                background: open ? `${service.accent}18` : "rgba(26,86,219,0.07)",
                border: open ? `1px solid ${service.accent}30` : "1px solid rgba(26,86,219,0.12)",
              }}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                style={{ color: open ? service.accent : "#1A56DB" }}
              />
            </div>
  
            {/* Title + tagline */}
            <div>
              <div
                className="text-[0.55rem] font-bold tracking-[0.2em] uppercase mb-1.5 transition-colors duration-400"
                style={{ color: open ? `${service.accent}80` : "rgba(0,0,0,0.3)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3
                className="text-[1.05rem] font-bold leading-[1.2] transition-colors duration-400"
                style={{ color: open ? "#ffffff" : "#111111" }}
              >
                {service.title}
              </h3>
              <p
                className="text-[0.78rem] mt-1 leading-[1.6] transition-colors duration-400"
                style={{ color: open ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}
              >
                {service.tagline}
              </p>
            </div>
          </div>
  
          {/* Toggle icon */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all duration-300"
            style={{
              background: open ? `${service.accent}18` : "rgba(0,0,0,0.04)",
              border: open ? `1px solid ${service.accent}30` : "1px solid rgba(0,0,0,0.08)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {open
              ? <Minus size={14} style={{ color: service.accent }} strokeWidth={2} />
              : <Plus size={14} className="text-black/40" strokeWidth={2} />
            }
          </div>
        </div>
  
        {/* ── Expandable body ── */}
        <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
          <div className="px-7 pb-8 flex flex-col gap-6">
            {/* Accent divider */}
            <div className="h-[1px]" style={{ background: `${service.accent}25` }} />
  
            {/* Description */}
            <p className="text-[0.84rem] leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
              {service.description}
            </p>
  
            {/* Feature list */}
            <ul className="flex flex-col gap-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30` }}
                  >
                    <Check size={11} style={{ color: service.accent }} strokeWidth={2.5} />
                  </div>
                  <span className="text-[0.82rem]" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
  
            {/* CTA */}
            <div className="pt-2">
              <a
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.08em] uppercase transition-opacity duration-200 hover:opacity-70"
                style={{ color: service.accent }}
              >
                Get Started
                <span className="text-base">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  