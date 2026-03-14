"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sakshi Patil",
    role: "Software Developer",
    text: "Interning at AIS Solutions Pvt. Ltd. was an incredible experience! I worked on real-world projects that improved my coding skills and exposed me to best industry practices. The team was supportive, and I never felt like just an intern — I was a valuable part of the company.",
  },
  {
    name: "Amit Kulkarni",
    role: "Data Analyst",
    text: "The internship provided a perfect balance of hands-on learning and structured guidance. Working on live data sets gave me a deep understanding of data visualization, SQL, and Python. This experience has helped me land a full-time role in data analytics.",
  },
  {
    name: "Sneha Joshi",
    role: "Digital Marketing",
    text: "AIS Solutions provided me with a well-structured internship where I worked on SEO strategies, social media campaigns, and market research. I got hands-on experience using tools like Google Analytics and Meta Ads Manager.",
  },
  {
    name: "Rohan Mehta",
    role: "UI/UX Design",
    text: "I worked on UI/UX projects that enhanced my design thinking and prototyping skills. I had the opportunity to collaborate with developers and product managers, which improved my communication and problem-solving skills significantly.",
  },
  {
    name: "Neha Sharma",
    role: "Human Resources",
    text: "The HR internship gave me hands-on experience in recruitment, employee engagement, and performance evaluation. The HR team at AIS Solutions is welcoming, and the practical experience I gained has set me on the right career path.",
  },
];

// Duplicate for seamless loop
const doubled = [...testimonials, ...testimonials];
const colors  = ["#1A56DB", "#0d3b2e", "#3b0f1f", "#042f2e", "#431407"];

export default function TestimonialsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const tweenRef    = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Header entrance ──
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { id: "t-header", trigger: sectionRef.current, start: "top 80%" },
      }
    );

    // ── Marquee: scroll the track left by 50% (one set of cards) then loop ──
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; // half because doubled

    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      ScrollTrigger.getById("t-header")?.kill();
      tweenRef.current?.kill();
    };
  }, []);

  const pause  = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return (
    <section ref={sectionRef} className="relative z-[1] py-24 overflow-hidden">

      {/* Header */}
      <div ref={headerRef} className="opacity-0 px-5 sm:px-8 lg:px-[52px] mb-14">
        <div className="flex items-center gap-[9px] mb-4">
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            Intern Reviews
          </span>
        </div>
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111]">
          What our interns say
        </h2>
      </div>

      {/* Left + right fade edges */}
      <div className="absolute left-0 top-[40%] w-24 h-[60%] z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #FDFCF9, transparent)" }} />
      <div className="absolute right-0 top-[40%] w-24 h-[60%] z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #FDFCF9, transparent)" }} />

      {/* Marquee track */}
      <div
        className="flex gap-5 w-max"
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="shrink-0 w-[320px] sm:w-[360px] rounded-[20px] p-7 flex flex-col gap-5 cursor-default"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            {/* Quote icon */}
            <Quote size={20} className="text-[#1A56DB] opacity-40" strokeWidth={1.5} />

            {/* Text */}
            <p className="text-[0.84rem] text-black/60 leading-[1.8] flex-1">
              {t.text}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[0.7rem] font-bold shrink-0"
                style={{ background: colors[i % colors.length] }}
              >
                {t.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-[0.82rem] font-bold text-[#111]">{t.name}</div>
                <div className="text-[0.65rem] text-black/35 tracking-[0.06em] uppercase">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}