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

const navLinks = [
  { label: "Home",        href: "/" },
  { label: "About",       href: "/about" },
  { label: "PHD Services", href: "/phd-services", hasDropdown: true },
  { label: "IT Services", href: "/services" },
  { label: "Contact",     href: "/contact" },
  { label: "Careers",     href: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobilePhd, setMobilePhd]     = useState(false);
  const { setHovered } = useCursor();
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
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
          {navLinks.map(({ label, href, hasDropdown }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/") && href !== "/";

            if (hasDropdown) {
              return (
                <li
                  key={href}
                  className="relative"
                  onMouseEnter={() => { handleDropdownEnter(); setHovered(true); }}
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
                      className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </TransitionLink>

                  {/* Dropdown panel */}
                  <div
                    className={`
                      absolute top-full left-0 mt-2 w-[220px] rounded-[14px] py-2 overflow-hidden
                      transition-all duration-200 origin-top
                      ${dropdownOpen
                        ? "opacity-100 scale-y-100 pointer-events-auto translate-y-0"
                        : "opacity-0 scale-y-95 pointer-events-none -translate-y-1"
                      }
                    `}
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Top accent */}
                    <div className="h-[2px] mx-3 mb-2 rounded-full bg-gradient-to-r from-blue-600 to-transparent" />

                    {phdDropdownItems.map((item) => (
                      <TransitionLink
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[0.72rem] text-black/55 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150 no-underline group"
                      >
                        <span className="w-1 h-1 rounded-full bg-blue-600/30 group-hover:bg-blue-600 transition-colors duration-150 shrink-0" />
                        {item.label}
                      </TransitionLink>
                    ))}
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
          {navLinks.map(({ label, href, hasDropdown }, i) => {
            const isActive = pathname === href;
            return (
              <li
                key={href}
                className={`transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: menuOpen ? `${i * 80}ms` : "0ms" }}
              >
                {hasDropdown ? (
                  <div>
                    {/* PHD Services accordion toggle */}
                    <button
                      onClick={() => setMobilePhd(!mobilePhd)}
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
                        className={`transition-transform duration-300 ${mobilePhd ? "rotate-180 text-blue-600" : "text-black/30"}`}
                      />
                    </button>

                    {/* Mobile dropdown items */}
                    <div className={`overflow-hidden transition-all duration-400 ${mobilePhd ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="pl-4 py-2 flex flex-col gap-1 border-b border-black/06">
                        {phdDropdownItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2 text-[0.9rem] text-black/50 hover:text-blue-600 no-underline transition-colors duration-150"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-600/40 shrink-0" />
                            {item.label}
                          </Link>
                        ))}
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