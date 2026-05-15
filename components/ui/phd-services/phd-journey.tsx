"use client";
import { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import {
  Check, ArrowRight, GraduationCap, BookOpen, FileText,
  Newspaper, User, Briefcase, Search, BookMarked, Globe,
} from "lucide-react";
import gsap from "gsap";
import {
  ThesisAnimation,
  DissertationAnimation,
  ResearchAnimation,
  ArticleAnimation,
  BiographyAnimation,
  BusinessAnimation,
  CaseStudyAnimation,
  BookAnimation,
  JournalAnimation,
} from "@/components/ui/animations/hero";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const services = [
  {
    id: "thesis-writing",
    num: "01",
    title: "Thesis Writing",
    icon: GraduationCap,
    Animation: ThesisAnimation,
    accent: "#3B82F6",
    accentLight: "#EFF6FF",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F0F5FF 100%)",
    borderColor: "rgba(59,130,246,0.2)",
    shadowColor: "rgba(59,130,246,0.1)",
    desc: "A thesis is the cornerstone of your academic career. Our expert writers craft compelling, well-structured theses that demonstrate your mastery of your field.",
    points: [
      "Chapter-by-chapter structuring",
      "Literature review & methodology",
      "Data analysis & interpretation",
      "Formatting per university guidelines",
      "Plagiarism-free guarantee",
    ],
    tag: "Most Popular",
  },
  {
    id: "dissertation-writing",
    num: "02",
    title: "Dissertation Writing",
    icon: BookOpen,
    Animation: DissertationAnimation,
    accent: "#10B981",
    accentLight: "#ECFDF5",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 100%)",
    borderColor: "rgba(16,185,129,0.2)",
    shadowColor: "rgba(16,185,129,0.1)",
    desc: "Whether it's a Master's or doctoral dissertation, we help you develop original research that makes a meaningful contribution to your field.",
    points: [
      "Research design & methodology",
      "Primary & secondary research",
      "Critical analysis & synthesis",
      "Abstract & executive summary",
      "Viva preparation support",
    ],
    tag: null,
  },
  {
    id: "research-paper-writing",
    num: "03",
    title: "Research Paper Writing",
    icon: FileText,
    Animation: ResearchAnimation,
    accent: "#8B5CF6",
    accentLight: "#F5F3FF",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
    borderColor: "rgba(139,92,246,0.2)",
    shadowColor: "rgba(139,92,246,0.1)",
    desc: "Publish research that gets noticed. Our team helps you articulate your findings clearly and meet the exacting standards of peer-reviewed journals worldwide.",
    points: [
      "IMRaD structure adherence",
      "Citation & referencing (APA, MLA, Harvard)",
      "Abstract & keyword optimization",
      "Journal submission formatting",
      "Revision support included",
    ],
    tag: null,
  },
  {
    id: "article-writing",
    num: "04",
    title: "Article Writing",
    icon: Newspaper,
    Animation: ArticleAnimation,
    accent: "#F43F5E",
    accentLight: "#FFF1F2",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FFF1F2 100%)",
    borderColor: "rgba(244,63,94,0.2)",
    shadowColor: "rgba(244,63,94,0.1)",
    desc: "Academic articles require precision, authority, and clarity. We write review articles and opinion papers that position you as a thought leader in your discipline.",
    points: [
      "Review & perspective articles",
      "Opinion & commentary pieces",
      "Technical & scientific articles",
      "SEO-optimized academic content",
      "Tailored to target publication",
    ],
    tag: null,
  },
  {
    id: "biography-writing",
    num: "05",
    title: "Biography Writing",
    icon: User,
    Animation: BiographyAnimation,
    accent: "#F59E0B",
    accentLight: "#FFFBEB",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)",
    borderColor: "rgba(245,158,11,0.2)",
    shadowColor: "rgba(245,158,11,0.1)",
    desc: "Your academic and professional story deserves to be told compellingly. We craft authoritative biographies for researchers, academics, and professionals.",
    points: [
      "Academic & professional bios",
      "LinkedIn & institutional profiles",
      "Conference speaker bios",
      "Research portfolio narratives",
      "Tone-matched to your voice",
    ],
    tag: null,
  },
  {
    id: "business-proposal-writing",
    num: "06",
    title: "Business Proposal Writing",
    icon: Briefcase,
    Animation: BusinessAnimation,
    accent: "#06B6D4",
    accentLight: "#ECFEFF",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #ECFEFF 100%)",
    borderColor: "rgba(6,182,212,0.2)",
    shadowColor: "rgba(6,182,212,0.1)",
    desc: "Bridge the gap between academia and industry with proposals that win funding, partnerships, and approvals.",
    points: [
      "Executive summary crafting",
      "Market analysis & financials",
      "Research grant proposals",
      "Industry partnership proposals",
      "Government & NGO submissions",
    ],
    tag: null,
  },
  {
    id: "case-study-writing",
    num: "07",
    title: "Case Study Writing",
    icon: Search,
    Animation: CaseStudyAnimation,
    accent: "#84CC16",
    accentLight: "#F7FEE7",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F7FEE7 100%)",
    borderColor: "rgba(132,204,22,0.2)",
    shadowColor: "rgba(132,204,22,0.1)",
    desc: "Case studies are powerful tools for demonstrating real-world impact. We document your research outcomes in compelling narratives.",
    points: [
      "Qualitative & quantitative cases",
      "Industry & academic case studies",
      "Problem-solution-result structure",
      "Interview & data integration",
      "Visual data presentation",
    ],
    tag: null,
  },
  {
    id: "book-publication",
    num: "08",
    title: "Book Publication",
    icon: BookMarked,
    Animation: BookAnimation,
    accent: "#EC4899",
    accentLight: "#FDF2F8",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FDF2F8 100%)",
    borderColor: "rgba(236,72,153,0.2)",
    shadowColor: "rgba(236,72,153,0.1)",
    desc: "Turn your research into a published book. We guide you from manuscript preparation through finding the right publisher.",
    points: [
      "Manuscript structuring & editing",
      "Publisher identification & outreach",
      "ISBN & copyright guidance",
      "Self-publishing support",
      "Print & digital formats",
    ],
    tag: null,
  },
  {
    id: "journal-publication",
    num: "09",
    title: "Journal Publication",
    icon: Globe,
    Animation: JournalAnimation,
    accent: "#14B8A6",
    accentLight: "#F0FDFA",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F0FDFA 100%)",
    borderColor: "rgba(20,184,166,0.2)",
    shadowColor: "rgba(20,184,166,0.1)",
    desc: "Getting published in a reputable journal is a major milestone. We navigate the complex submission process efficiently.",
    points: [
      "Scopus & SCI journal targeting",
      "Cover letter & submission support",
      "Reviewer response drafting",
      "Impact factor analysis",
      "Post-acceptance formatting",
    ],
    tag: "Scopus Ready",
  },
];

