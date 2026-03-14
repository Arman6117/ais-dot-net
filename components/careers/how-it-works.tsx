"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, PhoneCall, Users, BadgeCheck } from "lucide-react";

const steps = [
  { icon: Mail,       num: "01", title: "Drop Your Resume",          desc: "Send an updated and accurate resume to info@aissolutions.net with your area of interest." },
  { icon: PhoneCall,  num: "02", title: "Get a Call",                desc: "Shortlisted candidates will receive a call to schedule their interview. Only shortlisted candidates are contacted." },
  { icon: Users,      num: "03", title: "Attend Interview",          desc: "Appear for the HR + Technical round interview. Make sure you're prepared with your domain knowledge." },
  { icon: BadgeCheck, num: "04", title: "Receive Stipend Details",   desc: "Selected interns receive their offer letter with stipend confirmation and start date details." },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = sectionRef.current?.querySelectorAll(".step-card");
    if (!cards) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { id: "steps-trigger", trigger: sectionRef.current, start: "top 80%" },
      }
    );
    return () => ScrollTrigger.getById("steps-trigger")?.kill();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[1] bg-[#0a0a18] px-5 sm:px-8 lg:px-[52px] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,86,219,0.5), transparent)" }} />

      <div className="flex items-center gap-[9px] mb-4">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">Process</span>
      </div>
      <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-14">
        How to apply
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(({ icon: Icon, num, title, desc }) => (
          <div key={num} className="step-card opacity-0 relative rounded-[20px] p-7 flex flex-col gap-5"
            style={{
              background: "linear-gradient(145deg, #141428, #0a0a18)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="text-[0.55rem] font-bold tracking-[0.2em] text-white/20 uppercase">{num}</div>
            <div className="w-11 h-11 rounded-[12px] flex items-center justify-center"
              style={{ background: "rgba(26,86,219,0.12)", border: "1px solid rgba(26,86,219,0.2)" }}>
              <Icon size={20} strokeWidth={1.5} className="text-[#1A56DB]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[0.95rem] mb-2">{title}</h3>
              <p className="text-white/40 text-[0.78rem] leading-[1.7]">{desc}</p>
            </div>
            {num !== "04" && (
              <div className="hidden lg:block absolute top-[52px] -right-[11px] w-5 h-[1px] bg-white/10" />
            )}
          </div>
        ))}
      </div>

      {/* Apply CTA */}
      <div className="mt-10 flex items-center gap-4">
        <a href="mailto:info@aissolutions.net"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[0.78rem] font-bold text-white transition-opacity duration-200 hover:opacity-80"
          style={{ background: "#1A56DB" }}>
          <Mail size={14} strokeWidth={2} />
          Send Your Resume
        </a>
        <span className="text-white/20 text-[0.72rem]">info@aissolutions.net</span>
      </div>
    </section>
  );
}