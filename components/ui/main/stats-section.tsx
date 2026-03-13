"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 99,  suffix: "%", label: "Success in getting happy customers" },
  { value: 25,  suffix: "K+", label: "Thousands of successful businesses" },
  { value: 120, suffix: "+", label: "Total clients who love AIS Solutions" },
  { value: 4.9, suffix: "★", label: "Stars reviews given by satisfied clients", decimal: true },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.value,
      duration: 2,
      ease: "power2.out",
      delay: index * 0.15,
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (!numRef.current) return;
        numRef.current.textContent = stat.decimal
          ? obj.val.toFixed(1)
          : Math.floor(obj.val).toString();
      },
    });
  }, [stat.value, stat.decimal, index]);

  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-8 flex flex-col justify-between min-h-[200px] group"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {/* Blue glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(26,86,219,0.06) 0%, transparent 70%)" }}
      />

      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, #1A56DB, transparent)" }}
      />

      {/* Number */}
      <div className="flex items-end gap-1">
        <span
          ref={numRef}
          className="text-[4rem] font-black leading-[1] tracking-[-0.04em] text-[#111]"
        >
          0
        </span>
        <span className="text-[2rem] font-black leading-[1.3] text-[#1A56DB]">
          {stat.suffix}
        </span>
      </div>

      {/* Divider */}
      <div className="w-8 h-[2px] bg-[#1A56DB] opacity-30 my-4" />

      {/* Label */}
      <p className="text-[0.82rem] text-black/50 leading-[1.6]">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = sectionRef.current?.querySelectorAll(".stat-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          id: "stats-trigger",
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => ScrollTrigger.getById("stats-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-[9px] mb-3">
          <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
          <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
            By The Numbers
          </span>
        </div>
        <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111]">
          Results that speak<br />for themselves
        </h2>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card opacity-0">
            <StatCard stat={stat} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}