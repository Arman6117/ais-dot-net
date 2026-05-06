"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { 
  Database, Brain, GraduationCap, Users, 
  BarChart3, LineChart, Globe, Briefcase,
  Star, ArrowRight, Sparkles, Play, Pause
} from "lucide-react";
import Link from "next/link";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const services = [
  { icon: Database, title: "Data Collection Survey", color: "#3B82F6", gif: "/gifs/data-collection.gif" },
  { icon: Brain, title: "AI & ML Service", color: "#8B5CF6", gif: "/gifs/ai-ml.gif" },
  { icon: GraduationCap, title: "PhD Assistance & Guidance", color: "#10B981", gif: "/gifs/phd-assistance.gif" },
  { icon: Users, title: "Corporate Training & Workshops", color: "#F59E0B", gif: "/gifs/corporate-training.gif" },
  { icon: BarChart3, title: "Data Analytics", color: "#06B6D4", gif: "/gifs/data-analytics.gif" },
  { icon: LineChart, title: "Statistical Analysis", color: "#EC4899", gif: "/gifs/statistical-analysis.gif" },
  { icon: Globe, title: "Web Development", color: "#6366F1", gif: "/gifs/web-development.gif" },
  { icon: Briefcase, title: "Internship Opportunities", color: "#14B8A6", gif: "/gifs/internship.gif" },
];

const stats = [
  { value: "4.9", label: "Stars reviews given by satisfied clients", suffix: "★", color: "#F59E0B" },
  { value: "99%", label: "Success in getting happy customers", color: "#10B981" },
  { value: "25K+", label: "Thousands of successful businesses", color: "#3B82F6" },
  { value: "120+", label: "Total clients who love AIS Solutions", color: "#8B5CF6" },
];

