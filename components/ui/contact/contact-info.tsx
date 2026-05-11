// components/contact/contact-info.tsx
"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, Star, Send, CheckCircle2, Sparkles } from "lucide-react";

const INFO = [
  {
    icon: Phone,
    label: "Call Us",
    primary: "+91 99757 07273",
    secondary: "Mon–Fri, 9am–7pm IST",
    href: "tel:+919975707273",
    color: "#3B82F6",
  },
  {
    icon: Mail,
    label: "Email Us",
    primary: "info@aissolutions.net",
    secondary: "We reply within 24 hours",
    href: "mailto:info@aissolutions.net",
    color: "#10B981",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    primary: "Anand Sagar Building, Pune",
    secondary: "Sinhgad Rd, Maharashtra 411051",
    href: "https://maps.google.com/?q=AIS+Solutions+Pune",
    color: "#F59E0B",
  },
  {
    icon: Clock,
    label: "Working Hours",
    primary: "Mon – Friday",
    secondary: "9:00 AM – 7:00 PM IST",
    href: null,
    color: "#8B5CF6",
  },
];

const SERVICES = [
  "Thesis Writing", "Dissertation Writing", "Research Paper",
  "Journal Publication", "Book Publication", "Data Analytics",
  "IT Services", "Other",
];

export default function ContactInfo() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = (name: string) => `
    w-full px-4 py-3.5 rounded-xl text-[13.5px] text-white placeholder:text-white/20 outline-none
    transition-all duration-300 font-medium border
    ${focused === name 
      ? "bg-[#1A56DB]/10 border-[#1A56DB]/50" 
      : "bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12]"
    }
  `;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-10 items-start">
      
      {/* LEFT - Contact cards */}
      <div className="space-y-3.5">
        {INFO.map(({ icon: Icon, label, primary, secondary, href, color }) => {
          const Card = href ? 'a' : 'div';
          return (
            <Card
              key={label}
              {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:translate-x-1.5 block"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"
                style={{ background: color }} />
              
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                style={{ background: `${color}14`, border: `1px solid ${color}25` }}>
                <Icon size={20} strokeWidth={1.5} style={{ color }} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-[9.5px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: `${color}90` }}>
                  {label}
                </div>
                <div className="text-[14.5px] font-semibold text-white/85 leading-snug">
                  {primary}
                </div>
                <div className="text-[11.5px] text-white/30 mt-1 leading-relaxed">
                  {secondary}
                </div>
              </div>
              
              {href && (
                <ArrowRight size={15} className="text-white/15 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300 mt-1.5 shrink-0" />
              )}
            </Card>
          );
        })}

        {/* Rating badge */}
        <div className="flex items-center gap-4 px-5 py-4 rounded-2xl mt-1"
          style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.12)" }}>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#FBBF24" color="#FBBF24" strokeWidth={0} />
            ))}
          </div>
          <div>
            <span className="text-[13px] font-bold text-white/75">4.9</span>
            <span className="text-[11.5px] text-white/30 ml-1.5">• 650+ Google reviews</span>
          </div>
        </div>
      </div>

      {/* RIGHT - Form */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(40px)",
          boxShadow: "0 8px 80px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500" />

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-7 sm:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-1">
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-[9.5px] font-bold tracking-[0.35em] uppercase text-blue-400/70">
                Send a Message
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-serif)] text-white text-[2rem] leading-tight mb-2">
              How can we help?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Dr. Rohan Mehta" },
                { key: "email", label: "Email Address", type: "email", placeholder: "you@university.edu" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-white/30">{label}</label>
                  <input
                    type={type} required placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                    className={inputClasses(key)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-white/30">Phone Number</label>
              <input
                type="tel" placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                className={inputClasses("phone")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-white/30">Service Needed</label>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map(s => (
                  <button
                    key={s} type="button"
                    onClick={() => setForm(p => ({ ...p, service: s }))}
                    className={`px-3.5 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                      form.service === s 
                        ? "bg-blue-500/20 border-blue-400/40 text-blue-300" 
                        : "bg-white/[0.03] border-white/[0.06] text-white/35 hover:text-white/60 hover:border-white/[0.12]"
                    } border`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9.5px] font-bold tracking-[0.18em] uppercase text-white/30">Your Message</label>
              <textarea
                rows={4} required
                placeholder="Tell us about your research project or requirements..."
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                className={`${inputClasses("message")} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-[12px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] mt-1"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
                boxShadow: "0 4px 32px rgba(59,130,246,0.3)",
              }}
            >
              <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              Send Message
            </button>

            <p className="text-center text-[11px] text-white/20">
              We respond within 24 hours · No spam, ever
            </p>
          </form>
        ) : (
          <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center gap-6 min-h-[500px]">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <CheckCircle2 size={36} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-serif)] text-white text-3xl mb-3">Message Received!</h3>
              <p className="text-white/40 text-[14px] leading-relaxed max-w-xs">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
            </div>
            <button 
              onClick={() => { setSubmitted(false); setForm({ name:"", email:"", phone:"", service:"", message:"" }); }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300 mt-2"
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}