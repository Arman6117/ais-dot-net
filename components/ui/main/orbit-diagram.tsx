// components/ui/orbit-diagram.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Target, FileText, BookOpen, Database, BarChart3, 
  GraduationCap, Briefcase, Handshake, Atom, Sparkles
} from "lucide-react";

// Simplified nodes - only core PhD services
const nodes = [
  { 
    r: 120, angle: 270, 
    icon: Target, 
    label: "Topic Selection", 
    color: "#1A56DB", 
    bg: "rgba(26,86,219,0.12)", 
    border: "rgba(26,86,219,0.35)", 
    glow: "rgba(26,86,219,0.25)" 
  },
  { 
    r: 120, angle: 342, 
    icon: FileText, 
    label: "Proposal Writing", 
    color: "#3B82F6", 
    bg: "rgba(59,130,246,0.12)", 
    border: "rgba(59,130,246,0.35)", 
    glow: "rgba(59,130,246,0.25)" 
  },
  { 
    r: 120, angle: 54, 
    icon: BookOpen, 
    label: "Literature Review", 
    color: "#6366F1", 
    bg: "rgba(99,102,241,0.12)", 
    border: "rgba(99,102,241,0.35)", 
    glow: "rgba(99,102,241,0.25)" 
  },
  { 
    r: 120, angle: 126, 
    icon: Database, 
    label: "Data Collection", 
    color: "#8B5CF6", 
    bg: "rgba(139,92,246,0.12)", 
    border: "rgba(139,92,246,0.35)", 
    glow: "rgba(139,92,246,0.25)" 
  },
  { 
    r: 120, angle: 198, 
    icon: BarChart3, 
    label: "Data Analytics", 
    color: "#10B981", 
    bg: "rgba(16,185,129,0.12)", 
    border: "rgba(16,185,129,0.35)", 
    glow: "rgba(16,185,129,0.25)" 
  },
];

// Simplified outer - just 4 key pillars
const outerNodes = [
  { 
    r: 195, angle: 315, 
    icon: GraduationCap, 
    label: "Scholar", 
    color: "#06B6D4", 
    bg: "rgba(6,182,212,0.10)", 
    border: "rgba(6,182,212,0.30)" 
  },
  { 
    r: 195, angle: 45, 
    icon: Briefcase, 
    label: "Corporate", 
    color: "#F59E0B", 
    bg: "rgba(245,158,11,0.10)", 
    border: "rgba(245,158,11,0.30)" 
  },
  { 
    r: 195, angle: 135, 
    icon: Handshake, 
    label: "Partner", 
    color: "#EC4899", 
    bg: "rgba(236,72,153,0.10)", 
    border: "rgba(236,72,153,0.30)" 
  },
  { 
    r: 195, angle: 225, 
    icon: Sparkles, 
    label: "Quality", 
    color: "#14B8A6", 
    bg: "rgba(20,184,166,0.10)", 
    border: "rgba(20,184,166,0.30)" 
  },
];

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

