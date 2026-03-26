"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Instrument_Serif } from "next/font/google";
import {
  BookOpen, GraduationCap, FileText, Newspaper,
  User, Briefcase, Search, BookMarked, Globe,
  Check, ArrowRight, ChevronLeft, ChevronRight,
} from "lucide-react";
import gsap from "gsap";

// --- FONT SETUP ---
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

// --- UTILS ---
const dotPattern = (color: string) =>
  `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E")`;

// --- DATA ---
const services = [
  {
    num: "01",
    title: "Thesis Writing",
    icon: GraduationCap,
    accent: "#1A56DB",
    bg: "linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #1A56DB18 0%, transparent 70%)",
    desc: "A thesis is the cornerstone of your academic career. Our expert writers craft compelling, well-structured theses that demonstrate your mastery of your field.",
    points: ["Chapter-by-chapter structuring", "Literature review & methodology", "Data analysis & interpretation", "Formatting per university guidelines", "Plagiarism-free guarantee"],
    tag: "Most Popular",
    floatingIcons: [GraduationCap, FileText, BookOpen],
  },
  {
    num: "02",
    title: "Dissertation Writing",
    icon: BookOpen,
    accent: "#4ade80",
    bg: "linear-gradient(135deg, #0d1f18 0%, #0d3b2e 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #4ade8018 0%, transparent 70%)",
    desc: "Whether it's a Master's or doctoral dissertation, we help you develop original research that makes a meaningful contribution to your field.",
    points: ["Research design & methodology", "Primary & secondary research", "Critical analysis & synthesis", "Abstract & executive summary", "Viva preparation support"],
    tag: null,
    floatingIcons: [BookOpen, Search, Globe],
  },
  {
    num: "03",
    title: "Research Paper Writing",
    icon: FileText,
    accent: "#a78bfa",
    bg: "linear-gradient(135deg, #12102e 0%, #1e1b4b 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #a78bfa18 0%, transparent 70%)",
    desc: "Publish research that gets noticed. Our team helps you articulate your findings clearly and meet the exacting standards of peer-reviewed journals worldwide.",
    points: ["IMRaD structure adherence", "Citation & referencing (APA, MLA, Harvard)", "Abstract & keyword optimization", "Journal submission formatting", "Revision support included"],
    tag: null,
    floatingIcons: [FileText, BookMarked, Globe],
  },
  {
    num: "04",
    title: "Article Writing",
    icon: Newspaper,
    accent: "#fb7185",
    bg: "linear-gradient(135deg, #250a13 0%, #3b0f1f 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #fb718518 0%, transparent 70%)",
    desc: "Academic articles require precision, authority, and clarity. We write review articles and opinion papers that position you as a thought leader in your discipline.",
    points: ["Review & perspective articles", "Opinion & commentary pieces", "Technical & scientific articles", "SEO-optimized academic content", "Tailored to target publication"],
    tag: null,
    floatingIcons: [Newspaper, FileText, Globe],
  },
  {
    num: "05",
    title: "Biography Writing",
    icon: User,
    accent: "#fb923c",
    bg: "linear-gradient(135deg, #2a0e04 0%, #431407 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #fb923c18 0%, transparent 70%)",
    desc: "Your academic and professional story deserves to be told compellingly. We craft authoritative biographies for researchers, academics, and professionals.",
    points: ["Academic & professional bios", "LinkedIn & institutional profiles", "Conference speaker bios", "Research portfolio narratives", "Tone-matched to your voice"],
    tag: null,
    floatingIcons: [User, Briefcase, BookOpen],
  },
  {
    num: "06",
    title: "Business Proposal Writing",
    icon: Briefcase,
    accent: "#22d3ee",
    bg: "linear-gradient(135deg, #021c1c 0%, #042f2e 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #22d3ee18 0%, transparent 70%)",
    desc: "Bridge the gap between academia and industry with proposals that win funding, partnerships, and approvals.",
    points: ["Executive summary crafting", "Market analysis & financials", "Research grant proposals", "Industry partnership proposals", "Government & NGO submissions"],
    tag: null,
    floatingIcons: [Briefcase, FileText, Search],
  },
  {
    num: "07",
    title: "Case Study Writing",
    icon: Search,
    accent: "#a3e635",
    bg: "linear-gradient(135deg, #0f0f10 0%, #18181b 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #a3e63518 0%, transparent 70%)",
    desc: "Case studies are powerful tools for demonstrating real-world impact. We document your research outcomes in compelling narratives.",
    points: ["Qualitative & quantitative cases", "Industry & academic case studies", "Problem-solution-result structure", "Interview & data integration", "Visual data presentation"],
    tag: null,
    floatingIcons: [Search, FileText, BookOpen],
  },
  {
    num: "08",
    title: "Book Publication",
    icon: BookMarked,
    accent: "#f472b6",
    bg: "linear-gradient(135deg, #1c1024 0%, #2d1b3d 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #f472b618 0%, transparent 70%)",
    desc: "Turn your research into a published book. We guide you from manuscript preparation through finding the right publisher.",
    points: ["Manuscript structuring & editing", "Publisher identification & outreach", "ISBN & copyright guidance", "Self-publishing support", "Print & digital formats"],
    tag: null,
    floatingIcons: [BookMarked, Globe, GraduationCap],
  },
  {
    num: "09",
    title: "Journal Publication",
    icon: Globe,
    accent: "#34d399",
    bg: "linear-gradient(135deg, #032b22 0%, #064e3b 100%)",
    mesh: "radial-gradient(ellipse 80% 60% at 70% 40%, #34d39918 0%, transparent 70%)",
    desc: "Getting published in a reputable journal is a major milestone. We navigate the complex submission process efficiently.",
    points: ["Scopus & SCI journal targeting", "Cover letter & submission support", "Reviewer response drafting", "Impact factor analysis", "Post-acceptance formatting"],
    tag: "Scopus Ready",
    floatingIcons: [Globe, BookOpen, FileText],
  },
];

