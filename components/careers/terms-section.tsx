"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const terms = [
  { q: "Who is eligible to apply?",               a: "This internship is open to Master's Graduates only. Please ensure you meet this requirement before applying." },
  { q: "What is the stipend amount?",             a: "Selected interns receive a monthly stipend of ₹3,000–₹6,000 depending on the domain and performance during the interview." },
  { q: "How long is the internship?",             a: "The internship duration is 3 to 6 months. The exact duration will be mentioned in your offer letter." },
  { q: "What are the resume requirements?",       a: "Your resume must be updated, accurate, and relevant to the domain you're applying for. Inaccurate resumes may lead to disqualification." },
  { q: "Will all applicants be contacted?",       a: "Only shortlisted candidates will be contacted for the interview. If you don't hear back within 2 weeks, consider your application unsuccessful for this cycle." },
  { q: "Do I need to bring a laptop?",            a: "Yes, interns are required to bring their own laptop for project work and training sessions." },
  { q: "What does the interview process involve?", a: "The interview consists of two rounds — an HR round and a Technical round. Be prepared with both soft skills and domain-specific knowledge." },
];

export default function TermsSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative z-[1] px-5 sm:px-8 lg:px-[52px] py-24 bg-[#0a0a18] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(26,86,219,0.4), transparent)" }} />

      <div className="flex items-center gap-[9px] mb-4">
        <div className="w-[22px] h-[1.5px] bg-[#1A56DB]" />
        <span className="text-[0.6rem] font-bold tracking-[0.24em] uppercase text-[#1A56DB]">Terms</span>
      </div>
      <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-14">
        Terms & Conditions
      </h2>

      <div className="max-w-[760px] flex flex-col gap-3">
        {terms.map(({ q, a }, i) => (
          <div key={i}
            className="rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              background: open === i ? "rgba(26,86,219,0.08)" : "rgba(255,255,255,0.03)",
              border: open === i ? "1px solid rgba(26,86,219,0.25)" : "1px solid rgba(255,255,255,0.06)",
            }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="p-5 flex items-center justify-between gap-4">
              <span className="text-[0.88rem] font-bold text-white/80">{q}</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ background: open === i ? "rgba(26,86,219,0.2)" : "rgba(255,255,255,0.05)" }}>
                {open === i
                  ? <Minus size={13} className="text-[#1A56DB]" strokeWidth={2} />
                  : <Plus size={13} className="text-white/40" strokeWidth={2} />
                }
              </div>
            </div>
            {open === i && (
              <div className="px-5 pb-5">
                <div className="h-[1px] mb-4" style={{ background: "rgba(26,86,219,0.15)" }} />
                <p className="text-[0.82rem] text-white/45 leading-[1.8]">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}