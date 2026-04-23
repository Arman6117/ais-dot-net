"use client";
import { useCursor } from "@/context/cursor-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import TransitionLink from "./transition-link";

const phdDropdownItems = [
  { label: "Thesis Writing",            href: "/phd-services#thesis-writing" },
  { label: "Dissertation Writing",      href: "/phd-services#dissertation-writing" },
  { label: "Research Paper Writing",    href: "/phd-services#research-paper-writing" },
  { label: "Article Writing",           href: "/phd-services#article-writing" },
  { label: "Biography Writing",         href: "/phd-services#biography-writing" },
  { label: "Business Proposal Writing", href: "/phd-services#business-proposal-writing" },
  { label: "Case Study Writing",        href: "/phd-services#case-study-writing" },
  { label: "Book Publication",          href: "/phd-services#book-publication" },
  { label: "Journal Publication",       href: "/phd-services#journal-publication" },
];

const itServicesDropdownItems = [
  { label: "Data Collection Survey",    href: "/services#data-collection-survey" },
  { label: "Data Analytics",            href: "/services#data-analytics" },
  { label: "AI & ML Service",           href: "/services#ai-ml-service" },
  { label: "Statistical Analysis",      href: "/services#statistical-analysis" },
  { label: "PhD Assistance & Guidance", href: "/services#phd-assistance-guidance" },
  { label: "Web Development",           href: "/services#web-development" },
];