export default function ServicesHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [activeService, setActiveService] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate services
  useEffect(() => {
    if (!isPlaying) return;
    intervalRef.current = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(line1Ref.current,
        { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.3")
      .fromTo(line2Ref.current,
        { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
      .fromTo(subRef.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.3")
      .fromTo(showcaseRef.current,
        { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
      .fromTo(statsRef.current,
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");
  }, []);

  // GSAP animation on service change
  useEffect(() => {
    if (!showcaseRef.current) return;
    gsap.fromTo(showcaseRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [activeService]);

  const currentService = services[activeService];
  const Icon = currentService.icon;

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative min-h-screen flex flex-col justify-center overflow-hidden font-sans`}
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 30%, #0f0f1a 60%, #0a0a14 100%)",
      }}
    >
      {/* ── ANIMATED BACKGROUND ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${currentService.color}40, transparent)`,
            transition: "background 1s ease",
          }}
        />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ 
            background: `radial-gradient(circle, ${services[(activeService + 1) % services.length].color}30, transparent)`,
            transition: "background 1s ease",
          }}
        />

        {/* Moving gradient lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-full"
              style={{
                top: `${20 + i * 20}%`,
                background: `linear-gradient(90deg, transparent, ${currentService.color}, transparent)`,
                animation: `shimmer ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: currentService.color,
                opacity: 0.3,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Hexagon grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 15v22L30 52 0 37V15z" fill="none" stroke={currentService.color} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT - Text Content */}
          <div>
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-8 opacity-0">
              <div className="w-8 h-[2px] rounded-full" style={{ background: currentService.color }} />
              <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase" style={{ color: currentService.color }}>
                What We Do
              </span>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <div ref={line1Ref} className="opacity-0">
                <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.03em] text-white">
                  Services built
                </h1>
              </div>
            </div>
            <div className="overflow-hidden mb-8">
              <div ref={line2Ref} className="opacity-0">
                <h1 className="font-[family-name:var(--font-serif)] italic text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.03em]"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentService.color}, ${services[(activeService + 1) % services.length].color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "all 1s ease",
                  }}
                >
                  specifically for you.
                </h1>
              </div>
            </div>

            {/* Sub + badge */}
            <div className="flex flex-wrap items-end gap-6">
              <div ref={subRef} className="opacity-0 max-w-[440px]">
                <p className="text-[0.9rem] text-white/35 leading-[1.8]">
                  From raw data to published research — we cover every step of the journey with precision, care, and expertise.
                </p>
              </div>
              <div ref={badgeRef} className="opacity-0 flex items-center gap-3">
                <Link
                  href="#services-grid"
                  className="group px-5 py-2.5 rounded-full text-[0.7rem] font-bold tracking-[0.06em] transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{ 
                    background: `${currentService.color}15`, 
                    border: `1px solid ${currentService.color}30`,
                    color: currentService.color,
                  }}
                >
                  <Sparkles size={12} />
                  8 Services
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                {/* Play/Pause button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {isPlaying ? <Pause size={12} className="text-white/60" /> : <Play size={12} className="text-white/60" />}
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div ref={statsRef} className="opacity-0 mt-14">
              <p className="text-white/15 text-[0.6rem] font-bold tracking-[0.3em] uppercase mb-5">
                Results that speak for themselves
              </p>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="group relative p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-xl font-black text-white tracking-tight">{stat.value}</span>
                      {stat.suffix && <span style={{ color: stat.color }} className="text-sm">{stat.suffix}</span>}
                    </div>
                    <div className="text-[0.6rem] text-white/25 leading-relaxed">{stat.label}</div>
                    
                    {/* Progress bar on hover */}
                    <div className="mt-2 h-0.5 w-full rounded-full bg-white/[0.03] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 group-hover:w-full"
                        style={{ 
                          width: "0%",
                          background: stat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Service Showcase */}
          <div ref={showcaseRef} className="opacity-0 relative">
            {/* Main showcase card */}
            <div className="relative group">
              {/* Glow effect */}
              <div 
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 transition-all duration-1000"
                style={{ background: currentService.color }}
              />
              
              {/* Card */}
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/3]"
                style={{
                  background: `linear-gradient(145deg, ${currentService.color}10, ${currentService.color}05)`,
                  border: `1px solid ${currentService.color}20`,
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Top gradient bar */}
                <div 
                  className="h-1 w-full"
                  style={{ 
                    background: `linear-gradient(90deg, transparent, ${currentService.color}, transparent)`,
                  }}
                />

                {/* Content area - placeholder for GIF/image */}
                <div className="relative flex items-center justify-center h-full p-8">
                  {/* Animated icon with rings */}
                  <div className="relative">
                    {/* Outer ring */}
                    <div 
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{ 
                        border: `2px solid ${currentService.color}20`,
                        borderTopColor: currentService.color,
                        width: "120px",
                        height: "120px",
                        top: "-20px",
                        left: "-20px",
                      }}
                    />
                    {/* Middle ring */}
                    <div 
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{ 
                        border: `2px solid ${currentService.color}15`,
                        borderBottomColor: currentService.color,
                        width: "90px",
                        height: "90px",
                        top: "-5px",
                        left: "-5px",
                        animationDirection: "reverse",
                        animationDuration: "3s",
                      }}
                    />
                    
                    {/* Icon container */}
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: `linear-gradient(135deg, ${currentService.color}20, ${currentService.color}10)`,
                        border: `1px solid ${currentService.color}30`,
                        boxShadow: `0 8px 32px ${currentService.color}20`,
                      }}
                    >
                      <Icon size={36} style={{ color: currentService.color }} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Service info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background: `linear-gradient(transparent, rgba(0,0,0,0.8))`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">
                      Click to explore
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{currentService.title}</h3>
                  <p className="text-xs text-white/40">
                    Comprehensive {currentService.title.toLowerCase()} solutions tailored to your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Service navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {services.map((service, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveService(i);
                    setIsPlaying(false);
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeService ? "24px" : "6px",
                    height: "6px",
                    background: i === activeService ? service.color : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-10%); }
          50% { opacity: 0.6; transform: translateX(10%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
          50% { transform: translateY(-10px) translateX(20px); opacity: 0.2; }
          75% { transform: translateY(-30px) translateX(-10px); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}