"use client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLoader } from "@/context/loader-context";

const TheCard = () => {
  const { loaderDone } = useLoader();

  const cardRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cardX = useRef(0);
  const cardY = useRef(0);
  const phase = useRef(0);
  const rafRef = useRef<number>(0);
  const anchorPos = useRef({ x: 0, y: 0 });

  // ── Effect 1: register + position at hero anchor ──
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    gsap.registerPlugin(ScrollTrigger);

    mouseX.current = window.innerWidth / 2;
    mouseY.current = window.innerHeight / 2;

    const anchor = document.getElementById("heroAnchor");
    if (!anchor || !cardRef.current) return;

    const r = anchor.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    anchorPos.current = { x: cx, y: cy };
    cardX.current = cx;
    cardY.current = cy;

    gsap.set(cardRef.current, { x: cx, y: cy + 60, opacity: 0 });
  }, []);

  // ── Effect 2: entrance animation after loader ──
  useEffect(() => {
    if (!loaderDone || !cardRef.current || window.innerWidth < 1024) return;
    gsap.to(cardRef.current, {
      y: anchorPos.current.y,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, [loaderDone]);

  // ── Effect 3: mouse + lerp + tilt + scroll triggers ──
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 3D tilt — only in hero
    const onMouseMoveHero = (e: MouseEvent) => {
      if (phase.current !== 0 || !founderRef.current) return;
      const dx = (e.clientX - anchorPos.current.x) / 260;
      const dy = (e.clientY - anchorPos.current.y) / 340;
      gsap.to(founderRef.current, {
        rotateY: dx * 18,
        rotateX: -dy * 18,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onMouseLeaveHero = () => {
      if (!founderRef.current) return;
      gsap.to(founderRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
    };

    const hero = document.getElementById("hero");
    hero?.addEventListener("mousemove", onMouseMoveHero);
    hero?.addEventListener("mouseleave", onMouseLeaveHero);

    // lerp loop
    const loop = () => {
      if (phase.current === 2) {
        cardX.current += (mouseX.current - cardX.current) * 0.09;
        cardY.current += (mouseY.current - cardY.current) * 0.09;
        gsap.set(cardRef.current, { x: cardX.current, y: cardY.current });
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    // ── Trigger 1: Hero → Services ──
    const t1 = ScrollTrigger.create({
      trigger: "#services",
      start: "top 70%",
      onEnter: () => {
        cardX.current = mouseX.current;
        cardY.current = mouseY.current;
        phase.current = 2;
        gsap.to(founderRef.current, { rotateY: 0, rotateX: 0, duration: 0.3 });
        gsap.to(founderRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        });
        gsap.to(lensRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.2,
        });
      },
      onLeaveBack: () => {
        phase.current = 0;
        gsap.to(founderRef.current, { opacity: 1, duration: 0.5 });
        gsap.to(lensRef.current, { opacity: 0, duration: 0.5 });
        gsap.to(cardRef.current, {
          x: anchorPos.current.x,
          y: anchorPos.current.y,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    // ── Trigger 2: Services → About ──
    // card snaps to about anchor and stays there — no t3, no fade out
    const t2 = ScrollTrigger.create({
      trigger: "#aboutAnchor",
      start: "center 60%",
      onEnter: () => {
        phase.current = 0;
        const aboutAnchor = document.getElementById("aboutAnchor");
        if (!aboutAnchor || !cardRef.current) return;
        const ar = aboutAnchor.getBoundingClientRect();
        const x = ar.left + ar.width / 2;
        const y = ar.top + ar.height / 2;

        gsap.to(lensRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
        gsap.to(founderRef.current, {
          opacity: 1,
          duration: 0.7,
          ease: "power2.inOut",
          delay: 0.2,
        });

        // animate to position then switch to absolute inside anchor
        gsap.to(cardRef.current, {
          x,
          y,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            if (!cardRef.current || !aboutAnchor) return;
            aboutAnchor.style.position = "relative";
            aboutAnchor.appendChild(cardRef.current);
            cardRef.current.style.position = "absolute";
            cardRef.current.style.top = "50%";
            // cardRef.current.style.left = "50%";
            cardRef.current.style.transform = "translate(-50%, -50%)";
            gsap.set(cardRef.current, { x: 0, y: 0, clearProps: "transform" });
          },
        });
      },
      onLeaveBack: () => {
        if (!cardRef.current) return;
        // move card back to body, restore fixed positioning
        document.body.appendChild(cardRef.current);
        cardRef.current.style.position = "fixed";
        cardRef.current.style.top = "0";
        cardRef.current.style.left = "0";
        cardRef.current.style.transform = "translate(-50%, -50%)";

        cardX.current = mouseX.current;
        cardY.current = mouseY.current;
        phase.current = 2;
        gsap.set(cardRef.current, { x: mouseX.current, y: mouseY.current });
        gsap.to(founderRef.current, { opacity: 0, duration: 0.5 });
        gsap.to(lensRef.current, { opacity: 1, duration: 0.5, delay: 0.2 });
      },
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      hero?.removeEventListener("mousemove", onMouseMoveHero);
      hero?.removeEventListener("mouseleave", onMouseLeaveHero);
      cancelAnimationFrame(rafRef.current);
      t1.kill();
      t2.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      id="the-card"
      className="fixed z-[200] w-[260px] h-[340px] pointer-events-none hidden lg:block"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* ── Founder skin ── */}
      <div
        ref={founderRef}
        className="absolute inset-0 rounded-[14px] overflow-hidden bg-gradient-to-br from-[#d0ccc6] to-[#bcb8b2] shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/founder.jpg"
          alt="Founder"
          fill
          className="object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 pt-12 bg-gradient-to-t from-black/70 to-transparent text-white">
          <div className="text-[1rem] font-bold">Dr. Prajyot Patil</div>
          <div className="text-[0.62rem] opacity-60 tracking-[0.09em] uppercase mt-1">
            PHD | Louisiana University
          </div>
        </div>
        <div className="absolute top-3.5 right-3.5 text-[0.52rem] font-bold tracking-[0.14em] uppercase bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-[4px] px-[9px] py-1">
          Founder
        </div>
      </div>

      {/* ── Lens skin ── */}
      <div ref={lensRef} id="cardLens" className="absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-[rgba(26,86,219,0.1)]" />
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#1A56DB] rounded-tl-[3px]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#1A56DB] rounded-tr-[3px]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#1A56DB] rounded-bl-[3px]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#1A56DB] rounded-br-[3px]" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[0.5rem] font-bold tracking-[0.18em] uppercase text-[#1A56DB] opacity-50 whitespace-nowrap">
          Drag over a service
        </div>
      </div>
    </div>
  );
};

export default TheCard;