export default function OrbitDiagram() {
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerNodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Rotating rings at different speeds
    gsap.to(ring1Ref.current, { rotation: 360, duration: 30, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 45, ease: "none", repeat: -1, transformOrigin: "50% 50%" });

    // Pulsing center effect
    gsap.to(centerRef.current, {
      scale: 1.03,
      duration: 2.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Gentle floating for inner nodes
    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.to(n, {
        y: -6,
        duration: 3 + i * 0.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.15,
      });
    });

    // Gentle floating for outer nodes
    outerNodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.to(n, {
        y: 5,
        duration: 3.5 + i * 0.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      });
    });
  }, []);

  const S = 480;
  const C = S / 2;

  return (
    <div className="relative" style={{ width: S, height: S }}>
      {/* Outer glow */}
      <div className="absolute inset-[-30px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #1A56DB30, transparent)" }} />

      {/* Main radial glow */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(26,86,219,0.08) 0%, transparent 70%)" }} />

      {/* Static rings */}
      <div className="absolute rounded-full"
        style={{ width: 240, height: 240, top: C-120, left: C-120, border: "1px solid rgba(26,86,219,0.12)" }} />
      <div className="absolute rounded-full"
        style={{ width: 390, height: 390, top: C-195, left: C-195, border: "1px solid rgba(26,86,219,0.08)" }} />

      {/* Animated dashed rings */}
      <div ref={ring1Ref} className="absolute rounded-full"
        style={{ width: 240, height: 240, top: C-120, left: C-120, 
          border: "2px dashed rgba(26,86,219,0.25)", borderRadius: "50%" }} />
      
      <div ref={ring2Ref} className="absolute rounded-full"
        style={{ width: 390, height: 390, top: C-195, left: C-195, 
          border: "1.5px dashed rgba(26,86,219,0.15)", borderRadius: "50%" }} />

      {/* Center node - PhD Hub */}
      <div 
        ref={centerRef} 
        className="absolute rounded-full z-30 flex flex-col items-center justify-center cursor-pointer"
        style={{ 
          width: 90, height: 90, top: C-45, left: C-45,
          background: "linear-gradient(135deg, #1A56DB 0%, #3b7de8 100%)",
          boxShadow: "0 0 0 12px rgba(26,86,219,0.08), 0 0 0 25px rgba(26,86,219,0.04), 0 0 30px 5px rgba(26,86,219,0.15)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
        <Atom size={28} strokeWidth={1.5} color="white" className="mb-1" />
        <span className="text-white font-bold text-[0.65rem] tracking-[0.15em]">PhD</span>
      </div>

      {/* Inner orbit nodes - Core Services (5 items) */}
      {nodes.map((node, i) => {
        const { x, y } = polar(node.r, node.angle);
        const Icon = node.icon;
        const NS = 54;
        return (
          <div key={node.label}
            ref={el => { nodeRefs.current[i] = el; }}
            className="absolute z-20 flex flex-col items-center gap-1.5 cursor-pointer group"
            style={{ width: NS, left: C + x - NS/2, top: C + y - NS/2 }}>
            
            <div className="rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{ 
                width: NS, height: NS, 
                background: node.bg, 
                border: `1.5px solid ${node.border}`,
                boxShadow: `0 4px 16px ${node.glow}`
              }}>
              <Icon size={22} strokeWidth={1.6} color={node.color} />
            </div>
            
            <span className="px-2 py-0.5 rounded-full font-medium whitespace-nowrap text-[0.5rem] tracking-[0.08em] opacity-80 group-hover:opacity-100 transition-all duration-300"
              style={{ color: node.color }}>
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Outer orbit nodes - 4 Pillars */}
      {outerNodes.map((node, i) => {
        const { x, y } = polar(node.r, node.angle);
        const Icon = node.icon;
        const NS = 44;
        return (
          <div key={node.label}
            ref={el => { outerNodeRefs.current[i] = el; }}
            className="absolute z-15 flex flex-col items-center gap-1 cursor-pointer group"
            style={{ width: NS, left: C + x - NS/2, top: C + y - NS/2 }}>
            
            <div className="rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-105"
              style={{ 
                width: NS, height: NS, 
                background: node.bg, 
                border: `1px solid ${node.border}`,
              }}>
              <Icon size={18} strokeWidth={1.5} color={node.color} />
            </div>
            
            <span className="text-[0.4rem] tracking-[0.1em] uppercase opacity-60 group-hover:opacity-100 transition-all duration-300"
              style={{ color: node.color }}>
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Subtle connecting lines (only to show relationship) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A56DB" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1A56DB" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {nodes.map((node, i) => {
          const { x, y } = polar(node.r, node.angle);
          return (
            <line
              key={`line-${i}`}
              x1={C}
              y1={C}
              x2={C + x}
              y2={C + y}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="3 5"
              opacity="0.3"
            />
          );
        })}
      </svg>

      {/* Single orbital electron for visual interest */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 120*2, height: 120*2, top: C-120, left: C-120 }}>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#1A56DB]/60 blur-[0.5px]"
          style={{
            animation: "orbit 10s linear infinite",
          }} />
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}