// --- MAIN COMPONENT ---
export default function PhdJourney() {
  const [current, setCurrent] = useState(0);
  const [contentKey, setContentKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const contentRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<NodeJS.Timeout | null>(null);
  const INTERVAL = 5000;

  // Manual & Auto Slide Logic
  const go = useCallback((idx: number, dir: "next" | "prev") => {
    setDirection(dir);
    setCurrent(idx);
    setContentKey((k) => k + 1);
  }, []);

  const next = useCallback(() => go((current + 1) % services.length, "next"), [current, go]);
  const prev = useCallback(() => go((current - 1 + services.length) % services.length, "prev"), [current, go]);

  const resetTimer = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [resetTimer]);

  // GSAP Smooth Slide Animation
  useEffect(() => {
    if (contentRef.current) {
      const xOffset = direction === "next" ? 60 : -60;
      gsap.fromTo(contentRef.current, 
        { x: xOffset, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, [contentKey, direction]);

  const service = services[current];
  const Icon = service.icon;

  return (
    <div className={`${instrumentSerif.variable} w-full px-4 sm:px-8 lg:px-14 py-16 font-sans`}>
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Header section */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-black/30 mb-3">Our Services</p>
          <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2rem,4vw,3.2rem)] text-black leading-none tracking-tight">
            PhD Journey Support
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { prev(); resetTimer(); }} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/30 transition-all duration-200">
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <span className="text-[0.65rem] font-bold tracking-widest text-black/25 tabular-nums w-12 text-center">
            {String(current + 1).padStart(2, "0")} / 09
          </span>
          <button onClick={() => { next(); resetTimer(); }} className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/30 transition-all duration-200">
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Main Shell */}
      <div
        className="relative w-full min-h-[70vh] rounded-[28px] overflow-hidden"
        style={{
          background: service.bg,
          boxShadow: "0 40px 100px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "background 0.8s ease",
        }}
      >
        {/* Layered Textures */}
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: dotPattern(service.accent), backgroundSize: "20px 20px" }} />
        <div className="absolute inset-0" style={{ background: service.mesh, transition: "background 0.6s ease" }} />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px 128px" }} />
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }} />
        
        {/* BG Number */}
        <div className="absolute right-0 bottom-0 text-[clamp(8rem,20vw,18rem)] font-black leading-none select-none pointer-events-none opacity-[0.04]" style={{ color: service.accent, lineHeight: 0.8 }}>
          {service.num}
        </div>

        {/* Floating Icons */}
        {service.floatingIcons.map((FIcon, i) => (
          <div key={`${contentKey}-${i}`} className="absolute hidden lg:block" style={{ top: `${12 + i * 26}%`, right: `${6 + (i % 2) * 4}%`, animation: `floatIcon ${6 + i}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
            <div className="rounded-[10px] p-2 flex items-center justify-center" style={{ background: `${service.accent}14`, border: `1px solid ${service.accent}25`, backdropFilter: "blur(4px)" }}>
              <FIcon size={22} style={{ color: service.accent, opacity: 0.5 }} strokeWidth={1.2} />
            </div>
          </div>
        ))}

        {/* Inner Content with GSAP Ref */}
        <div ref={contentRef} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10 sm:p-14 min-h-[70vh]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[0.6rem] font-bold tracking-[0.22em] uppercase" style={{ color: `${service.accent}90` }}>{service.num} / 09</span>
              {service.tag && <span className="text-[0.55rem] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full" style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}30`, color: service.accent }}>{service.tag}</span>}
            </div>
            <div className="w-10 h-[2px] rounded-full" style={{ background: service.accent }} />
            <h3 className="font-[family-name:var(--font-serif)] italic text-[clamp(2.6rem,5vw,4.8rem)] font-black leading-[0.95] tracking-tighter text-white">
              {service.title}
            </h3>
            <p className="text-[0.87rem] leading-[1.85] text-white/60 max-w-[460px]">{service.desc}</p>
            <ul className="flex flex-col gap-2.5">
              {service.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${service.accent}25`, border: `1px solid ${service.accent}40` }}>
                    <Check size={11} style={{ color: service.accent }} strokeWidth={3} />
                  </div>
                  <span className="text-[0.82rem] text-white/70">{p}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
               <button className="flex items-center gap-3 px-6 py-3.5 rounded-full text-[0.72rem] font-bold uppercase tracking-widest text-white transition-all group" style={{ background: service.accent }}>
                  Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[320px] h-[360px] rounded-[32px] flex flex-col items-center justify-center gap-6 overflow-hidden" style={{ background: `linear-gradient(145deg, ${service.accent}15, ${service.accent}05)`, border: `1px solid ${service.accent}20`, boxShadow: `0 24px 80px ${service.accent}15` }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }} />
              <div className="w-24 h-24 rounded-[28px] flex items-center justify-center" style={{ background: `${service.accent}20`, border: `1px solid ${service.accent}30` }}>
                <Icon size={48} strokeWidth={1} style={{ color: service.accent }} />
              </div>
              <div className="text-center px-6">
                <div className="text-[0.58rem] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: `${service.accent}` }}>AIS Solutions</div>
                <div className="text-white font-bold text-[1.1rem] leading-[1.3] font-[family-name:var(--font-serif)] italic">{service.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Dots & Progress */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {services.map((s, i) => (
          <button key={i} onClick={() => { go(i, i > current ? "next" : "prev"); resetTimer(); }} className="transition-all duration-500 rounded-full" style={{ width: i === current ? "32px" : "6px", height: "6px", background: i === current ? s.accent : "rgba(0,0,0,0.1)" }} />
        ))}
      </div>
      <div className="relative mt-4 h-[2px] w-full max-w-[200px] mx-auto rounded-full overflow-hidden bg-black/5">
        <div key={`bar-${contentKey}`} className="absolute left-0 top-0 h-full rounded-full" style={{ background: service.accent, animation: `progressBar ${INTERVAL}ms linear forwards` }} />
      </div>
    </div>
  );
}