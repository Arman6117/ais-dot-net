"use client";
import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      [imgRef.current, textRef.current],
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          id: "founder-trigger",
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => ScrollTrigger.getById("founder-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${instrumentSerif.variable} relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24`}
    >
      {/* Section label */}
      <div className="flex items-center gap-[9px] mb-16">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
          The Founder
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── Left: Founder card ── */}
        <div ref={imgRef} className="opacity-0 flex justify-center lg:justify-start">
          <div
            className="relative w-[300px] h-[380px] rounded-[20px] overflow-hidden shadow-2xl"
            style={{ border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <Image
              src="/founder.jpg"
              alt="Mr. Prajyot S. Patil"
              fill
              className="object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-14 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="text-[1.1rem] font-bold">Mr. Prajyot S. Patil</div>
              <div className="text-[0.65rem] opacity-60 tracking-[0.1em] uppercase mt-1">
                Founder & CEO
              </div>
            </div>
            {/* Blue accent corner */}
            <div
              className="absolute top-4 left-4 text-[0.52rem] font-bold tracking-[0.14em] uppercase rounded-[4px] px-[9px] py-1 text-white"
              style={{ background: "#1A56DB" }}
            >
              Founder
            </div>
          </div>
        </div>

        {/* ── Right: Bio ── */}
        <div ref={textRef} className="opacity-0 flex flex-col gap-6">
          <h2 className="font-[family-name:var(--font-serif)] italic text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[#111]">
            A visionary built on<br />
            <span className="text-[#1A56DB]">15 years of trust.</span>
          </h2>

          <p className="text-[0.88rem] text-black/60 leading-[1.8]">
            Prajyot Patil is a visionary entrepreneur and the driving force behind AIS Solutions. With over 15 years of experience in the industry, he has transformed ideas into reality — leading the company with innovation, dedication, and passion.
          </p>
          <p className="text-[0.88rem] text-black/60 leading-[1.8]">
            Under his leadership, AIS Solutions has built a culture of excellence and creativity, making an impact in research consulting and setting new standards for PhD guidance across Pune and beyond.
          </p>
          <p className="text-[0.88rem] text-black/60 leading-[1.8]">
            His mission is to create solutions that drive progress and empower businesses and scholars worldwide — one research journey at a time.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-10 pt-4 border-t border-black/[0.06]">
            <div>
              <div className="font-[family-name:var(--font-serif)] italic text-[2.8rem] leading-[1] text-[#111] tracking-[-0.03em]">
                15<span className="text-[#1A56DB]">+</span>
              </div>
              <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-black/35 mt-1">
                Years Experience
              </div>
            </div>
            <div className="w-[1px] h-10 bg-black/[0.06]" />
            <div>
              <div className="font-[family-name:var(--font-serif)] italic text-[2.8rem] leading-[1] text-[#111] tracking-[-0.03em]">
                500<span className="text-[#1A56DB]">+</span>
              </div>
              <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-black/35 mt-1">
                PhD Scholars
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}