"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(mapRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: mapRef.current, start: "top 85%" } }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="bg-[#FDFCF9] px-5 sm:px-8 lg:px-12 pb-0 pt-6">
      <div ref={mapRef} className="max-w-[1320px] mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-[2px] bg-blue-600 rounded-full" />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-blue-600">Our Location</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-stretch">

          <div className="rounded-2xl overflow-hidden h-[400px] border border-black/5 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1502369829177!2d73.8235377!3d18.4768528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2aba0ce6e5%3A0xd56c149411578bac!2sAIS%20Solutions%20Pvt.%20Ltd.%20%7C%20Ph.D%20Services%20%7C%20Thesis%20%7C%20Statistics%20%7C%20Data%20Analysis%20%7C%20Training!5e0!3m2!1sen!2sin!4v1773498802674!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0, filter: "grayscale(0.1)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="AIS Solutions Office"
            />
          </div>

          <div className="rounded-2xl p-8 flex flex-col justify-between bg-[#08081a] border border-blue-500/10 shadow-lg">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
                <MapPin size={12} className="text-blue-400" />
                <span className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-blue-400">Pune Office</span>
              </div>

              <h3 className="font-[family-name:var(--font-serif)] text-white text-2xl leading-tight mb-4">
                AIS Solutions
              </h3>

              <p className="text-white/40 text-[13px] leading-[1.9] mb-6">
                Office No 2, 1st Floor<br />
                Anand Sagar Building, Sinhgad Rd<br />
                near Naturals, above Bata Store<br />
                Anand Nagar, Pune — 411051
              </p>

              <div className="h-px w-full bg-white/[0.05] mb-5" />

              <div className="flex items-start gap-3 mb-3">
                <Clock size={14} className="text-violet-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-0.5">Hours</div>
                  <div className="text-[13px] text-white/60">Mon–Fri, 9 AM – 7 PM IST</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-0.5">Phone</div>
                  <div className="text-[13px] text-white/60">+91 99757 07273</div>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=AIS+Solutions+Pune"
              target="_blank" rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-[11px] font-bold tracking-[0.18em] uppercase text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}
            >
              <MapPin size={13} />
              Get Directions
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}