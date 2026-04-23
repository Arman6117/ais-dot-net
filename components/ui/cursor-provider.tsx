"use client";

import { useRef, useEffect } from "react";
import { CursorContext } from "@/context/cursor-context";

export default function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cursorTriangleRef = useRef<HTMLDivElement>(null);
  const cursorSquareRef = useRef<HTMLDivElement>(null);
  const cursorCrossRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const rotation = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      rotation.current += 0.02;
      
      if (cursorTriangleRef.current) {
        cursorTriangleRef.current.style.transform = `translate(${pos.current.x - 10}px, ${pos.current.y - 10}px) rotate(${rotation.current * 180}deg)`;
      }
      
      if (cursorSquareRef.current) {
        cursorSquareRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px) rotate(${-rotation.current * 120}deg) scale(0.8)`;
      }
      
      if (cursorCrossRef.current) {
        cursorCrossRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px) rotate(${rotation.current * 90}deg)`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const setHovered = (val: boolean) => {
    if (!cursorTriangleRef.current || !cursorSquareRef.current) return;
    
    if (val) {
      cursorTriangleRef.current.style.transform += " scale(1.5)";
      cursorTriangleRef.current.style.opacity = "1";
      cursorSquareRef.current.style.transform += " scale(1.8)";
      cursorSquareRef.current.style.opacity = "0.6";
    } else {
      cursorTriangleRef.current.style.transform = cursorTriangleRef.current.style.transform.replace(" scale(1.5)", "");
      cursorTriangleRef.current.style.opacity = "0.6";
      cursorSquareRef.current.style.transform = cursorSquareRef.current.style.transform.replace(" scale(1.8)", "");
      cursorSquareRef.current.style.opacity = "0.3";
    }
  };

  return (
    <CursorContext.Provider value={{ setHovered }}>
      {/* Triangle cursor */}
      <div
        ref={cursorTriangleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200"
        style={{
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "16px solid #1A56DB",
          opacity: 0.6,
          filter: "drop-shadow(0 0 4px #1A56DB)",
          transition: "all 0.15s ease",
        }}
      />
      
      {/* Square cursor */}
      <div
        ref={cursorSquareRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300"
        style={{
          width: "12px",
          height: "12px",
          background: "#8B5CF6",
          opacity: 0.3,
          transform: "rotate(45deg)",
          transition: "all 0.2s ease",
        }}
      />
      
      <div
        ref={cursorCrossRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: "24px",
          height: "24px",
          position: "relative",
        }}
      >
        <div className="absolute w-0.5 h-full bg-white/50 left-1/2 -translate-x-1/2" />
        <div className="absolute w-full h-0.5 bg-white/50 top-1/2 -translate-y-1/2" />
      </div>
      
      {children}
    </CursorContext.Provider>
  );
}