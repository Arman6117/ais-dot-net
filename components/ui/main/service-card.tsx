"use client";
import { ArrowRight, Sparkles, Target, FileText, BookOpen, Database, BarChart, MessageSquare, Send, Shield, CheckCircle, Brain, Compass, PenTool, Layers, TrendingUp, Award } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    items: string[];
  };
}

// Creative icon mapping with unique graphics per service
function getServiceIcon(title: string, isHovered: boolean) {
  const iconMap: Record<string, { icon: React.ElementType; gradient: string; animation: string }> = {
    "Topic Selection": { 
      icon: Compass, 
      gradient: "from-cyan-400 to-blue-500",
      animation: "rotate-glow"
    },
    "Proposal Writing": { 
      icon: PenTool, 
      gradient: "from-purple-400 to-pink-500",
      animation: "pulse-write"
    },
    "Literature Review": { 
      icon: BookOpen, 
      gradient: "from-emerald-400 to-teal-500",
      animation: "float-book"
    },
    "Data Collection": { 
      icon: Database, 
      gradient: "from-orange-400 to-red-500",
      animation: "pulse-data"
    },
    "Statistical Analysis": { 
      icon: BarChart, 
      gradient: "from-indigo-400 to-purple-600",
      animation: "bounce-chart"
    },
    "Qualitative Analysis": { 
      icon: MessageSquare, 
      gradient: "from-green-400 to-emerald-500",
      animation: "ripple"
    },
    "Journal Submission": { 
      icon: Send, 
      gradient: "from-blue-400 to-cyan-500",
      animation: "fly-up"
    },
    "Plagiarism Check": { 
      icon: Shield, 
      gradient: "from-red-400 to-rose-500",
      animation: "shield-pulse"
    },
    "Final Review": { 
      icon: Award, 
      gradient: "from-amber-400 to-yellow-500",
      animation: "star-spin"
    },
  };

  for (const [key, value] of Object.entries(iconMap)) {
    if (title.includes(key.split(" ")[0]) || title === key) {
      return value;
    }
  }
  return { icon: Sparkles, gradient: "from-gray-400 to-gray-500", animation: "sparkle" };
}

