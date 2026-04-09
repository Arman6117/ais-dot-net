"use client";
import { Instrument_Serif } from "next/font/google";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "PhD Services", href: "/phd-services" },
  { label: "IT Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

// PhD Services Links - all redirect to /phd-services
const phdServicesLinks = [
  { label: "Thesis Writing", href: "/phd-services" },
  { label: "Dissertation Writing", href: "/phd-services" },
  { label: "Research Paper Writing", href: "/phd-services" },
  { label: "Article Writing", href: "/phd-services" },
  { label: "Biography Writing", href: "/phd-services" },
  { label: "Business Proposal Writing", href: "/phd-services" },
  { label: "Case Study Writing", href: "/phd-services" },
  { label: "Book Publication", href: "/phd-services" },
  { label: "Journal Publication", href: "/phd-services" },
];

// IT Services Links - all redirect to /services
const itServicesLinks = [
  { label: "Data Collection Survey", href: "/services" },
  { label: "AI & ML Service", href: "/services" },
  { label: "PhD Assistance & Guidance", href: "/services" },
  { label: "Corporate Training & Workshops", href: "/services" },
  { label: "Statistical Analysis", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "Internship Opportunities", href: "/services" },
];

const contact = [
  { icon: Phone, value: "+91 9975707273", href: "tel:+91 9975707273" },
  { icon: Mail, value: "info@aissolutions.net", href: "mailto:info@aissolutions.net" },
  { icon: MapPin, value: "Pune, Maharashtra, India", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className={`${instrumentSerif.variable} relative bg-[#0a0a18] text-white overflow-hidden`}
    >
      {/* Top sheen */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,86,219,0.5), transparent)" }}
      />

      {/* Blue glow top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }}
      />

      {/* Main content */}
      <div className="relative px-5 sm:px-8 lg:px-[52px] pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_1.5fr_1fr] gap-8 pb-16 border-b border-white/[0.07]">
          
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[1.3rem] font-extrabold tracking-[-0.02em] text-white">
                AIS <span className="text-[#1A56DB]">Solutions</span>
              </span>
            </div>
            <p className="text-[0.85rem] text-white/40 leading-[1.8]">
              Empowering scholars and businesses through precision research, data analytics, and end-to-end consulting — from PhD thesis to publication and beyond.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-[9px] w-fit px-5 py-2.5 rounded-[8px] text-[0.72rem] font-bold tracking-[0.04em] border border-white/10 text-white/70 hover:border-[#1A56DB] hover:text-white transition-all duration-300"
            >
              Free Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Col 2: PhD Services Links */}
          <div>
            <div className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-white/30 mb-6">
              PhD Services
            </div>
            <ul className="flex flex-col gap-2">
              {phdServicesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] text-white/50 hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#1A56DB]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: IT Services Links */}
          <div>
            <div className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-white/30 mb-6">
              IT Services
            </div>
            <ul className="flex flex-col gap-2">
              {itServicesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] text-white/50 hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#1A56DB]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Contact */}
          <div>
            <div className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-white/30 mb-6">
              Get In Touch
            </div>
            <ul className="flex flex-col gap-5 mb-8">
              {contact.map(({ icon: Icon, value, href }) => (
                <li key={value}>
                  <a
                    href={href}
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="mt-[2px] w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[#1A56DB]"
                      style={{ background: "rgba(26,86,219,0.12)", border: "1px solid rgba(26,86,219,0.2)" }}
                    >
                      <Icon size={13} className="text-[#1A56DB] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                    </div>
                    <span className="text-[0.82rem] text-white/50 group-hover:text-white/80 transition-colors duration-200 leading-[1.6]">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Quick Navigation Links */}
            <div className="text-[0.6rem] font-bold tracking-[0.22em] uppercase text-white/30 mb-4">
              Quick Links
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[0.75rem] text-white/40 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[0.72rem] text-white/25">
            © {new Date().getFullYear()} AIS Solutions Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-[0.72rem] text-white/20 hover:text-white/40 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-[0.72rem] text-white/20 hover:text-white/40 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}