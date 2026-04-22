"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Eye, Target,
  GraduationCap, Briefcase, FlaskConical, Handshake, Atom,
} from "lucide-react";

const nodes = [
  { r: 80,  angle: 300, icon: GraduationCap, label: "Scholar",  color: "#1A56DB", bg: "rgba(26,86,219,0.10)",  border: "rgba(26,86,219,0.28)",  glow: "rgba(26,86,219,0.20)"  },
  { r: 80,  angle: 120, icon: Briefcase,     label: "Business", color: "#0ea5e9", bg: "rgba(14,165,233,0.10)", border: "rgba(14,165,233,0.28)", glow: "rgba(14,165,233,0.20)" },
  { r: 138, angle: 205, icon: FlaskConical,  label: "Research", color: "#6366f1", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.28)", glow: "rgba(99,102,241,0.20)" },
  { r: 138, angle: 35,  icon: Handshake,     label: "Partner",  color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.28)", glow: "rgba(16,185,129,0.20)" },
];

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

export default function MissionVision() {
  const ring1Ref  = useRef<HTMLDivElement>(null);
  const ring2Ref  = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const nodeRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(ring1Ref.current,  { rotation:  360, duration: 20, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    gsap.to(ring2Ref.current,  { rotation: -360, duration: 30, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

    gsap.to(centerRef.current, {
      boxShadow: "0 0 0 14px rgba(26,86,219,0.04), 0 0 36px 6px rgba(26,86,219,0.10)",
      duration: 2.2, ease: "power1.inOut", repeat: -1, yoyo: true,
    });

    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.to(n, {
        y: i % 2 === 0 ? -5 : 5,
        duration: 2.4 + i * 0.35,
        ease: "power1.inOut",
        repeat: -1, yoyo: true,
        delay: i * 0.25,
      });
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const S = 360;
  const C = S / 2;

  return (
    /* Outer wrapper — relative so orbit (absolute) anchors to it */
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: S }}>

      {/* ── ORBIT — absolute, centered, very low opacity ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.42 }}
      >
        <div style={{ width: S, height: S, position: "relative", flexShrink: 0 }}>

          {/* Radial glow */}
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(26,86,219,0.10) 0%, transparent 70%)" }} />

          {/* Ghost rings */}
          {[80, 138].map(r => (
            <div key={r} className="absolute rounded-full"
              style={{ width: r*2, height: r*2, top: C-r, left: C-r, border: "1px solid rgba(26,86,219,0.12)" }} />
          ))}

          {/* Animated dashed ring — inner CW */}
          <div ref={ring1Ref} className="absolute rounded-full"
            style={{ width: 80*2, height: 80*2, top: C-80, left: C-80, border: "1.5px dashed rgba(26,86,219,0.35)" }} />

          {/* Animated dashed ring — outer CCW */}
          <div ref={ring2Ref} className="absolute rounded-full"
            style={{ width: 138*2, height: 138*2, top: C-138, left: C-138, border: "1.5px dashed rgba(26,86,219,0.22)" }} />

          {/* Center node */}
          <div ref={centerRef}
            className="absolute rounded-full z-20 flex items-center justify-center"
            style={{
              width: 60, height: 60,
              top: C-30, left: C-30,
              background: "linear-gradient(135deg, #1A56DB 0%, #3b7de8 100%)",
              boxShadow: "0 0 0 10px rgba(26,86,219,0.06), 0 0 28px 5px rgba(26,86,219,0.14)",
            }}>
            <Atom size={26} strokeWidth={1.4} color="white" />
          </div>

          {/* Orbital icon nodes */}
          {nodes.map((node, i) => {
            const { x, y } = polar(node.r, node.angle);
            const Icon = node.icon;
            const NS = 48;
            return (
              <div key={node.label}
                ref={el => { nodeRefs.current[i] = el; }}
                className="absolute z-10 flex flex-col items-center gap-1"
                style={{ width: NS, left: C + x - NS/2, top: C + y - NS/2 }}>
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: NS, height: NS,
                    background: node.bg,
                    border: `1.5px solid ${node.border}`,
                    boxShadow: `0 4px 18px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`,
                  }}>
                  <Icon size={19} strokeWidth={1.6} color={node.color} />
                </div>
                <span className="px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap"
                  style={{
                    fontSize: "0.45rem", letterSpacing: "0.08em",
                    background: node.bg, color: node.color, border: `1px solid ${node.border}`,
                  }}>
                  {node.label.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TEXT — sits on top of the orbit, z-10 ── */}
      <div className="relative z-10 w-full flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10">

        {/* Vision */}
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.14)" }}>
              <Eye size={15} strokeWidth={1.5} className="text-[#1A56DB]" />
            </div>
            <h2 className="font-serif italic text-xl md:text-2xl text-[#111]">Our Vision</h2>
          </div>
          <div className="w-7 h-[2px] bg-[#1A56DB] opacity-35 mb-3" />
          <p className="text-[0.82rem] text-black/55 leading-relaxed max-w-sm">
            <span className="font-semibold text-[#1A56DB]">Our Vision</span> is to be a leading partner for corporates and scholars alike — empowering innovation, growth, and academic excellence through data-driven insights and strategic research.
          </p>
        </div>

        <div className="w-full h-px bg-black/6 max-w-sm" />

        {/* Mission */}
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.14)" }}>
              <Target size={15} strokeWidth={1.5} className="text-[#1A56DB]" />
            </div>
            <h2 className="font-serif italic text-xl md:text-2xl text-[#111]">Our Mission</h2>
          </div>
          <div className="w-7 h-[2px] bg-[#1A56DB] opacity-35 mb-3" />
          <p className="text-[0.82rem] text-black/55 leading-relaxed max-w-sm">
            <span className="font-semibold text-[#1A56DB]">Our Mission</span> is to deliver data-driven insights and strategic research support to businesses, while providing scholars with structured guidance and expert document reviews for academic success.
          </p>
        </div>

      </div>
    </div>
  );
}