export default function PhdJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Scroll to service if hash is present
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionRef.current) {
      const index = services.findIndex((s) => s.id === hash);
      if (index !== -1) {
        setTimeout(() => {
          serviceRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    }

    // Animate each service row on scroll
    serviceRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.fromTo(
          ref.querySelectorAll(".animate-on-scroll"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      gsap.killTweensOf(".animate-on-scroll");
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${instrumentSerif.variable} w-full px-4 sm:px-8 lg:px-14 py-16 font-sans bg-gradient-to-b from-slate-50 via-white to-slate-50`}
      id="phd-journey"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-blue-600 mb-3">
          Our Services
        </p>
        <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2rem,5vw,3.5rem)] text-gray-900 leading-none tracking-tight">
          PhD Journey Support
        </h2>
        <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
          Comprehensive academic support at every stage of your doctoral journey
        </p>
      </div>

      {/* Services List - Alternating Layout with Cards */}
      <div className="max-w-6xl mx-auto">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;
          const AnimationComponent = service.Animation;

          return (
            <div
              key={service.id}
              id={service.id}
              ref={(el) => {
                serviceRefs.current[idx] = el;
              }}
              className={`relative flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-10 items-center py-10 mb-8 rounded-3xl transition-all duration-500 hover:-translate-y-1 group`}
              style={{
                background: service.bgGradient,
                border: `1px solid ${service.borderColor}`,
                boxShadow: `0 20px 40px -12px ${service.shadowColor}, 0 4px 12px rgba(0,0,0,0.02)`,
              }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-tr-3xl opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${service.accent}, transparent)`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-bl-3xl opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at bottom left, ${service.accent}, transparent)`,
                }}
              />

              {/* Left Side - Animation / Visual */}
              <div className="flex-1 flex justify-center p-6">
                <div className="animate-on-scroll relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px]">
                  {/* Glow behind animation */}
                  <div
                    className="absolute inset-0 rounded-full blur-3xl transition-all duration-500 group-hover:opacity-50"
                    style={{ background: service.accent, opacity: 0.2 }}
                  />
                  {/* Pulse ring on hover */}
                  <div
                    className="absolute inset-0 rounded-full border-2 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 opacity-0"
                    style={{ borderColor: `${service.accent}40` }}
                  />
                  <AnimationComponent />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 p-6 lg:p-8 space-y-5">
                {/* Number & Tag */}
                <div className="flex items-center gap-3 flex-wrap animate-on-scroll">
                  <span
                    className="text-[0.65rem] font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full bg-white shadow-sm"
                    style={{ color: service.accent }}
                  >
                    {service.num}
                  </span>
                  {service.tag && (
                    <span
                      className="text-[0.6rem] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
                      style={{
                        background: `${service.accentLight}`,
                        color: service.accent,
                        border: `1px solid ${service.accent}30`,
                      }}
                    >
                      {service.tag}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="animate-on-scroll font-[family-name:var(--font-serif)] text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-gray-900">
                  {service.title}
                </h3>

                {/* Accent Line with animation */}
                <div
                  className="animate-on-scroll w-12 h-[3px] rounded-full transition-all duration-500 group-hover:w-20"
                  style={{ background: service.accent }}
                />

                {/* Description */}
                <p className="animate-on-scroll text-[0.85rem] leading-[1.7] text-gray-600">
                  {service.desc}
                </p>

                {/* Features List - Grid layout */}
                <ul className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-[0.78rem] text-gray-600"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ background: `${service.accent}15` }}
                      >
                        <Check size={11} style={{ color: service.accent }} strokeWidth={3} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="animate-on-scroll pt-4">
                  <button
                    className="group/btn flex items-center gap-2.5 px-6 py-3 rounded-full text-[0.7rem] font-bold uppercase tracking-wider text-white transition-all duration-300 hover:gap-4 hover:shadow-lg"
                    style={{ background: service.accent }}
                  >
                    Get Started
                    <ArrowRight
                      size={13}
                      className="transition-all duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 pt-10">
        <p className="text-gray-500 text-sm mb-4">Not sure which service you need?</p>
        <button className="px-8 py-3.5 rounded-full bg-gray-900 text-white text-[0.75rem] font-bold uppercase tracking-wider hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
          Talk to Our Expert
        </button>
      </div>
    </div>
  );
}