const navLinks = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "PHD Services", href: "/phd-services", hasDropdown: true, dropdownItems: phdDropdownItems },
  { label: "IT Services",  href: "/services",     hasDropdown: true, dropdownItems: itServicesDropdownItems },
  { label: "Contact",      href: "/contact" },
  { label: "Careers",      href: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const { setHovered } = useCursor();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(null), 150);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown(mobileDropdown === label ? null : label);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/5">
        <Link
          href="/"
          className="font-black text-[0.95rem] tracking-tight text-[#111] no-underline"
          onClick={() => setMenuOpen(false)}
        >
          AIS <span className="text-blue-600">Solutions</span>
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map(({ label, href, hasDropdown, dropdownItems }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            const isDropdownOpen = dropdownOpen === label;

            if (hasDropdown) {
              return (
                <li
                  key={href}
                  className="relative"
                  onMouseEnter={() => { handleDropdownEnter(label); setHovered(true); }}
                  onMouseLeave={() => { handleDropdownLeave(); setHovered(false); }}
                >
                  <TransitionLink
                    href={href}
                    className={`
                      inline-flex items-center gap-1 px-4 py-1.5 rounded-md
                      text-[0.72rem] font-medium tracking-widest uppercase
                      transition-all duration-200 no-underline
                      ${isActive
                        ? "text-blue-600 font-bold bg-blue-600/10"
                        : "text-black/40 hover:text-[#111] hover:bg-black/5"
                      }
                    `}
                  >
                    {label}
                    <ChevronDown
                      size={12}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </TransitionLink>

                  {/* Dropdown panel */}
                  <div
                    className={`
                      absolute top-full left-0 mt-2 w-[240px] rounded-[14px] py-2 overflow-hidden
                      transition-all duration-200 origin-top
                      ${isDropdownOpen
                        ? "opacity-100 scale-y-100 pointer-events-auto translate-y-0"
                        : "opacity-0 scale-y-95 pointer-events-none -translate-y-1"
                      }
                    `}
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={() => handleDropdownEnter(label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Top accent with dynamic color */}
                    <div className={`h-[2px] mx-3 mb-2 rounded-full bg-gradient-to-r ${
                      label === "PHD Services" 
                        ? "from-blue-600 to-transparent" 
                        : "from-emerald-600 to-transparent"
                    }`} />

                    {/* Category header */}
                    <div className="px-4 py-1.5 mb-1">
                      <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase text-black/30">
                        {label === "PHD Services" ? "Academic Support" : "Technical Solutions"}
                      </span>
                    </div>

                    {dropdownItems?.map((item) => (
                      <TransitionLink
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[0.72rem] text-black/55 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150 no-underline group"
                      >
                        <span className={`w-1 h-1 rounded-full ${
                          label === "PHD Services" 
                            ? "bg-blue-600/30 group-hover:bg-blue-600" 
                            : "bg-emerald-600/30 group-hover:bg-emerald-600"
                        } transition-colors duration-150 shrink-0`} />
                        {item.label}
                      </TransitionLink>
                    ))}

                    {/* Footer link */}
                    <div className="mx-3 mt-2 pt-2 border-t border-black/5">
                      <TransitionLink
                        href={href}
                        className="flex items-center justify-between px-2 py-1.5 text-[0.65rem] text-black/40 hover:text-blue-600 transition-colors duration-150 no-underline"
                      >
                        <span>View all {label}</span>
                        <span className="text-[0.55rem]">→</span>
                      </TransitionLink>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li
                key={href}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <TransitionLink
                  href={href}
                  className={`
                    inline-block px-4 py-1.5 rounded-md
                    text-[0.72rem] font-medium tracking-widest uppercase
                    transition-all duration-200 no-underline
                    ${isActive
                      ? "text-blue-600 font-bold bg-blue-600/10"
                      : "text-black/40 hover:text-[#111] hover:bg-black/5"
                    }
                  `}
                >
                  {label}
                </TransitionLink>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-block px-5 py-2 bg-[#111] text-[#FAF9F6] text-[0.72rem] font-bold tracking-wider rounded-lg transition-all duration-200 hover:bg-blue-600 hover:-translate-y-px no-underline whitespace-nowrap"
        >
          Free Consultation
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9 bg-transparent border-none cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAF9F6] flex flex-col transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-16 border-b border-black/5" />

        <ul className="flex flex-col flex-1 justify-center px-8 gap-2 list-none mt-12 m-0 p-0 overflow-y-auto">
          {navLinks.map(({ label, href, hasDropdown, dropdownItems }, i) => {
            const isActive = pathname === href;
            const isMobileOpen = mobileDropdown === label;

            return (
              <li
                key={href}
                className={`transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: menuOpen ? `${i * 80}ms` : "0ms" }}
              >
                {hasDropdown ? (
                  <div>
                    {/* Accordion toggle */}
                    <button
                      onClick={() => toggleMobileDropdown(label)}
                      className={`
                        flex items-center justify-between w-full
                        py-5 border-b border-black/06
                        text-[2rem] font-black tracking-tight
                        transition-colors duration-200 bg-transparent border-x-0 border-t-0
                        ${isActive ? "text-blue-600" : "text-[#111]"}
                      `}
                    >
                      {label}
                      <ChevronDown
                        size={24}
                        strokeWidth={2}
                        className={`transition-transform duration-300 ${
                          isMobileOpen 
                            ? "rotate-180 text-blue-600" 
                            : "text-black/30"
                        }`}
                      />
                    </button>

                    {/* Mobile dropdown items */}
                    <div className={`overflow-hidden transition-all duration-400 ${
                      isMobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="pl-4 py-2 flex flex-col gap-1 border-b border-black/06">
                        {/* Category badge */}
                        <div className="px-2 py-1.5 mb-1">
                          <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase ${
                            label === "PHD Services" ? "text-blue-500/60" : "text-emerald-500/60"
                          }`}>
                            {label === "PHD Services" ? "ACADEMIC SUPPORT" : "TECHNICAL SOLUTIONS"}
                          </span>
                        </div>

                        {dropdownItems?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2.5 text-[0.85rem] text-black/50 hover:text-blue-600 no-underline transition-colors duration-150 group"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              label === "PHD Services" 
                                ? "bg-blue-500/40 group-hover:bg-blue-500" 
                                : "bg-emerald-500/40 group-hover:bg-emerald-500"
                            } shrink-0 transition-colors duration-150`} />
                            {item.label}
                          </Link>
                        ))}

                        {/* View all link */}
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between px-2 py-2 mt-1 text-[0.7rem] text-black/40 hover:text-blue-600 transition-colors duration-150 no-underline"
                        >
                          <span>View all {label}</span>
                          <span className="text-[0.6rem]">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      flex items-center justify-between
                      py-5 border-b border-black/06
                      text-[2rem] font-black tracking-tight no-underline
                      transition-colors duration-200
                      ${isActive ? "text-blue-600" : "text-[#111] hover:text-blue-600"}
                    `}
                  >
                    {label}
                    {isActive && (
                      <span className="text-sm font-medium text-blue-600/60 tracking-widest uppercase">
                        Current
                      </span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div
          className={`px-8 pb-12 transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: menuOpen ? "320ms" : "0ms" }}
        >
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-full py-4 bg-[#111] text-[#FAF9F6] text-[0.78rem] font-bold tracking-wider rounded-xl no-underline hover:bg-blue-600 transition-colors duration-200"
          >
            Free Consultation
          </Link>
          <p className="text-center text-[0.65rem] text-black/30 tracking-widest uppercase mt-4">
            Pune, India · Est. 2014
          </p>
        </div>
      </div>
    </>
  );
}