"use client";
import { useCursor } from "@/lib/cursor-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setHovered } = useCursor();
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

        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li
                key={href}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Link
                  href={href}
                  className={`
                    inline-block px-4 py-1.5 rounded-md
                    text-[0.72rem] font-medium tracking-widest uppercase
                    transition-all duration-200 no-underline
                    ${
                      isActive
                        ? "text-blue-600 font-bold bg-blue-600/10"
                        : "text-black/40 hover:text-[#111] hover:bg-black/5"
                    }
                  `}
                >
                  {label}
                </Link>
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

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9 bg-transparent border-none cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`
          fixed inset-0 z-40 bg-[#FAF9F6] flex flex-col
          transition-all duration-500
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="h-16 border-b border-black/5" />

        <ul className="flex flex-col flex-1 justify-center px-8 gap-2 list-none mt-12 m-0 p-0">
          {navLinks.map(({ label, href }, i) => {
            const isActive = pathname === href;
            return (
              <li
                key={href}
                className={`transition-all duration-500 ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 80}ms` : "0ms" }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    flex items-center justify-between
                    py-5 border-b border-black/06
                    text-[2rem] font-black tracking-tight no-underline
                    transition-colors duration-200
                    ${
                      isActive
                        ? "text-blue-600"
                        : "text-[#111] hover:text-blue-600"
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <span className="text-sm font-medium text-blue-600/60 tracking-widest uppercase">
                      Current
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile CTA */}
        <div
          className={`px-8 pb-12 transition-all duration-500 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
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
