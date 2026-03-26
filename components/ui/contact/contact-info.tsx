"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99757 07273",
    sub: "Mon–Sat, 9am–7pm IST",
    href: "tel:+91 99757 07273",
    accent: "#1A56DB",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@aissolutions.net",
    sub: "We reply within 24 hours",
    href: "mailto:info@aissolutions.net",
    accent: "#4ade80",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Office No 2, 1st Floor, Anand Sagar Building,",
    sub: "Sinhgad Rd, near Naturals, above Bata Store, Mahalakshmi Society, Varshanand Society, Anand Nagar, Pune, Maharashtra 411051",
    href: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3784.151402223312!2d73.8235!3d18.4768!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2aba0ce6e5%3A0xd56c149411578bac!2sAIS%20Solutions%20Pvt.%20Ltd.%20%7C%20Ph.D%20Services%20%7C%20Thesis%20%7C%20Statistics%20%7C%20Data%20Analysis%20%7C%20Training!5e0!3m2!1sen!2sin!4v1774533631672!5m2!1sen!2sin",
    accent: "#fb923c",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Friday",
    sub: "9:00 AM – 7:00 PM IST",
    href: null,
    accent: "#a78bfa",
  },
];

export default function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll(".contact-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          id: "contact-cards-trigger",
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => ScrollTrigger.getById("contact-cards-trigger")?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24"
    >
      {/* Header */}
      <div className="flex items-center gap-[9px] mb-4">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
          Contact Details
        </span>
      </div>
      <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111] mb-14">
        Find us here
      </h2>

      {/* Two column layout — cards left, map right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ── Left: Contact cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactItems.map(
            ({ icon: Icon, label, value, sub, href, accent }) => {
              const inner = (
                <div
                  className="contact-card opacity-0 group relative rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
                    style={{
                      background: `radial-gradient(ellipse at 50% 100%, ${accent}10 0%, transparent 70%)`,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, transparent)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{
                      background: `${accent}12`,
                      border: `1px solid ${accent}25`,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: accent }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1">
                    <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-black/30">
                      {label}
                    </div>
                    <div className="text-[0.92rem] font-bold text-[#111] leading-[1.4]">
                      {value}
                    </div>
                    <div className="text-[0.75rem] text-black/45 leading-[1.6]">
                      {sub}
                    </div>
                  </div>

                  {/* Arrow for linked cards */}
                  {href && (
                    <div
                      className="text-[0.68rem] font-bold tracking-[0.08em] uppercase flex items-center gap-1.5 transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: accent }}
                    >
                      <span>
                        {label === "Office Address"
                          ? "Get Directions"
                          : "Contact"}
                      </span>
                      <span>→</span>
                    </div>
                  )}
                </div>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            }
          )}
        </div>

        {/* ── Right: Google Maps embed ── */}
        <div
          className="contact-card opacity-0 rounded-[20px] overflow-hidden h-[420px] lg:h-full min-h-[420px]"
          style={{
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1502369829177!2d73.8235377!3d18.4768528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2aba0ce6e5%3A0xd56c149411578bac!2sAIS%20Solutions%20Pvt.%20Ltd.%20%7C%20Ph.D%20Services%20%7C%20Thesis%20%7C%20Statistics%20%7C%20Data%20Analysis%20%7C%20Training!5e0!3m2!1sen!2sin!4v1773498802674!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AIS Solutions Office Location"
          />
        </div>
      </div>

      {/* Bottom strip — quick reach out */}
      <div
        className="mt-8 rounded-[20px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          background: "#0a0a18",
          border: "1px solid rgba(26,86,219,0.15)",
        }}
      >
        <div>
          <div className="text-white font-bold text-[1rem] mb-1">
            Ready to get started?
          </div>
          <div className="text-white/40 text-[0.82rem]">
            Call or email us directly — no forms, no waiting.
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="tel:+919975707273"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[0.75rem] font-bold text-white transition-all duration-200 hover:opacity-80"
            style={{ background: "#1A56DB" }}
          >
            <Phone size={14} strokeWidth={2} />
            Call Now
          </a>
          <a
            href="mailto:info@aissolutions.net"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[0.75rem] font-bold text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-200"
          >
            <Mail size={14} strokeWidth={2} />
            Send Email
          </a>
        </div>
      </div>
    </section>
  );
}
