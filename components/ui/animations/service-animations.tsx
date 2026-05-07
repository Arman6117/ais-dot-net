"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const setupDraw = (svg: SVGSVGElement | null) => {
  if (!svg) return;
  const paths = svg.querySelectorAll(".draw-path");
  gsap.set(paths, { strokeDasharray: 300, strokeDashoffset: 300 });
  gsap.to(paths, {
    strokeDashoffset: 0,
    duration: 1.5,
    stagger: 0.15,
    ease: "power2.out",
  });
};

export const DataCollectionAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => { /* Hook Matcher */ }, []); 

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
      <path className="draw-path" d="M60 70 H140 M60 100 H140 M60 130 H140" stroke={color} strokeWidth="1.5" />
      {[70, 100, 130].map((y, i) => (
        <circle key={i} cx="60" cy={y} r="3.5" fill={color} />
      ))}
      <path className="draw-path" d="M100 40 V160" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
};

export const AIMLAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => {
    if (!ref.current) return;
    const core = ref.current.querySelector(".pulse-core");
    gsap.fromTo(core, 
      { scale: 0.8, opacity: 0.3 }, 
      { scale: 1.1, opacity: 0.7, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <rect className="draw-path" x="50" y="50" width="100" height="100" rx="20" stroke={color} strokeWidth="1.5" />
      <circle className="pulse-core" cx="100" cy="100" r="35" stroke={color} strokeWidth="2" fill={`${color}10`} />
      <path className="draw-path" d="M100 20 V50 M100 150 V180 M20 100 H50 M150 100 H180" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export const PhDGuidanceAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => { /* Hook Matcher */ }, []); 

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <path className="draw-path" d="M40 100 L100 60 L160 100 L100 140 Z" stroke={color} strokeWidth="1.5" />
      <path className="draw-path" d="M60 110 V150 C100 170 140 150 140 150 V110" stroke={color} strokeWidth="2" />
      <circle cx="100" cy="100" r="10" fill={color} opacity="0.2" />
    </svg>
  );
};

export const CorporateTrainingAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => { /* Hook Matcher */ }, []); 

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <rect className="draw-path" x="40" y="60" width="120" height="80" rx="6" stroke={color} strokeWidth="1.5" fill="none" />
      <path className="draw-path" d="M100 85 L100 115 M85 100 L115 100" stroke={color} strokeWidth="2" />
      <path className="draw-path" d="M60 155 H140" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export const DataAnalyticsAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { 
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll("rect"), {
      height: 0, y: 160, duration: 1, stagger: 0.1, ease: "elastic.out(1, 0.75)"
    });
  }, []);
  useEffect(() => { setupDraw(ref.current); }, []);

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <path d="M30 160 H170" stroke={color} strokeWidth="1" opacity="0.2" />
      {[50, 80, 110, 140].map((x, i) => (
        <rect key={i} x={x} y={160 - (20 * (i + 1))} width="15" height={20 * (i + 1)} fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" />
      ))}
      <path className="draw-path" d="M40 120 Q 100 40 160 80" stroke={color} strokeWidth="2.5" fill="none" />
    </svg>
  );
};

export const StatisticalAnalysisAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => { /* Hook Matcher */ }, []); 

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <path className="draw-path" d="M30 100 Q 65 20 100 100 T 170 100" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="100" cy="100" r="65" stroke={color} strokeWidth="0.5" strokeDasharray="3 6" opacity="0.3" />
    </svg>
  );
};

export const WebDevAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => { /* Hook Matcher */ }, []); 

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <path className="draw-path" d="M50 70 L30 100 L50 130 M150 70 L170 100 L150 130" stroke={color} strokeWidth="2.5" fill="none" />
      <path className="draw-path" d="M110 50 L90 150" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export const InternshipAnim = ({ color }: { color: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => { setupDraw(ref.current); }, []);
  useEffect(() => {
     if(!ref.current) return;
     gsap.to(ref.current.querySelector(".bag-pulse"), {
        scale: 1.1, opacity: 0.6, duration: 1.5, repeat: -1, yoyo: true
     });
  }, []); 

  return (
    <svg ref={ref} viewBox="0 0 200 200" className="w-full h-full">
      <rect className="draw-path" x="50" y="75" width="100" height="75" rx="5" stroke={color} strokeWidth="1.5" fill="none" />
      <path className="draw-path" d="M85 75 V65 C85 60 115 60 115 65 V75" stroke={color} strokeWidth="1.5" />
      <circle className="bag-pulse" cx="100" cy="112" r="18" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" />
    </svg>
  );
};