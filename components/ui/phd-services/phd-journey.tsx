"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instrument_Serif } from "next/font/google";
import {
  BookOpen, GraduationCap, FileText, Newspaper,
  User, Briefcase, Search, BookMarked, Globe,
  Check, ArrowRight,
} from "lucide-react";
import TransitionLink from "@/components/ui/transition-link";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const services = [
  {
    num: "01",
    title: "Thesis Writing",
    icon: GraduationCap,
    accent: "#1A56DB",
    bg: "#0a0f1e",
    desc: "A thesis is the cornerstone of your academic career. Our expert writers craft compelling, well-structured theses that demonstrate your mastery of your field and meet the rigorous standards of your institution.",
    points: ["Chapter-by-chapter structuring", "Literature review & methodology", "Data analysis & interpretation", "Formatting per university guidelines", "Plagiarism-free guarantee"],
    tag: "Most Popular",
  },
  {
    num: "02",
    title: "Dissertation Writing",
    icon: BookOpen,
    accent: "#4ade80",
    bg: "#0d3b2e",
    desc: "Whether it's a Master's or doctoral dissertation, we help you develop original research that makes a meaningful contribution to your field. From proposal to final submission, we've got you covered.",
    points: ["Research design & methodology", "Primary & secondary research", "Critical analysis & synthesis", "Abstract & executive summary", "Viva preparation support"],
    tag: null,
  },
  {
    num: "03",
    title: "Research Paper Writing",
    icon: FileText,
    accent: "#a78bfa",
    bg: "#1e1b4b",
    desc: "Publish research that gets noticed. Our team helps you articulate your findings clearly, structure your argument logically, and meet the exacting standards of peer-reviewed journals worldwide.",
    points: ["IMRaD structure adherence", "Citation & referencing (APA, MLA, Harvard)", "Abstract & keyword optimization", "Journal submission formatting", "Revision support included"],
    tag: null,
  },
  {
    num: "04",
    title: "Article Writing",
    icon: Newspaper,
    accent: "#fb7185",
    bg: "#3b0f1f",
    desc: "Academic articles require precision, authority, and clarity. We write review articles, perspective pieces, and opinion papers that position you as a thought leader in your discipline.",
    points: ["Review & perspective articles", "Opinion & commentary pieces", "Technical & scientific articles", "SEO-optimized academic content", "Tailored to target publication"],
    tag: null,
  },
  {
    num: "05",
    title: "Biography Writing",
    icon: User,
    accent: "#fb923c",
    bg: "#431407",
    desc: "Your academic and professional story deserves to be told compellingly. We craft authoritative biographies for researchers, academics, and professionals that highlight your journey and achievements.",
    points: ["Academic & professional bios", "LinkedIn & institutional profiles", "Conference speaker bios", "Research portfolio narratives", "Tone-matched to your voice"],
    tag: null,
  },
  {
    num: "06",
    title: "Business Proposal Writing",
    icon: Briefcase,
    accent: "#22d3ee",
    bg: "#042f2e",
    desc: "Bridge the gap between academia and industry with proposals that win funding, partnerships, and approvals. We write persuasive, data-backed business proposals tailored to your audience.",
    points: ["Executive summary crafting", "Market analysis & financials", "Research grant proposals", "Industry partnership proposals", "Government & NGO submissions"],
    tag: null,
  },
  {
    num: "07",
    title: "Case Study Writing",
    icon: Search,
    accent: "#a3e635",
    bg: "#18181b",
    desc: "Case studies are powerful tools for demonstrating real-world impact. We document your research outcomes, business solutions, and academic findings in compelling narratives that resonate with readers.",
    points: ["Qualitative & quantitative cases", "Industry & academic case studies", "Problem-solution-result structure", "Interview & data integration", "Visual data presentation"],
    tag: null,
  },
  {
    num: "08",
    title: "Book Publication",
    icon: BookMarked,
    accent: "#f472b6",
    bg: "#2d1b3d",
    desc: "Turn your research into a published book. We guide you through the entire publication journey — from manuscript preparation and editing to finding the right publisher and navigating the submission process.",
    points: ["Manuscript structuring & editing", "Publisher identification & outreach", "ISBN & copyright guidance", "Self-publishing support", "Print & digital formats"],
    tag: null,
  },
  {
    num: "09",
    title: "Journal Publication",
    icon: Globe,
    accent: "#34d399",
    bg: "#064e3b",
    desc: "Getting published in a reputable journal is a major milestone. Our team helps you navigate the complex journal submission process, from selecting the right journal to responding to reviewer comments.",
    points: ["Scopus & SCI journal targeting", "Cover letter & submission support", "Reviewer response drafting", "Impact factor analysis", "Post-acceptance formatting"],
    tag: "Scopus Ready",
  },
];

