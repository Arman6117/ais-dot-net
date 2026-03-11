import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    items: string[];
  };
}
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      className="service-card group relative overflow-hidden rounded-[20px] cursor-none h-70 sm:h-95"
      style={{
        background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle, #1A56DB, transparent)" }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="absolute inset-0 animate-float flex flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="text-[0.58rem] font-bold tracking-[0.22em] text-white/20">
            {service.id}
          </span>
          <div
            className="size-1.75  rounded-full bg-[#1A56DB]"
            style={{ boxShadow: "0 0 8px rgba(26,86,219,0.8)" }}
          />
        </div>

        <h3 className="font-serif italic text-[1.7rem] leading-[1.15] text-white px-2">
          {service.title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="h-px flex-1 bg-white/6" />
          <span className="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-white/15 ml-3">
            Hover
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-7 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: "linear-gradient(145deg, #1A56DB 0%, #1245b8 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
        <div>
          <span className="text-[0.58rem] font-bold tracking-[0.22em] text-white/50 uppercase">
            {service.id} — Includes
          </span>
          <h3 className="font-serif italic text-[1.6rem] leading-[1.15] text-white mt-2 mb-5">
            {service.title}
          </h3>
          <ul className="flex flex-col gap-3">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.8rem] text-white/85 leading-snug"
              >
                <span className="mt-1.5 size-1 rounded-full bg-white/60 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <a
          href="/phd-services"
          className="group/link inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.06em] text-white no-underline"
        >
          <span className="border-b border-white/30 pb-px">Learn more</span>
          <ArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1 size-3" />
        </a>
      </div>
    </div>
  );
}