function getAccentColor(id: string) {
  const num = parseInt(id);
  if (num <= 5) return { 
    primary: "#3B82F6", 
    secondary: "#8B5CF6", 
    glow: "rgba(59,130,246,0.4)",
    dark: "#1e3a5f"
  };
  if (num <= 10) return { 
    primary: "#10B981", 
    secondary: "#14B89A", 
    glow: "rgba(16,185,129,0.4)",
    dark: "#1a3a2a"
  };
  return { 
    primary: "#F59E0B", 
    secondary: "#F97316", 
    glow: "rgba(245,158,11,0.4)",
    dark: "#3a2a1a"
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  const accent = getAccentColor(service.id);
  const { icon: Icon, gradient, animation } = getServiceIcon(service.title, isHovered);

  // 3D tilt effect
  useEffect(() => {
    if (!cardRef.current || !isHovered) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x: x * 20, y: y * 20 });
    };
    
    cardRef.current.addEventListener("mousemove", handleMouseMove);
    return () => cardRef.current?.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="service-card group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700"
      style={{ 
        height: "clamp(300px, 32vw, 380px)",
        transform: isHovered ? `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg)` : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, ${accent.primary}, ${accent.dark})`
              : `linear-gradient(145deg, #1a1a2e 0%, #0a0a15 100%)`,
          }}
        />
        
        {/* Animated particle field */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: accent.primary,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                opacity: isHovered ? 0.6 : 0.2,
              }}
            />
          ))}
        </div>

        {/* Glow orbs */}
        <div 
          className="absolute -inset-1 opacity-0 transition-opacity duration-700 blur-3xl"
          style={{ 
            opacity: isHovered ? 0.3 : 0,
            background: `radial-gradient(circle at ${mousePosition.x * 2 + 50}% ${mousePosition.y * 2 + 50}%, ${accent.primary}, transparent)`,
          }}
        />
      </div>

      {/* Animated border gradient */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
        style={{
          boxShadow: isHovered 
            ? `inset 0 0 0 2px ${accent.primary}80, 0 30px 60px rgba(0,0,0,0.5), 0 0 60px ${accent.glow}`
            : "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      />

      {/* Default state - Creative minimal */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-7 transition-all duration-500"
        style={{ opacity: isHovered ? 0 : 1 }}
      >
        {/* Decorative number with creative styling */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <div 
              className="text-[0.65rem] font-bold tracking-[0.3em] text-white/30"
              style={{ letterSpacing: "0.3em" }}
            >
              {service.id}
            </div>
            <div 
              className="absolute -bottom-1 left-0 h-px w-8 transition-all duration-300"
              style={{ background: `linear-gradient(90deg, ${accent.primary}, transparent)` }}
            />
          </div>
          
          {/* Creative corner accent */}
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full transition-all duration-300"
                style={{ 
                  background: accent.primary,
                  opacity: 0.3 + i * 0.2,
                  transform: isHovered ? "scale(1.5)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Center creative icon area */}
        <div className="flex flex-col items-center gap-5 -mt-4">
          {/* Icon with creative animation */}
          <div className="relative">
            <div 
              className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${isHovered ? animation : ""}`}
              style={{
                background: `linear-gradient(135deg, ${accent.primary}20, ${accent.secondary}10)`,
                border: `1px solid ${accent.primary}30`,
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Icon 
                size={36} 
                className="transition-all duration-500"
                style={{ 
                  color: accent.primary,
                  filter: isHovered ? `drop-shadow(0 0 12px ${accent.primary})` : "none",
                }}
              />
            </div>
            
            {/* Decorative rings */}
            <div 
              className="absolute inset-0 rounded-2xl transition-all duration-500"
              style={{
                border: `1px solid ${accent.primary}40`,
                transform: isHovered ? "scale(1.3)" : "scale(0.8)",
                opacity: isHovered ? 0 : 0.5,
              }}
            />
          </div>

          <h3 className="font-serif italic text-[1.8rem] leading-[1.2] text-white text-center drop-shadow-2xl">
            {service.title}
          </h3>

          {/* Creative CTA indicator */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-px transition-all duration-300"
                  style={{
                    width: "16px",
                    background: `linear-gradient(90deg, ${accent.primary}${60 - i * 20}, transparent)`,
                  }}
                />
              ))}
            </div>
            <span className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-white/40">
              Discover
            </span>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: "3px",
                height: "3px",
                background: accent.primary,
                opacity: 0.2 + i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hover state - Rich detailed content */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-8 transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
          backdropFilter: isHovered ? "blur(0px)" : "blur(4px)",
        }}
      >
        {/* Creative header with icon */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                boxShadow: `0 0 20px ${accent.glow}`,
              }}
            >
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <span 
                className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
                style={{ color: accent.primary }}
              >
                Service {service.id}
              </span>
              <h3 className="font-serif italic text-[1.4rem] leading-[1.2] text-white">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Creative divider */}
          <div className="flex items-center gap-2 my-4">
            <div 
              className="h-px flex-1"
              style={{ background: `linear-gradient(90deg, ${accent.primary}, transparent)` }}
            />
            <Sparkles size={12} className="text-white/40" />
            <div 
              className="h-px flex-1"
              style={{ background: `linear-gradient(270deg, ${accent.primary}, transparent)` }}
            />
          </div>

          {/* Features list with creative bullets */}
          <ul className="flex flex-col gap-3 mt-4">
            {service.items.map((item, idx) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.82rem] text-white/90 leading-relaxed group/item"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(-12px)",
                  transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.07}s`,
                }}
              >
                <div className="relative mt-1.5">
                  <div 
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover/item:scale-150"
                    style={{ 
                      background: accent.primary,
                      boxShadow: `0 0 8px ${accent.primary}`,
                    }}
                  />
                </div>
                <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Creative CTA button */}
        <a
          href="/phd-services"
          className="group/btn relative inline-flex items-center justify-between w-full mt-4 pt-4 border-t border-white/10"
        >
          <span className="text-[0.7rem] font-bold tracking-[0.1em] text-white/70 group-hover/btn:text-white transition-colors duration-300">
            EXPLORE SERVICE
          </span>
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-md transition-opacity duration-300 opacity-0 group-hover/btn:opacity-100"
              style={{ background: accent.primary }}
            />
            <div 
              className="relative w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover/btn:w-8 group-hover/btn:h-8"
              style={{
                background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
              }}
            >
              <ArrowRight size={14} className="text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </div>
          </div>
        </a>
      </div>

      {/* Creative CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes pulse-write {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); filter: drop-shadow(0 0 0px currentColor); }
          100% { transform: rotate(360deg); filter: drop-shadow(0 0 8px currentColor); }
        }
        @keyframes bounce-chart {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fly-up {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes shield-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 4px currentColor); }
        }
        @keyframes star-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .rotate-glow {
          animation: rotate-glow 2s ease-in-out infinite;
        }
        .pulse-write {
          animation: pulse-write 1.5s ease-in-out infinite;
        }
        .bounce-chart {
          animation: bounce-chart 1s ease-in-out infinite;
        }
        .fly-up {
          animation: fly-up 1s ease-in-out infinite alternate;
        }
        .shield-pulse {
          animation: shield-pulse 1.5s ease-in-out infinite;
        }
        .star-spin {
          animation: star-spin 3s linear infinite;
        }
        .ripple {
          animation: ripple 1s ease-in-out infinite;
        }
        .sparkle {
          animation: pulse-write 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}