function ServiceSection({ service, index }: { service: typeof services[0]; index: number }) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const numRef      = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLDivElement>(null);
  const pointsRef   = useRef<HTMLUListElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const visualRef   = useRef<HTMLDivElement>(null);
  const Icon        = service.icon;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        id: `phd-service-${index}`,
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600",
        pin: true,
        anticipatePin: 1,
        scrub: false,
      },
    });

    // Animate in sequence on pin
    tl.fromTo(numRef.current,
        { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(titleRef.current,
        { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(descRef.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .fromTo(pointsRef.current?.children ? Array.from(pointsRef.current.children) : [],
        { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power3.out" }, "-=0.2")
      .fromTo(ctaRef.current,
        { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.1")
      .fromTo(visualRef.current,
        { opacity: 0, x: 80, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }, 0.1);

    return () => ScrollTrigger.getById(`phd-service-${index}`)?.kill();
  }, [index]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center px-5 sm:px-8 lg:px-[52px] py-20 overflow-hidden"
      style={{ background: service.bg }}
    >
      {/* Top sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }} />

      {/* Large background number */}
      <div
        className="absolute right-0 bottom-0 text-[20rem] font-black leading-none select-none pointer-events-none opacity-[0.03]"
        style={{ color: service.accent, lineHeight: 0.8 }}
      >
        {service.num}
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] blur-[120px] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${service.accent}, transparent)` }} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── Left: Content ── */}
        <div className="flex flex-col gap-7">

          {/* Number + tag */}
          <div ref={numRef} className="opacity-0 flex items-center gap-4">
            <span className="text-[0.6rem] font-bold tracking-[0.22em] uppercase"
              style={{ color: `${service.accent}70` }}>
              {service.num} / 09
            </span>
            {service.tag && (
              <span className="text-[0.55rem] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
                style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30`, color: service.accent }}>
                {service.tag}
              </span>
            )}
          </div>

          {/* Title */}
          <div ref={titleRef} className="opacity-0">
            <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">
              {service.title}
            </h2>
          </div>

          {/* Accent line */}
          <div className="w-12 h-[2px] rounded-full" style={{ background: service.accent }} />

          {/* Description */}
          <p ref={descRef} className="opacity-0 text-[0.88rem] text-white/50 leading-[1.85] max-w-[480px]">
            {service.desc}
          </p>

          {/* Points */}
          <ul ref={pointsRef} className="flex flex-col gap-3">
            {service.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30` }}>
                  <Check size={11} style={{ color: service.accent }} strokeWidth={2.5} />
                </div>
                <span className="text-[0.82rem] text-white/65">{p}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div ref={ctaRef} className="opacity-0 pt-2">
            <TransitionLink
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-[10px] text-[0.78rem] font-bold text-white transition-opacity duration-200 hover:opacity-80"
            //   style={{ background: service.accent }}
            >
              Get Started
              <ArrowRight size={15} strokeWidth={2} />
            </TransitionLink>
          </div>
        </div>

        {/* ── Right: Visual ── */}
        <div ref={visualRef} className="opacity-0 hidden lg:flex items-center justify-center">
          <div
            className="relative w-[340px] h-[380px] rounded-[28px] flex flex-col items-center justify-center gap-6 overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${service.accent}12, ${service.accent}05)`,
              border: `1px solid ${service.accent}20`,
              boxShadow: `0 24px 80px ${service.accent}15`,
            }}
          >
            {/* Top sheen */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }} />

            {/* Large icon */}
            <div className="w-28 h-28 rounded-[28px] flex items-center justify-center"
              style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}25` }}>
              <Icon size={56} strokeWidth={1} style={{ color: service.accent }} />
            </div>

            {/* Service name */}
            <div className="text-center px-6">
              <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: `${service.accent}60` }}>
                AIS Solutions
              </div>
              <div className="text-white font-bold text-[1.1rem] leading-[1.3]">{service.title}</div>
            </div>

            {/* Floating dots decoration */}
            {[...Array(6)].map((_, i) => (
              <div key={i}
                className="absolute w-1.5 h-1.5 rounded-full opacity-30"
                style={{
                  background: service.accent,
                  top: `${15 + i * 14}%`,
                  right: `${8 + (i % 2) * 6}%`,
                }}
              />
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={i}
                className="absolute w-1 h-1 rounded-full opacity-20"
                style={{
                  background: service.accent,
                  bottom: `${20 + i * 10}%`,
                  left: `${6 + (i % 2) * 5}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhdJourney() {
  return (
    <div className="font-[family-name:var(--font-serif)]" style={{ fontFamily: "inherit" }}>
      <style>{`
        .phd-journey-wrap { font-family: inherit; }
      `}</style>
      <div className={instrumentSerif.variable}>
        {services.map((service, i) => (
          <ServiceSection key={service.num} service={service} index={i} />
        ))}
      </div>
    </div>
  );
}