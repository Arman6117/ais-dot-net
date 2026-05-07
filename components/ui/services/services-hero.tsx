"use client";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowRight, ChevronRight, Play, Pause, Database, Brain, GraduationCap, Users, BarChart3, LineChart, Globe, Briefcase } from "lucide-react";
import * as Anims from "@/components/ui/animations/service-animations";

const instrumentSerif = Instrument_Serif({ 
  weight: "400", style: ["italic"], subsets: ["latin"], variable: "--font-serif" 
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const services = [
  { 
    title: "Data Collection Survey", 
    shortTitle: "Data Collection",
    color: "#3B82F6", 
    icon: Database,
    component: Anims.DataCollectionAnim, 
    desc: "High-fidelity data acquisition and systematic survey methodologies for research integrity.",
    tag: "Field Research"
  },
  { 
    title: "AI & ML Service", 
    shortTitle: "AI & ML",
    color: "#8B5CF6", 
    icon: Brain,
    component: Anims.AIMLAnim, 
    desc: "Neural architectures and predictive modeling for institutional research advancement.",
    tag: "Deep Learning"
  },
  { 
    title: "PhD Assistance & Guidance", 
    shortTitle: "PhD Assistance",
    color: "#10B981", 
    icon: GraduationCap,
    component: Anims.PhDGuidanceAnim, 
    desc: "Complete doctoral support from topic selection to successful thesis defense.",
    tag: "Academic"
  },
  { 
    title: "Corporate Training & Workshops", 
    shortTitle: "Corporate Training",
    color: "#F59E0B", 
    icon: Users,
    component: Anims.CorporateTrainingAnim, 
    desc: "Strategic workshop deployment for workforce upskilling and research capabilities.",
    tag: "Enterprise"
  },
  { 
    title: "Data Analytics", 
    shortTitle: "Data Analytics",
    color: "#06B6D4", 
    icon: BarChart3,
    component: Anims.DataAnalyticsAnim, 
    desc: "Converting complex datasets into actionable insights for informed decision-making.",
    tag: "Insights"
  },
  { 
    title: "Statistical Analysis", 
    shortTitle: "Statistics",
    color: "#EC4899", 
    icon: LineChart,
    component: Anims.StatisticalAnalysisAnim, 
    desc: "Rigorous mathematical validation and statistical modeling of research hypotheses.",
    tag: "Mathematics"
  },
  { 
    title: "Web Development", 
    shortTitle: "Web Dev",
    color: "#6366F1", 
    icon: Globe,
    component: Anims.WebDevAnim, 
    desc: "Architecting high-performance digital platforms for research dissemination.",
    tag: "Technology"
  },
  { 
    title: "Internship Opportunities", 
    shortTitle: "Internships",
    color: "#14B8A6", 
    icon: Briefcase,
    component: Anims.InternshipAnim, 
    desc: "Bridge programs connecting academic excellence with real-world industry experience.",
    tag: "Career"
  },
];

export default function ServicesHero() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 4500);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startCycle();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, startCycle]);

  useEffect(() => {
    gsap.fromTo(".anim-stage", 
      { opacity: 0, scale: 0.95, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
    );
  }, [active]);

  const currentService = services[active];

  return (
    <section 
      ref={containerRef} 
      className={`${instrumentSerif.variable} ${mono.variable} relative min-h-screen bg-[#020204] text-white flex items-center overflow-hidden font-sans`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
      />
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center py-20">
        
        {/* LEFT - Service List */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-500/20 rounded-full bg-blue-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-blue-400 uppercase">
                IT Services
              </span>
            </div>
            <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Precision <br />
              <span className="text-white/15">Architected.</span>
            </h1>
          </div>

          {/* Service List */}
          <div className="space-y-1">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isActive = active === idx;
              const isHovered = hoveredService === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => { setActive(idx); setIsPlaying(false); }}
                  onMouseEnter={() => { setHoveredService(idx); setIsPlaying(false); }}
                  onMouseLeave={() => { setHoveredService(null); setIsPlaying(true); }}
                  className={`group relative w-full text-left rounded-xl transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? "bg-white/[0.06] translate-x-3" 
                      : "hover:bg-white/[0.03] hover:translate-x-1"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition-colors duration-500"
                      style={{ backgroundColor: service.color }}
                    />
                  )}

                  <div className="flex items-center gap-4 p-3.5 pl-5">
                    {/* Number + Icon */}
                    <div className="flex items-center gap-3 min-w-[60px]">
                      <span className={`font-mono text-[11px] transition-colors duration-300 ${
                        isActive ? "text-white/60" : "text-white/20"
                      }`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <Icon 
                        size={18} 
                        strokeWidth={1.5}
                        style={{ color: isActive ? service.color : 'rgba(255,255,255,0.2)' }}
                        className="transition-colors duration-300"
                      />
                    </div>

                    {/* Title + Tag */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold tracking-wide transition-colors duration-300 truncate ${
                          isActive ? "text-white" : "text-white/40"
                        }`}>
                          {service.shortTitle}
                        </span>
                        {isActive && (
                          <span 
                            className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                            style={{ 
                              backgroundColor: `${service.color}20`, 
                              color: service.color,
                              border: `1px solid ${service.color}30`
                            }}
                          >
                            {service.tag}
                          </span>
                        )}
                      </div>
                      
                      {/* Description on hover/active */}
                      <div className={`overflow-hidden transition-all duration-400 ${
                        isActive || isHovered ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0"
                      }`}>
                        <p className="text-[11px] text-white/30 leading-relaxed truncate">
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight 
                      size={16} 
                      className={`transition-all duration-300 shrink-0 ${
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                      style={{ color: service.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT - Dashboard */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div className="relative w-full aspect-square max-w-[560px]">
            {/* Ambient glow */}
            <div 
              className="absolute inset-0 blur-[120px] opacity-15 rounded-full transition-colors duration-1000"
              style={{ backgroundColor: currentService.color }} 
            />
            
            {/* Console Card */}
            <div className="absolute inset-0 rounded-[40px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-3xl p-10 lg:p-12 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Top Bar */}
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">Active Module</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse" 
                      style={{ backgroundColor: currentService.color }} 
                    />
                    <span 
                      className="font-mono text-[10px] tracking-wider"
                      style={{ color: currentService.color }}
                    >
                      {currentService.shortTitle.toUpperCase().replace(/\s/g, "_")}
                    </span>
                  </div>
                </div>
                
                {/* Play/Pause */}
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/[0.06]"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>

              {/* Animation Stage */}
              <div className="anim-stage flex-1 flex items-center justify-center py-8">
                <div className="w-full max-w-[300px]">
                  {services.map((s, i) => 
                    i === active ? <s.component key={`anim-${i}`} color={s.color} /> : null
                  )}
                </div>
              </div>

              {/* Bottom Info */}
              <div className="space-y-5">
                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/[0.02] to-transparent" />
                
                {/* Service Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{currentService.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {currentService.desc}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-white/15 tracking-wider">
                      {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                  </div>
                  <button className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                    Explore Service 
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Corner accent */}
              <div 
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ backgroundColor: currentService.color }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}