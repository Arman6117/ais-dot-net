"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageCircle, Instagram, Linkedin, Globe, Users } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/919975707273", color: "#25D366" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/ais.solutionss", color: "#E4405F" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/aissolutions", color: "#0A66C2" },
  { name: "Website", icon: Globe, href: "https://ais-dot-net.vercel.app", color: "#ffffff" },
];

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    iconRefs.current.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 10, pointerEvents: "none", scale: 0.85 });
    });
  }, []);

  const open = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (isOpen) return;
    setIsOpen(true);

    iconRefs.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
        duration: 0.35,
        delay: i * 0.055,
        ease: "back.out(1.4)",
      });
    });

    gsap.to(triggerRef.current, {
      backgroundColor: "#0f3fa8",
      scale: 1.08,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const close = () => {
    // Small delay so moving mouse to the icons doesn't flicker-close
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);

      iconRefs.current
        .slice()
        .reverse()
        .forEach((el, i) => {
          gsap.to(el, {
            opacity: 0,
            y: 10,
            scale: 0.85,
            pointerEvents: "none",
            duration: 0.2,
            delay: i * 0.04,
            ease: "power2.in",
          });
        });

      gsap.to(triggerRef.current, {
        backgroundColor: "#1A56DB",
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }, 120);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  return (
    <div
      ref={containerRef}
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2"
      onMouseEnter={() => { cancelClose(); open(); }}
      onMouseLeave={close}
    >
      {/* Stacked social icons — appear above trigger on hover */}
      <div className="flex flex-col items-center gap-[10px] mb-1">
        {socialLinks.map((social, index) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            ref={(el) => { iconRefs.current[index] = el; }}
            title={social.name}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "#0a0a18",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            <social.icon size={16} style={{ color: social.color }} />
          </Link>
        ))}
      </div>

      {/* Trigger button — Users icon clearly hints "social/community" */}
      <button
        ref={triggerRef}
        aria-label="Social links"
        className="w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
        style={{
          background: "#1A56DB",
          boxShadow: "0 4px 18px rgba(26,86,219,0.38)",
          border: "none",
          cursor: "default",
        }}
      >
        <Users size={17} color="#fff" strokeWidth={2} />
      </button>
    </div>
  );
}