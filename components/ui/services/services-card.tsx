"use client";
import { useCursor } from "@/context/cursor-context";
import { services } from "@/data/services";
import gsap from "gsap";
import { ArrowRight, Check, ShieldCheck, Zap, Sparkles, Clock, Users, X } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;
  const { setHovered } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <Dialog>
      {/* ── CARD TRIGGER ─────────────────────────── */}
      <DialogTrigger asChild>
        <div
          ref={cardRef}
          className="service-card group relative rounded-[2rem] p-7 cursor-pointer overflow-hidden transition-all duration-500 will-change-transform shadow-xl"
          style={{
            background: `linear-gradient(145deg, #0a0a0f 0%, #0f0f18 100%)`,
            border: `1px solid ${service.accent}30`,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${service.accent}15 45%, ${service.accent}25 50%, ${service.accent}15 55%, transparent 100%)`,
              animation: 'scan 3s linear infinite',
              backgroundSize: '100% 200%',
            }}
          />

          <div 
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700"
            style={{ backgroundColor: service.accent, opacity: 0.15 }}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ 
                  background: `linear-gradient(135deg, ${service.accent}, ${service.accent}DD)`,
                  boxShadow: `0 8px 24px ${service.accent}40` 
                }}
              >
                <Icon size={24} color="#ffffff" strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-white/20 uppercase">
                 {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-[13px] text-white/35 leading-relaxed line-clamp-2 group-hover:text-white/50 transition-colors">
                {service.tagline}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.accent }} />
                <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.2em]">Click to explore</span>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:translate-x-1 group-hover:text-white/80 transition-all" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* ── WIDE DIALOG ──────────────────── */}
      <DialogContent className="max-w-[95vw] lg:max-w-[90vw] xl:max-w-[1200px] max-h-[90vh] bg-[#0a0a0f] border-white/[0.08] p-0 overflow-hidden rounded-[2rem] shadow-2xl">
        <div className="flex flex-col h-full max-h-[90vh]">
          
          {/* Top bar */}
          <div className="flex items-center justify-between px-8 lg:px-12 py-6 border-b border-white/[0.05] shrink-0">
            <div className="flex items-center gap-5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ 
                  background: `linear-gradient(135deg, ${service.accent}, ${service.accent}DD)`,
                  boxShadow: `0 8px 24px ${service.accent}35` 
                }}
              >
                <Icon size={24} color="#ffffff" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-wider">
                    Service {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="text-[10px] font-mono font-bold tracking-wider" style={{ color: service.accent }}>
                    NODE_ACTIVE
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">{service.title}</h2>
              </div>
            </div>
            <DialogClose className="w-12 h-12 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:rotate-90 transition-all duration-300 shrink-0">
              <X size={18} className="text-white/40" strokeWidth={1.5} />
            </DialogClose>
          </div>

          {/* Body - Wide layout */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.05] min-h-0">
              
              {/* Main Content */}
              <div className="p-8 lg:p-12 space-y-10">
                {/* Executive Summary */}
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/15 mb-5">Executive Summary</h4>
                  <p className="text-[1rem] lg:text-[1.1rem] text-white/50 leading-[1.9] italic">
                    &ldquo;{service.description}&rdquo;
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${service.accent}25, transparent 60%)` }} />

                {/* Tagline */}
                <div>
                  <p className="text-[0.95rem] text-white/40 leading-relaxed">
                    {service.tagline}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/15 mb-5">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div 
                        key={feature}
                        className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
                        style={{ 
                          background: `${service.accent}06`, 
                          border: `1px solid ${service.accent}12` 
                        }}
                      >
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}35` }}
                        >
                          <Check size={12} style={{ color: service.accent }} strokeWidth={3} />
                        </div>
                        <span className="text-[0.88rem] text-white/60 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-6 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-[0.12em] transition-all hover:scale-105 active:scale-95"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.accent}, ${service.accent}DD)`,
                      color: '#ffffff',
                      boxShadow: `0 8px 40px ${service.accent}35`
                    }}
                  >
                    <Sparkles size={18} />
                    Get Started
                    <ArrowRight size={20} />
                  </Link>
                  <span className="text-[0.78rem] text-white/20 hover:text-white/40 cursor-pointer transition-colors">
                    or schedule a call →
                  </span>
                </div>
              </div>

              {/* Sidebar */}
              <div className="p-8 lg:p-10 flex flex-col gap-4"
                   style={{ background: `${service.accent}03` }}>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/12 mb-2">Service Perks</p>
                
                {[
                  { icon: ShieldCheck, label: "Enterprise Ready", desc: "Global scaling" },
                  { icon: Zap, label: "Delivery", desc: "Express turnaround" },
                  { icon: Clock, label: "24/7 Availability", desc: "Constant support" },
                  { icon: Users, label: "Expert Solid", desc: "Vetted professionals" },
                ].map((perk) => (
                  <div 
                    key={perk.label}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: `${service.accent}06`, border: `1px solid ${service.accent}10` }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                         style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}25` }}>
                      <perk.icon size={16} style={{ color: service.accent }} />
                    </div>
                    <div>
                      <div className="text-[0.75rem] font-bold text-white/60 uppercase tracking-wider mb-0.5">{perk.label}</div>
                      <div className="text-[0.7rem] text-white/30">{perk.desc}</div>
                    </div>
                  </div>
                ))}

                {/* Stat */}
                <div className="mt-auto pt-6 border-t border-white/[0.04]">
                  <div className="text-center p-6 rounded-xl" style={{ background: `${service.accent}08`, border: `1px solid ${service.accent}12` }}>
                    <div className="text-4xl font-black text-white mb-2">98%</div>
                    <div className="text-[9px] font-bold text-white/25 uppercase tracking-[0.2em]">Client Satisfaction</div>
                    <div className="flex justify-center gap-1 mt-2">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} style={{ color: i <= 5 ? service.accent : 'rgba(255,255,255,0.1)' }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <style jsx>{`
        @keyframes scan {
          0% { backgroundPosition: 0% -100%; }
          100% { backgroundPosition: 0% 200%; }
        }
      `}</style>
    </Dialog>
  );
}