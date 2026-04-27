"use client";

import { useLoader } from "@/context/loader-context";
import gsap from "gsap";
import { Instrument_Serif } from "next/font/google";
import React, { useEffect, useRef } from "react";
import TheCard from "@/components/ui/the-card";
import OrbitDiagram from "./orbit-diagram";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const Hero = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  const { loaderDone } = useLoader();

  useEffect(() => {
    if (!loaderDone || !containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(
        orbitRef.current,
        { opacity: 0, x: -80, scale: 0.92, filter: "blur(10px)" },
        { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1 },
        0.2
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, x: 80, scale: 0.92, filter: "blur(10px)" },
        { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1 },
        0.4
      )
      .fromTo(
        connectorRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.8 },
        0.6
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

    // Floating animations
    gsap.to(orbitRef.current, {
      y: -12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(cardRef.current, {
      y: 6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulsing connector
    if (connectorRef.current) {
      gsap.to(connectorRef.current, {
        opacity: 0.7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([orbitRef.current, cardRef.current, connectorRef.current]);
    };
  }, [loaderDone]);

  return (
    <section
      className={`${instrumentSerif.variable} relative min-h-screen overflow-hidden`}
    >
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#111B3D] to-[#0A0F2A]" />
      
      {/* Central unifying glow */}
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[500px] -translate-x-1/2 -translate-y-1/2 blur-[120px] bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-purple-500/15 rounded-full" />
      
      {/* Orbit side glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] bg-blue-500/12" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full blur-[80px] bg-cyan-500/8" />
      
      {/* Card side glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[100px] bg-purple-500/12" />
      <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] rounded-full blur-[80px] bg-pink-500/8" />
      
      {/* Connecting bridge glow */}
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[200px] -translate-x-1/2 -translate-y-1/2 blur-[60px] bg-gradient-to-r from-blue-400/10 via-purple-400/15 to-purple-400/10" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              animation: `floatParticle ${3 + Math.random() * 5}s ease-in-out infinite`,
              opacity: 0.1 + Math.random() * 0.25,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* Hero layout with three columns */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-[80vh]">

          {/* LEFT: ORBIT DIAGRAM */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div ref={orbitRef} className="relative">
              <div className="absolute inset-[-20%] rounded-full blur-[80px] bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/10 -z-10" />
              <OrbitDiagram />
            </div>
          </div>

          {/* CENTER: DYNAMIC CONNECTOR */}
          <div className="hidden lg:flex flex-col items-center justify-center relative py-12">
            <div className="relative w-28 h-[2px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/60 to-purple-500/20 rounded-full" />
              <div 
                ref={connectorRef}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-transparent rounded-full"
                style={{ width: '60%' }}
              />
            </div>
            
            <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg shadow-purple-500/50 animate-pulse-ring" />
            
            <div className="absolute w-40 h-20 bg-gradient-to-r from-blue-500/15 via-purple-500/25 to-purple-500/15 blur-2xl rounded-full -translate-y-1/2 top-1/2" />
            
            <div className="absolute -top-6 -right-6 w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-orbit-small" />
            <div className="absolute -bottom-6 -left-6 w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-orbit-small-reverse" />
            
            <div className="absolute -top-8 whitespace-nowrap text-[10px] tracking-wider text-white/30 font-mono">
              SYNC
            </div>
          </div>

          {/* RIGHT: FOUNDER CARD */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div ref={cardRef} className="relative">
              <div className="absolute inset-[-15%] rounded-2xl blur-[80px] bg-gradient-to-l from-purple-500/25 via-blue-500/10 to-transparent -z-10" />
              <TheCard />
            </div>
          </div>

        </div>

        <div ref={textRef} className="text-center mt-12 lg:mt-16 opacity-0">
          {/* Optional bottom text */}
        </div>
      </div>

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(0px) translateX(30px);
            opacity: 0.2;
          }
          75% {
            transform: translateY(20px) translateX(15px);
            opacity: 0.25;
          }
        }
        
        @keyframes pulse-ring {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 0 8px rgba(168, 85, 247, 0);
          }
        }
        
        @keyframes orbit-small {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
            opacity: 0.4;
          }
        }
        
        @keyframes orbit-small-reverse {
          0% {
            transform: rotate(0deg) translateX(15px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(-360deg) translateX(15px) rotate(360deg);
            opacity: 0.4;
          }
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-orbit-small {
          animation: orbit-small 4s linear infinite;
        }
        
        .animate-orbit-small-reverse {
          animation: orbit-small-reverse 3.5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;