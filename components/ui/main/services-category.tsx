"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Cpu, Check } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import TransitionLink from "@/components/ui/transition-link";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const categories = [
  {
    id: "phd",
    icon: GraduationCap,
    title: "PhD Services",
    accent: "#1A56DB",
    bg: "linear-gradient(145deg, #0d1b3e, #0a0a18)",
    tagBg: "rgba(26,86,219,0.15)",
    tagBorder: "rgba(26,86,219,0.3)",
    desc: "Our academic services are designed to provide comprehensive guidance to research scholars. We offer research outlines to help you get started if you're unsure where to begin, and we review your existing documents to streamline your research journey.",
    features: [
      "Admission Proposal",
      "Research Proposal",
      "Synopsis",
      "Master's Dissertation",
      "PhD Thesis",
      "Implementation / Thesis",
      "Bibliometric Review Paper",
      "Systematic Review Paper",
      "Book",
      "Publication Support",
    ],
  },
  {
    id: "it",
    icon: Cpu,
    title: "IT Services",
    accent: "#22d3ee",
    bg: "linear-gradient(145deg, #042f2e, #0a0a18)",
    tagBg: "rgba(34,211,238,0.12)",
    tagBorder: "rgba(34,211,238,0.25)",
    desc: "Our corporate services are designed to empower businesses with data-driven insights and strategic research support, helping you stay ahead in your industry. We offer:",
    features: [
      "Market Research",
      "Business Strategy Support",
      "Industry Reports",
      "Competitor Analysis",
      "Technology & Innovation Research",
      "Customized Consulting",
      "Pricing Research",
      "Buyer Persona Research",
    ],
  },
];

export default function ServiceCategories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll(".cat-card");
    if (!cards) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          id: "cat-cards-trigger",
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => ScrollTrigger.getById("cat-cards-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden`}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[140px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }} />

      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-[9px] mb-4">
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            What We Offer
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-[#111]">
          Two worlds,<br />
          <span className="text-[#1A56DB]">one partner.</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map(({ id, icon: Icon, title, accent, bg, tagBg, tagBorder, desc, features }) => (
          <div
            key={id}
            className="cat-card opacity-0 rounded-[28px] overflow-hidden flex flex-col"
            style={{
              background: bg,
              border: `1px solid ${accent}20`,
              boxShadow: `0 24px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Top sheen */}
            <div className="h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />

            <div className="p-8 sm:p-10 flex flex-col gap-7 flex-1">

              {/* Header row */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ background: tagBg, border: `1px solid ${tagBorder}` }}
                >
                  <Icon size={26} strokeWidth={1.4} style={{ color: accent }} />
                </div>
                <div>
                  <div
                    className="text-[0.55rem] font-bold tracking-[0.22em] uppercase mb-1"
                    style={{ color: `${accent}70` }}
                  >
                    {id === "phd" ? "Academic" : "Corporate"}
                  </div>
                  <h3
                    className="font-[family-name:var(--font-serif)] italic text-[1.8rem] leading-[1] tracking-[-0.02em] text-white"
                  >
                    {title}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px]" style={{ background: `${accent}18` }} />

              {/* Description */}
              <p className="text-[0.85rem] text-white/45 leading-[1.85]">
                {desc}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                    >
                      <Check size={11} style={{ color: accent }} strokeWidth={2.5} />
                    </div>
                    <span className="text-[0.8rem] text-white/65 font-medium">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto pt-4">
                <TransitionLink
                  href="/contact"
                  className="group relative flex items-center justify-center w-full py-4 rounded-[14px] text-[0.82rem] font-bold tracking-[0.06em] text-white overflow-hidden transition-opacity duration-200 hover:opacity-90"
                //   style={{ background: accent }}
                >
                  <span className="absolute inset-0 bg-white/10 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="relative">Get Started →</span>
                </TransitionLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}