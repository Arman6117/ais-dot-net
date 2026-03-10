"use client";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
}

const Magnetic = ({ children, strength = 0.01 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const xTo = gsap.quickTo(ref.current, "x", {
      duration: 1,
      ease: "elastic.out(1,0.1)",
    });

    const yTo = gsap.quickTo(ref.current, "y", {
      duration: 1,
      ease: "elastic.out(1,0.1)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      xTo((clientX - centerX) * strength);
      yTo((clientY - centerY) * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const el = ref.current;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return <div ref={ref}>{children}</div>;
};

export default Magnetic;