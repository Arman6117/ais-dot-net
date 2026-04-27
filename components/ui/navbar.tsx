"use client";
import { useCursor } from "@/context/cursor-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
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
  const pathname                            = usePathname();
  const [menuOpen, setMenuOpen]             = useState(false);
  const [dropdownOpen, setDropdownOpen]     = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
  const { setHovered }                      = useCursor();
  const dropdownTimer                       = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isDark = !scrolled;

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-6 md:px-12 lg:px-16
          transition-all duration-500 ease-out
          ${scrolled
            ? "bg-white/98 backdrop-blur-xl border-b border-gray-100 shadow-lg"
            : "bg-gradient-to-r from-[#0A1628]/90 to-[#0D1B3E]/90 backdrop-blur-md border-b border-white/10"
          }
        `}
        style={{ height: "72px" }}
      >
        {/* Logo - Enhanced */}
        <Link
          href="/"
          className={`group relative flex items-center gap-1 font-black text-xl tracking-tight no-underline transition-all duration-300 hover:scale-105 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative">
            AIS
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
          <span className={`${isDark ? "text-blue-400" : "text-blue-600"} font-bold`}>
            Solutions
          </span>
          <Sparkles size={14} className={`${isDark ? "text-blue-400" : "text-blue-600"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </Link>

        {/* Desktop nav links - Larger font size */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-3 list-none m-0 p-0">
          {navLinks.map(({ label, href, hasDropdown, dropdownItems }) => {
            const isActive       = pathname === href || (href !== "/" && pathname.startsWith(href));
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
                      inline-flex items-center gap-1.5 px-5 py-2 rounded-xl
                      text-[0.85rem] font-semibold tracking-wide
                      transition-all duration-300 no-underline
                      ${isActive
                        ? isDark
                          ? "text-blue-400 bg-blue-400/15 shadow-sm"
                          : "text-blue-600 bg-blue-50"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }
                    `}
                  >
                    {label}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={`transition-all duration-300 ${isDropdownOpen ? "rotate-180 opacity-100" : "opacity-60"}`}
                    />
                  </TransitionLink>

                  {/* Enhanced Dropdown */}
                  <div
                    className={`
                      absolute top-full left-0 mt-3 w-[260px] rounded-2xl py-3 overflow-hidden
                      transition-all duration-300 origin-top
                      ${isDropdownOpen
                        ? "opacity-100 scale-y-100 pointer-events-auto translate-y-0"
                        : "opacity-0 scale-y-90 pointer-events-none -translate-y-2"
                      }
                    `}
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                    }}
                    onMouseEnter={() => handleDropdownEnter(label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Animated gradient bar */}
                    <div className={`h-[3px] mx-4 mb-3 rounded-full bg-gradient-to-r ${
                      label === "PHD Services"
                        ? "from-blue-500 via-blue-400 to-transparent"
                        : "from-emerald-500 via-emerald-400 to-transparent"
                    } animate-pulse`} />
                    
                    <div className="px-5 py-2 mb-1">
                      <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase ${
                        label === "PHD Services" ? "text-blue-500" : "text-emerald-500"
                      }`}>
                        {label === "PHD Services" ? "Academic Excellence" : "Tech Innovation"}
                      </span>
                    </div>
                    
                    {dropdownItems?.map((item, idx) => (
                      <TransitionLink
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-5 py-2.5 text-[0.8rem] font-medium text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-transparent transition-all duration-200 no-underline group"

                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          label === "PHD Services"
                            ? "bg-blue-400/40 group-hover:bg-blue-500 group-hover:scale-150"
                            : "bg-emerald-400/40 group-hover:bg-emerald-500 group-hover:scale-150"
                        } transition-all duration-200 shrink-0`} />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.label}
                        </span>
                      </TransitionLink>
                    ))}
                    
                    <div className="mx-4 mt-3 pt-3 border-t border-gray-100">
                      <TransitionLink
                        href={href}
                        className="flex items-center justify-between px-3 py-2 text-[0.7rem] font-medium text-gray-500 hover:text-blue-600 transition-all duration-200 no-underline rounded-lg hover:bg-blue-50/50"
                      >
                        <span>View all {label}</span>
                        <span className="text-base group-hover:translate-x-1 transition-transform duration-200">→</span>
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
                    inline-block px-5 py-2 rounded-xl
                    text-[0.85rem] font-semibold tracking-wide
                    transition-all duration-300 no-underline
                    ${isActive
                      ? isDark
                        ? "text-blue-400 bg-blue-400/15 shadow-sm"
                        : "text-blue-600 bg-blue-50"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                >
                  {label}
                </TransitionLink>
              </li>
            );
          })}
        </ul>

        {/* Enhanced CTA Button */}
        <Link
          href="/contact"
          className={`
            hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-[0.8rem] font-bold tracking-wide rounded-xl
            transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg no-underline whitespace-nowrap
            ${isDark
              ? "bg-gradient-to-r from-white to-gray-100 text-[#0D1B3E] hover:from-blue-500 hover:to-blue-600 hover:text-white shadow-md"
              : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-blue-600 hover:to-blue-700 shadow-md"
            }
          `}
        >
          <Sparkles size={14} className="opacity-70" />
          Free Consultation
        </Link>

        {/* Improved Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-transparent border-none cursor-pointer group"
          aria-label="Toggle menu"
        >
          <div className="relative w-5 h-5">
            <span
              className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                isDark ? "bg-white" : "bg-gray-900"
              } ${
                menuOpen ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                isDark ? "bg-white" : "bg-gray-900"
              } ${
                menuOpen ? "opacity-0 scale-x-0" : "top-1/2 -translate-y-1/2"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-[2px] rounded-full transition-all duration-300 ${
                isDark ? "bg-white" : "bg-gray-900"
              } ${
                menuOpen ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-0"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-br from-[#0A1628] via-[#0D1B3E] to-[#0A1628] flex flex-col transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-[72px]" />

        <ul className="flex flex-col flex-1 justify-center px-8 gap-3 list-none mt-8 m-0 p-0 overflow-y-auto">
          {navLinks.map(({ label, href, hasDropdown, dropdownItems }, i) => {
            const isActive     = pathname === href;
            const isMobileOpen = mobileDropdown === label;

            return (
              <li
                key={href}
                className={`transform transition-all duration-500 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={{ transitionDelay: menuOpen ? `${i * 80}ms` : "0ms" }}
              >
                {hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(label)}
                      className={`
                        flex items-center justify-between w-full py-4
                        border-b border-white/10
                        text-[1.8rem] font-bold tracking-tight
                        bg-transparent transition-all duration-200
                        ${isActive ? "text-blue-400" : "text-white hover:text-blue-400"}
                      `}
                    >
                      {label}
                      <ChevronDown
                        size={22}
                        strokeWidth={2}
                        className={`transition-all duration-300 ${
                          isMobileOpen ? "rotate-180 text-blue-400" : "text-white/40"
                        }`}
                      />
                    </button>

                    <div className={`overflow-hidden transition-all duration-400 ${
                      isMobileOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}>
                      <div className="pl-5 py-3 flex flex-col gap-2">
                        <div className="px-3 py-2 mb-1">
                          <span className={`text-[0.65rem] font-bold tracking-[0.2em] uppercase ${
                            label === "PHD Services" ? "text-blue-400" : "text-emerald-400"
                          }`}>
                            {label === "PHD Services" ? "ACADEMIC SUPPORT" : "TECHNICAL SOLUTIONS"}
                          </span>
                        </div>
                        {dropdownItems?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 py-2.5 text-[0.95rem] text-white/60 hover:text-white transition-all duration-200 no-underline group"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              label === "PHD Services"
                                ? "bg-blue-400/40 group-hover:bg-blue-400"
                                : "bg-emerald-400/40 group-hover:bg-emerald-400"
                            } shrink-0 transition-all duration-200 group-hover:scale-150`} />
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 mt-2 text-[0.75rem] text-white/30 hover:text-blue-400 transition-all duration-200 no-underline"
                        >
                          <span>View all {label}</span>
                          <span className="text-sm">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      flex items-center justify-between py-4
                      border-b border-white/10
                      text-[1.8rem] font-bold tracking-tight no-underline
                      transition-all duration-200
                      ${isActive ? "text-blue-400" : "text-white hover:text-blue-400"}
                    `}
                  >
                    {label}
                    {isActive && (
                      <span className="text-sm font-medium text-blue-400/70 tracking-widest uppercase">
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
          className={`px-8 pb-12 transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
        >
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[0.85rem] font-bold tracking-wider rounded-xl no-underline hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <Sparkles size={16} />
            Free Consultation
          </Link>
          <p className="text-center text-[0.65rem] text-white/30 tracking-widest uppercase mt-6">
            Pune, India · Est. 2014
          </p>
        </div>
      </div>
    </>
  );
}