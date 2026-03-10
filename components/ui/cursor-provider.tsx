"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { CursorContext } from "@/context/cursor-context";

export default function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef(null);
  const gridRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    const xDot = gsap.quickTo(dotRef.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const yDot = gsap.quickTo(dotRef.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    const xRing = gsap.quickTo(ringRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const yRing = gsap.quickTo(ringRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });
    const xToGlow = gsap.quickTo(glowRef.current, "x", {
      duration: 1.5,
      ease: "power2.out",
    });
    const yToGlow = gsap.quickTo(glowRef.current, "y", {
      duration: 1.5,
      ease: "power2.out",
    });

    const xToGrid = gsap.quickTo(gridRef.current, "x", {
      duration: 2,
      ease: "power2.out",
    });
    const yToGrid = gsap.quickTo(gridRef.current, "y", {
      duration: 2,
      ease: "power2.out",
    });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);

      xRing(e.clientX);
      yRing(e.clientY);
      xToGlow(e.clientX);
      yToGlow(e.clientY);
      const moveX = (e.clientX / window.innerWidth - 0.5) * -20;
      const moveY = (e.clientY / window.innerHeight - 0.5) * -20;
      xToGrid(moveX);
      yToGrid(moveY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    if (hovered) {
      gsap.to(ringRef.current, {
        width: 60,
        height: 60,
        borderColor: "#1A56DB",
        background: "rgba(26,86,219,0.1)",
        duration: 0.3,
      });

      gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
    } else {
      gsap.to(ringRef.current, {
        width: 40,
        height: 40,
        borderColor: "rgba(26,86,219,0.3)",
        background: "transparent",
        duration: 0.3,
      });

      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    }
  }, [hovered]);

  return (
    <CursorContext.Provider value={{ setHovered }}>
      <div
        ref={gridRef}
        className="fixed -inset-12.5 pointer-events-none z-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1A56DB 1px, transparent 1px),
            linear-gradient(to bottom, #1A56DB 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[50vmax] h-[50vmax] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(26, 86, 219, 0.2) 0%, transparent 0%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-600 rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
      />

      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-blue-600/30 rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2"
      />

      {children}
    </CursorContext.Provider>
  );
}
