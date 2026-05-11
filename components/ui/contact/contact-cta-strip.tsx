"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail } from "lucide-react";

export default function ContactCTAStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(stripRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: stripRef.current, start: "top 90%" } }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="bg-[#FDFCF9] px-5 sm:px-8 lg:px-12 py-10">
      <div ref={stripRef} className="max-w-[1320px] mx-auto">
        <div className="rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#08081a] border border-blue-500/10 shadow-lg">
          
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
            <div>
              <div className="text-white font-semibold text-[15px] mb-0.5">Ready to get started?</div>
              <div className="text-white/30 text-[12px]">Skip the form — call or email us directly.</div>
            </div>
          </div>

          <div className="flex gap-3">
            <a href="tel:+919975707273"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-[0.15em] uppercase text-white bg-blue-600 hover:bg-blue-500 transition-colors">
              <Phone size={13} />
              Call Now
            </a>
            <a href="mailto:info@aissolutions.net"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-[0.15em] uppercase text-white/50 border border-white/10 hover:border-white/25 hover:text-white/80 transition-all">
              <Mail size={13} />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}