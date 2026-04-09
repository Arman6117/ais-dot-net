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
    accent: "#1A56DB",
    gradient: "from-blue-600 to-blue-400",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    icon: PenLine,
    title: "Editing / Writing",
    shortDesc: "Clarity, precision, impact",
    desc: "Elevate your academic research or business reports with professional editing and writing services. We ensure that your work is clear, concise, and impactful, tailored to resonate with your target audience.",
    accent: "#10B981",
    gradient: "from-emerald-600 to-emerald-400",
    bgGradient: "from-emerald-50 to-teal-50",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    shortDesc: "Critical feedback, refined work",
    desc: "Get detailed reviews and assessments of your academic research projects or corporate market strategies. We provide critical feedback that helps you refine your work and increase its relevance to real-world applications.",
    accent: "#8B5CF6",
    gradient: "from-purple-600 to-purple-400",
    bgGradient: "from-purple-50 to-violet-50",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity",
    shortDesc: "Trust, integrity, reliability",
    desc: "Authenticity is at the core of what we do. From academic integrity to business transparency, our research and content creation processes ensure that all information is accurate, reliable, and trustworthy.",
    accent: "#F59E0B",
    gradient: "from-amber-600 to-orange-400",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    icon: BookOpen,
    title: "Publication Support",
    shortDesc: "From manuscript to journal",
    desc: "We guide you through every step of the publication process, ensuring your research meets the highest academic standards. From manuscript preparation to selecting the right journals, our experts help you navigate the complexities of publishing.",
    accent: "#06B6D4",
    gradient: "from-cyan-600 to-cyan-400",
    bgGradient: "from-cyan-50 to-sky-50",
  },
];

export default function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header entrance
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

    // Step cards stagger with scale
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
          <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-[#111] mb-4">
            Your PhD journey,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              step by step.
            </span>
          </h2>
          <p className="text-[0.9rem] text-black/50 max-w-2xl mx-auto leading-relaxed">
            From first draft to final publication — we're with you at every
            stage with expert guidance and unwavering support.
          </p>
        </div>
      </div>

      {/* Desktop Timeline - Horizontal with connecting lines */}
      <div className="hidden lg:block relative z-10">
        {/* Connecting line with gradient */}
        <div className="absolute top-[72px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-cyan-500/20 rounded-full" />
        
        {/* Animated progress line */}
        <div
          className="absolute top-[72px] left-[10%] h-[2px] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-500"
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
                    {/* Pulsing ring on active */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                        style={{ border: `2px solid ${step.accent}` }}
                      />
                    )}
                    
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
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

                    {/* Step Number */}
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[0.6rem] font-black text-white shadow-lg"
                      style={{ background: step.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className={`
                    opacity-0 p-5 rounded-xl transition-all duration-500
                    ${isActive ? "shadow-xl -translate-y-2" : "shadow-sm"}
                  `}
                  style={{
                    background: `linear-gradient(135deg, #ffffff, ${step.accent}02)`,
                    border: `1px solid ${isActive ? step.accent + "30" : "rgba(0,0,0,0.06)"}`,
                  }}
                >
                  <div
                    className="w-12 h-[2px] rounded-full mb-3 transition-all duration-300"
                    style={{
                      background: step.accent,
                      width: isActive ? "48px" : "32px",
                    }}
                  />
                  <h3
                    className="font-bold text-[1rem] text-[#111] mb-2 transition-colors duration-300"
                    style={{ color: isActive ? step.accent : "#111" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[0.7rem] text-black/40 leading-relaxed mb-3">
                    {step.shortDesc}
                  </p>
                  <div
                    className={`
                      overflow-hidden transition-all duration-500
                      ${isActive ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="text-sm text-black/60 leading-relaxed mt-2 pt-2 border-t border-gray-100">
                      {step.desc}
                    </p>
                  </div>
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
            const [isExpanded, setIsExpanded] = useState(false);

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
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${step.accent}12` }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: step.accent }} />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[0.55rem] font-black text-white shadow-md"
                    style={{ background: step.accent }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3
                    className="font-bold text-[1rem] mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: step.accent }}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[0.75rem] text-black/50 leading-relaxed mb-2">
                    {step.shortDesc}
                  </p>
                  <div
                    className={`
                      overflow-hidden transition-all duration-500
                      ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <p className="text-[0.75rem] text-black/60 leading-relaxed mt-2 pt-2 border-t border-gray-100">
                      {step.desc}
                    </p>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="mt-2 text-[0.65rem] font-medium opacity-60 hover:opacity-100 transition-opacity"
                      style={{ color: step.accent }}
                    >
                      Show less
                    </button>
                  </div>
                  {!isExpanded && (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="mt-1 text-[0.65rem] font-medium flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                      style={{ color: step.accent }}
                    >
                      Read more <ArrowRight size={10} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 text-center mt-20">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50">
          <span className="text-[0.75rem] font-medium text-blue-600">
            Ready to start your journey?
          </span>
          <ArrowRight size={14} className="text-blue-600" />
        </div>
      </div>
    </section>
  );
}