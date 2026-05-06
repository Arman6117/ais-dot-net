"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  PenLine,
  ClipboardCheck,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import Eyebrow from "@/components/eyebrow";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const steps = [
  {
    icon: Search,
    title: "Research",
    shortDesc: "Deep insights, informed decisions",
    desc: "Access comprehensive research services that deliver valuable insights across academic, industrial, and scientific fields. Our expertise helps you make informed decisions and achieve your objectives with precision.",
    accent: "#3B82F6",
    cardBg: "linear-gradient(135deg, #0F172A 0%, #1E3B4F 30%, #1A2744 60%, #0F1B2D 100%)",
    cardGradient: "radial-gradient(ellipse at 80% 20%, #3B82F630 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #1E40AF20 0%, transparent 50%)",
    cardBorder: "rgba(59, 130, 246, 0.3)",
    cardGlow: "#3B82F640",
    glassBg: "rgba(59, 130, 246, 0.08)",
    glassBorder: "rgba(59, 130, 246, 0.15)",
    dotColor: "#3B82F6",
  },
  {
    icon: PenLine,
    title: "Editing / Writing",
    shortDesc: "Clarity, precision, impact",
    desc: "Elevate your academic research or business reports with professional editing and writing services. We ensure that your work is clear, concise, and impactful, tailored to resonate with your target audience.",
    accent: "#10B981",
    cardBg: "linear-gradient(135deg, #0A1A1A 0%, #064E3B 30%, #065F46 60%, #022C22 100%)",
    cardGradient: "radial-gradient(ellipse at 80% 20%, #10B98130 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #04785720 0%, transparent 50%)",
    cardBorder: "rgba(16, 185, 129, 0.3)",
    cardGlow: "#10B98140",
    glassBg: "rgba(16, 185, 129, 0.08)",
    glassBorder: "rgba(16, 185, 129, 0.15)",
    dotColor: "#10B981",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    shortDesc: "Critical feedback, refined work",
    desc: "Get detailed reviews and assessments of your academic research projects or corporate market strategies. We provide critical feedback that helps you refine your work and increase its relevance to real-world applications.",
    accent: "#8B5CF6",
    cardBg: "linear-gradient(135deg, #1A102E 0%, #3B1D6E 30%, #4C1D95 60%, #2D1060 100%)",
    cardGradient: "radial-gradient(ellipse at 80% 20%, #8B5CF630 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #7C3AED20 0%, transparent 50%)",
    cardBorder: "rgba(139, 92, 246, 0.3)",
    cardGlow: "#8B5CF640",
    glassBg: "rgba(139, 92, 246, 0.08)",
    glassBorder: "rgba(139, 92, 246, 0.15)",
    dotColor: "#8B5CF6",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity",
    shortDesc: "Trust, integrity, reliability",
    desc: "Authenticity is at the core of what we do. From academic integrity to business transparency, our research and content creation processes ensure that all information is accurate, reliable, and trustworthy.",
    accent: "#F59E0B",
    cardBg: "linear-gradient(135deg, #1A0F02 0%, #78350F 30%, #92400E 60%, #451A03 100%)",
    cardGradient: "radial-gradient(ellipse at 80% 20%, #F59E0B30 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #D9770620 0%, transparent 50%)",
    cardBorder: "rgba(245, 158, 11, 0.3)",
    cardGlow: "#F59E0B40",
    glassBg: "rgba(245, 158, 11, 0.08)",
    glassBorder: "rgba(245, 158, 11, 0.15)",
    dotColor: "#F59E0B",
  },
  {
    icon: BookOpen,
    title: "Publication Support",
    shortDesc: "From manuscript to journal",
    desc: "We guide you through every step of the publication process, ensuring your research meets the highest academic standards. From manuscript preparation to selecting the right journals, our experts help you navigate the complexities of publishing.",
    accent: "#06B6D4",
    cardBg: "linear-gradient(135deg, #0A1A1E 0%, #164E63 30%, #155E75 60%, #0C3545 100%)",
    cardGradient: "radial-gradient(ellipse at 80% 20%, #06B6D430 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #0891B220 0%, transparent 50%)",
    cardBorder: "rgba(6, 182, 212, 0.3)",
    cardGlow: "#06B6D440",
    glassBg: "rgba(6, 182, 212, 0.08)",
    glassBorder: "rgba(6, 182, 212, 0.15)",
    dotColor: "#06B6D4",
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          id: "journey-header",
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      stepsRef.current.filter(Boolean),
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.12,
        scrollTrigger: {
          id: "journey-steps",
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    return () => {
      ["journey-header", "journey-steps"].forEach((id) =>
        ScrollTrigger.getById(id)?.kill()
      );
    };
  }, []);

  const dotPattern = (color: string) => 
    `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='${encodeURIComponent(color)}' opacity='0.15'/%3E%3C/svg%3E")`;

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 mb-20 opacity-0">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Eyebrow>Our Process</Eyebrow>
          </div>
          <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-[#111] mb-6">
            Your PhD journey,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              step by step.
            </span>
          </h2>
          <p className="text-[1.05rem] text-black/50 max-w-2xl mx-auto leading-relaxed">
            From first draft to final publication — we're with you at every
            stage with expert guidance and unwavering support.
          </p>
        </div>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden lg:block relative z-10">
        {/* Connecting line with gradient */}
        <div className="absolute top-[72px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-cyan-500/20 rounded-full" />
        
        {/* Animated progress line */}
        <div
          className="absolute top-[72px] left-[10%] h-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full transition-all duration-500"
          style={{
            width: activeStep !== null ? `${(activeStep + 1) * 20}%` : "0%",
            maxWidth: "80%",
          }}
        />

        <div className="grid grid-cols-5 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isPast = activeStep !== null && i < activeStep;

            return (
              <div
                key={step.title}
                className="relative group"
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Icon Circle */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`
                      relative w-20 h-20 rounded-2xl flex items-center justify-center
                      transition-all duration-500 cursor-pointer
                      ${isActive ? "scale-110 shadow-2xl" : "scale-100"}
                      ${isPast ? "opacity-60" : "opacity-100"}
                    `}
                    style={{
                      background: `linear-gradient(145deg, #ffffff, #f5f5f0)`,
                      border: `2px solid ${isActive ? step.accent : step.accent + "40"}`,
                      boxShadow: isActive
                        ? `0 20px 40px ${step.accent}30, 0 4px 12px rgba(0,0,0,0.1)`
                        : `0 4px 12px rgba(0,0,0,0.06)`,
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                        style={{ border: `2px solid ${step.accent}` }}
                      />
                    )}
                    
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                      style={{
                        background: `${step.accent}12`,
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        style={{ color: step.accent }}
                        className="transition-all duration-300"
                      />
                    </div>

                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[0.6rem] font-black text-white shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${step.accent}, ${step.accent}CC)`,
                        boxShadow: `0 4px 12px ${step.accent}40`
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* CARD - Fixed height with smooth expand */}
                <div
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className={`
                    opacity-0 rounded-xl transition-all duration-500 relative p-6
                    ${isActive ? "shadow-2xl -translate-y-2" : "shadow-lg"}
                  `}
                  style={{
                    background: step.cardBg,
                    border: `1px solid ${isActive ? step.cardBorder : step.cardBorder.replace('0.3', '0.15')}`,
                    boxShadow: isActive 
                      ? `0 20px 40px ${step.cardGlow}, 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.03)`,
                    minHeight: isActive ? 'auto' : '200px',
                    height: isActive ? 'auto' : '200px',
                  }}
                >
                  {/* Radial gradient overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: step.cardGradient }}
                  />
                  
                  {/* Dot pattern texture */}
                  <div 
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{ backgroundImage: dotPattern(step.dotColor), backgroundSize: '20px 20px' }}
                  />
                  
                  {/* Noise texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: '128px 128px'
                    }}
                  />
                  
                  {/* Top shine line */}
                  <div 
                    className="absolute top-0 left-4 right-4 h-[1px] opacity-50"
                    style={{ 
                      background: `linear-gradient(90deg, transparent, ${step.accent}40, transparent)` 
                    }}
                  />

                  {/* Glass morphism overlay on hover */}
                  <div 
                    className={`
                      absolute inset-0 transition-opacity duration-500 rounded-xl
                      ${isActive ? 'opacity-100' : 'opacity-0'}
                    `}
                    style={{
                      background: `linear-gradient(135deg, ${step.glassBg}, transparent)`,
                      backdropFilter: 'blur(1px)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div
                      className="w-14 h-[3px] rounded-full mb-4 transition-all duration-300"
                      style={{
                        background: `linear-gradient(90deg, ${step.accent}, ${step.accent}80)`,
                        width: isActive ? "56px" : "40px",
                        boxShadow: isActive ? `0 0 12px ${step.accent}40` : 'none',
                      }}
                    />
                    <h3
                      className="font-bold text-[1.15rem] mb-3 transition-all duration-300"
                      style={{ 
                        color: isActive ? step.accent : "#ffffff",
                        textShadow: isActive ? `0 0 20px ${step.accent}40` : 'none'
                      }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-[0.85rem] leading-relaxed mb-4"
                      style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)' }}
                    >
                      {step.shortDesc}
                    </p>
                    
                    {/* Expandable description - Smooth animation */}
                    <div
                      className="transition-all duration-500 ease-in-out mt-auto"
                      style={{
                        maxHeight: isActive ? '250px' : '0px',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                      }}
                    >
                      <p 
                        className="text-[0.9rem] leading-relaxed pt-4"
                        style={{ 
                          borderTop: `1px solid ${step.accent}20`,
                          color: 'rgba(255,255,255,0.8)',
                          paddingBottom: '0.5rem',
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div 
                    className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-2xl"
                    style={{ background: step.accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden relative z-10">
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-cyan-500/40 rounded-full" />
        
        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isExpanded = expandedMobile === i;

            return (
              <div
                key={step.title}
                className="relative flex gap-5 items-start group"
              >
                {/* Icon */}
                <div
                  className="relative w-16 h-16 rounded-xl flex items-center justify-center shrink-0 z-10 cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(145deg, #ffffff, #f5f5f0)`,
                    border: `2px solid ${step.accent}40`,
                    boxShadow: `0 4px 16px ${step.accent}15`,
                  }}
                  onClick={() => setExpandedMobile(isExpanded ? null : i)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    style={{ background: `${step.accent}12` }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: step.accent }} />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[0.55rem] font-black text-white shadow-md"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.accent}, ${step.accent}CC)`,
                      boxShadow: `0 2px 8px ${step.accent}40`
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div 
                  className="flex-1 pt-1 rounded-xl transition-all duration-300 relative"
                  style={{
                    background: isExpanded ? step.cardBg : 'transparent',
                    border: isExpanded ? `1px solid ${step.cardBorder}` : 'none',
                  }}
                >
                  {isExpanded && (
                    <>
                      <div 
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ background: step.cardGradient }}
                      />
                      <div 
                        className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
                        style={{ backgroundImage: dotPattern(step.dotColor), backgroundSize: '20px 20px' }}
                      />
                      <div 
                        className="absolute top-0 left-4 right-4 h-[1px] opacity-50"
                        style={{ 
                          background: `linear-gradient(90deg, transparent, ${step.accent}40, transparent)` 
                        }}
                      />
                    </>
                  )}
                  
                  <div className="relative z-10 p-5">
                    <h3
                      className="font-bold text-[1.1rem] mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ 
                        color: isExpanded ? step.accent : step.accent,
                        textShadow: isExpanded ? `0 0 20px ${step.accent}40` : 'none'
                      }}
                      onClick={() => setExpandedMobile(isExpanded ? null : i)}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-[0.9rem] leading-relaxed mb-3"
                      style={{ color: isExpanded ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)' }}
                    >
                      {step.shortDesc}
                    </p>
                    
                    {/* Expandable description */}
                    <div
                      className="transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isExpanded ? '400px' : '0px',
                        opacity: isExpanded ? 1 : 0,
                        overflow: 'hidden',
                      }}
                    >
                      <p 
                        className="text-[0.9rem] leading-relaxed pt-3"
                        style={{ 
                          borderTop: `1px solid ${step.accent}20`,
                          color: 'rgba(255,255,255,0.8)',
                          paddingBottom: '0.75rem',
                        }}
                      >
                        {step.desc}
                      </p>
                      <button
                        onClick={() => setExpandedMobile(null)}
                        className="text-[0.8rem] font-medium opacity-80 hover:opacity-100 transition-opacity"
                        style={{ color: step.accent }}
                      >
                        Show less
                      </button>
                    </div>
                    
                    {!isExpanded && (
                      <button
                        onClick={() => setExpandedMobile(i)}
                        className="mt-1 text-[0.8rem] font-medium flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                        style={{ color: step.accent }}
                      >
                        Read more <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 text-center mt-24">
        <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <span className="text-[0.95rem] font-medium text-blue-600">
            Ready to start your journey?
          </span>
          <ArrowRight size={16} className="text-blue-600" />
        </div>
      </div>
    </section>
  );
}