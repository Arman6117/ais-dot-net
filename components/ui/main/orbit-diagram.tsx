// components/ui/orbit-diagram.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Target, FileText, BookOpen, Database, BarChart3, 
  GraduationCap, Briefcase, Handshake, Sparkles, Atom
} from "lucide-react";

// Inner nodes - Core PhD Services
const nodes = [
  { 
    r: 120, angle: 270, 
    icon: Target, 
    label: "Topic Selection", 
    color: "#60A5FA", // lighter blue for better contrast
    bg: "rgba(96,165,250,0.2)", 
    border: "rgba(96,165,250,0.5)" 
  },
  { 
    r: 120, angle: 342, 
    icon: FileText, 
    label: "Proposal Writing", 
    color: "#818CF8", // lighter indigo
    bg: "rgba(129,140,248,0.2)", 
    border: "rgba(129,140,248,0.5)" 
  },
  { 
    r: 120, angle: 54, 
    icon: BookOpen, 
    label: "Literature Review", 
    color: "#A78BFA", // lighter violet
    bg: "rgba(167,139,250,0.2)", 
    border: "rgba(167,139,250,0.5)" 
  },
  { 
    r: 120, angle: 126, 
    icon: Database, 
    label: "Data Collection", 
    color: "#C084FC", // lighter purple
    bg: "rgba(192,132,252,0.2)", 
    border: "rgba(192,132,252,0.5)" 
  },
  { 
    r: 120, angle: 198, 
    icon: BarChart3, 
    label: "Data Analytics", 
    color: "#22D3EE", // lighter cyan
    bg: "rgba(34,211,238,0.2)", 
    border: "rgba(34,211,238,0.5)" 
  },
];

// Outer nodes - Key Pillars
const outerNodes = [
  { 
    r: 195, angle: 315, 
    icon: GraduationCap, 
    label: "SCHOLAR", 
    color: "#2DD4BF",
    bg: "rgba(45,212,191,0.15)", 
    border: "rgba(45,212,191,0.4)" 
  },
  { 
    r: 195, angle: 45, 
    icon: Briefcase, 
    label: "CORPORATE", 
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.15)", 
    border: "rgba(251,191,36,0.4)" 
  },
  { 
    r: 195, angle: 135, 
    icon: Handshake, 
    label: "PARTNER", 
    color: "#F472B6",
    bg: "rgba(244,114,182,0.15)", 
    border: "rgba(244,114,182,0.4)" 
  },
  { 
    r: 195, angle: 225, 
    icon: Sparkles, 
    label: "QUALITY", 
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.15)", 
    border: "rgba(167,139,250,0.4)" 
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
    gsap.to(ring1Ref.current, { 
      rotation: 360, 
      duration: 30, 
      ease: "none", 
      repeat: -1, 
      transformOrigin: "50% 50%" 
    });
    
    gsap.to(ring2Ref.current, { 
      rotation: -360, 
      duration: 45, 
      ease: "none", 
      repeat: -1, 
      transformOrigin: "50% 50%" 
    });

    gsap.to(centerRef.current, {
      scale: 1.05,
      duration: 2.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.to(n, {
        y: -8,
        duration: 3 + i * 0.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.15,
      });
    });

    outerNodeRefs.current.forEach((n, i) => {
      if (!n) return;
      gsap.to(n, {
        y: 6,
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
      {/* Outer atmospheric glow */}
      <div className="absolute inset-[-30px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F630, transparent)" }} />

      {/* Main radial glow */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.04) 50%, transparent 80%)" }} />

      {/* Static reference rings */}
      <div className="absolute rounded-full"
        style={{ width: 240, height: 240, top: C-120, left: C-120, border: "1px solid rgba(59,130,246,0.15)" }} />
      <div className="absolute rounded-full"
        style={{ width: 390, height: 390, top: C-195, left: C-195, border: "1px solid rgba(139,92,246,0.1)" }} />

      {/* Animated dashed rings */}
      <div ref={ring1Ref} className="absolute rounded-full"
        style={{ width: 240, height: 240, top: C-120, left: C-120, 
          border: "2px dashed rgba(59,130,246,0.3)", borderRadius: "50%" }} />
      
      <div ref={ring2Ref} className="absolute rounded-full"
        style={{ width: 390, height: 390, top: C-195, left: C-195, 
          border: "1.5px dashed rgba(139,92,246,0.2)", borderRadius: "50%" }} />

      {/* Center node - PhD Hub */}
      <div 
        ref={centerRef} 
        className="absolute rounded-full z-30 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
        style={{ 
          width: 90, height: 90, top: C-45, left: C-45,
          background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #A855F7 100%)",
          boxShadow: "0 0 0 12px rgba(59,130,246,0.1), 0 0 0 24px rgba(139,92,246,0.05), 0 0 30px 5px rgba(59,130,246,0.2)",
          border: "1.5px solid rgba(255,255,255,0.2)",
        }}>
        <Atom size={28} strokeWidth={1.5} color="white" className="mb-1" />
        <span className="text-white font-bold text-[0.7rem] tracking-[0.15em]">PHD</span>
      </div>

      {/* Inner orbit nodes - Core Services */}
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
                boxShadow: `0 4px 12px ${node.border}30`
              }}>
              <Icon size={22} strokeWidth={1.6} color={node.color} />
            </div>
            
            {/* Clean, readable text with solid background */}
            <span className="px-2 py-0.5 rounded-md font-semibold whitespace-nowrap text-[0.65rem] tracking-wide"
              style={{ 
                color: "#FFFFFF", 
                background: "rgba(0,0,0,0.75)",
                border: `0.5px solid ${node.color}50`
              }}>
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Outer orbit nodes - Key Pillars */}
      {outerNodes.map((node, i) => {
        const { x, y } = polar(node.r, node.angle);
        const Icon = node.icon;
        const NS = 44;
        return (
          <div key={node.label}
            ref={el => { outerNodeRefs.current[i] = el; }}
            className="absolute z-15 flex flex-col items-center gap-1 cursor-pointer group"
            style={{ width: NS, left: C + x - NS/2, top: C + y - NS/2 }}>
            
            <div className="rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
              style={{ 
                width: NS, height: NS, 
                background: node.bg, 
                border: `1px solid ${node.border}`,
              }}>
              <Icon size={18} strokeWidth={1.5} color={node.color} />
            </div>
            
            {/* Clean, readable outer text */}
            <span className="text-[0.55rem] font-bold tracking-[0.1em]"
              style={{ color: "#FFFFFF", textShadow: "0 0 4px rgba(0,0,0,0.5)" }}>
              {node.label}
            </span>
          </div>
        );
      })}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
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
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              strokeDasharray="3 5"
              opacity="0.4"
            />
          );
        })}
      </svg>

      {/* Orbital electrons */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 120*2, height: 120*2, top: C-120, left: C-120 }}>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            animation: "orbit 10s linear infinite",
          }} />
      </div>

      <div className="absolute rounded-full pointer-events-none" style={{ width: 195*2, height: 195*2, top: C-195, left: C-195 }}>
        <div className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
          style={{
            animation: "orbit-reverse 14s linear infinite",
          }} />
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(195px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(195px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}