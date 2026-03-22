"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenLine, ClipboardCheck, ShieldCheck, BookOpen } from "lucide-react";
import { Instrument_Serif } from "next/font/google";

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
    desc: "Access comprehensive research services that deliver valuable insights across academic, industrial, and scientific fields. Our expertise helps you make informed decisions and achieve your objectives with precision.",
    accent: "#1A56DB",
  },
  {
    icon: PenLine,
    title: "Editing / Writing",
    desc: "Elevate your academic research or business reports with professional editing and writing services. We ensure that your work is clear, concise, and impactful, tailored to resonate with your target audience.",
    accent: "#4ade80",
  },
  {
    icon: ClipboardCheck,
    title: "Review",
    desc: "Get detailed reviews and assessments of your academic research projects or corporate market strategies. We provide critical feedback that helps you refine your work and increase its relevance to real-world applications.",
    accent: "#a78bfa",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity",
    desc: "Authenticity is at the core of what we do. From academic integrity to business transparency, our research and content creation processes ensure that all information is accurate, reliable, and trustworthy.",
    accent: "#fb923c",
  },
  {
    icon: BookOpen,
    title: "Publication Support",
    desc: "We guide you through every step of the publication process, ensuring your research meets the highest academic standards. From manuscript preparation to selecting the right journals, our experts help you navigate the complexities of publishing.",
    accent: "#22d3ee",
  },
];

export default function JourneyTimeline() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<SVGLineElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header entrance
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { id: "journey-header", trigger: sectionRef.current, start: "top 80%" },
      }
    );

    // SVG line draw
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength?.() ?? 1000;
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: { id: "journey-line", trigger: sectionRef.current, start: "top 65%" },
      });
    }

    // Step cards stagger
    gsap.fromTo(stepsRef.current.filter(Boolean),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { id: "journey-steps", trigger: sectionRef.current, start: "top 65%" },
      }
    );

    // Dots pop in
    gsap.fromTo(dotsRef.current.filter(Boolean),
      { opacity: 0, scale: 0 },
      {
        opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.15,
        scrollTrigger: { id: "journey-dots", trigger: sectionRef.current, start: "top 65%" },
        delay: 0.3,
      }
    );

    return () => {
      ["journey-header","journey-line","journey-steps","journey-dots"].forEach(id =>
        ScrollTrigger.getById(id)?.kill()
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden`}
    >
      {/* Subtle blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] blur-[140px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      {/* Header */}
      <div ref={headerRef} className="opacity-0 mb-20">
        <div className="flex items-center gap-[9px] mb-4">
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            Our Process
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-[#111]">
            Your PhD journey,<br />
            <span className="text-[#1A56DB]">step by step.</span>
          </h2>
          <p className="text-[0.82rem] text-black/40 max-w-[240px] leading-[1.7]">
            From first draft to final publication — we're with you at every stage.
          </p>
        </div>
      </div>

      {/* Timeline — desktop horizontal, mobile vertical */}
      <div className="hidden lg:block relative">

        {/* SVG connecting line */}
        <svg
          className="absolute top-[52px] left-0 w-full pointer-events-none"
          height="20"
          style={{ overflow: "visible" }}
        >
          <line
            ref={lineRef}
            x1="10%"
            y1="10"
            x2="90%"
            y2="10"
            stroke="rgba(26,86,219,0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        </svg>

        {/* Steps row */}
        <div className="grid grid-cols-5 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col items-center text-center gap-5">
                {/* Dot + icon */}
                <div
                  ref={el => { dotsRef.current[i] = el; }}
                  className="opacity-0 relative w-[104px] h-[104px] rounded-[24px] flex items-center justify-center shrink-0 shadow-lg"
                  style={{
                    background: `linear-gradient(145deg, #ffffff, #f5f5f0)`,
                    border: `1px solid ${step.accent}30`,
                    boxShadow: `0 8px 32px ${step.accent}15, 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)`,
                  }}
                >
                  <div className="w-14 h-14 rounded-[16px] flex items-center justify-center"
                    style={{ background: `${step.accent}12`, border: `1px solid ${step.accent}25` }}>
                    <Icon size={26} strokeWidth={1.5} style={{ color: step.accent }} />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[0.55rem] font-black text-white"
                    style={{ background: step.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Card */}
                <div
                  ref={el => { stepsRef.current[i] = el; }}
                  className="opacity-0 flex flex-col gap-3 p-5 rounded-[16px] w-full"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="w-5 h-[2px] rounded-full mx-auto" style={{ background: step.accent }} />
                  <h3 className="font-bold text-[0.92rem] text-[#111]">{step.title}</h3>
                  <p className="text-[0.72rem] text-black/45 leading-[1.75]">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="lg:hidden flex flex-col gap-6 relative">
        {/* Vertical line */}
        <div className="absolute left-[27px] top-0 bottom-0 w-[1.5px]"
          style={{ background: "linear-gradient(to bottom, rgba(26,86,219,0.2), transparent)" }} />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-5 items-start">
              {/* Icon */}
              <div className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0 relative z-10"
                style={{
                  background: `linear-gradient(145deg, #ffffff, #f5f5f0)`,
                  border: `1px solid ${step.accent}25`,
                  boxShadow: `0 4px 16px ${step.accent}15`,
                }}>
                <Icon size={22} strokeWidth={1.5} style={{ color: step.accent }} />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[0.5rem] font-black text-white"
                  style={{ background: step.accent }}>
                  {i + 1}
                </div>
              </div>
              {/* Text */}
              <div className="flex-1 pt-1">
                <h3 className="font-bold text-[0.95rem] text-[#111] mb-2">{step.title}</h3>
                <p className="text-[0.78rem] text-black/45 leading-[1.75]">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}