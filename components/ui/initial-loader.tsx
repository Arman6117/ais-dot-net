"use client";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Loader = () => {
  const loaderRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([line1Ref.current, line2Ref.current], { yPercent: 110 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(counterRef.current, { opacity: 0 });
      
      const tl = gsap.timeline();
      tl.to(line1Ref.current, { yPercent: 0, ease: "power4.out", duration: 1 })
      .to(
        line2Ref.current,
        { yPercent: 0, ease: "power4.out", duration: 1 },
        "-=0.8"
      )
      .to(counterRef.current, { opacity: 1, duration: 0.5 }, "-=0.5");
      
      const counterObject = {value:0};
      tl.to(counterObject, {
        value:100,
        duration:2.5,
        ease:"power2.inOut",
        onUpdate:()=>setPercent(Math.floor(counterObject.value))
      }, "-=0.2")
      tl.to(barRef.current,{scaleX:1,duration:2.5,ease:"power2.inOut"},"<")
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.3
      });
    });
      return () => ctx.revert();
    }, []);
  return (
    <div
      ref={loaderRef}
      className="bg-[#F7F5F0] fixed z-9999 inset-0 p-12 overflow-hidden flex flex-col justify-between rounded-b-lg"
    >
      <div className="flex flex-col justify-between text-[0.65rem] uppercase tracking-widest text-gray-400">
        <span>Pune, India</span>
        {/* <span></span> */}
      </div>
      <div>
        <div className="overflow-hidden">
          <div
            ref={line1Ref}
            className="text-[12vw] font-black leading-[0.9] text-gray-900"
          >
            AIS
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={line2Ref}
            className="text-[12vw] font-black leading-[0.9] text-blue-600 ml-12"
          >
            Solutions
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-end mb-4 ">
          <div ref={counterRef} className="text-6xl font-black tabular-nums">
            {percent.toString().padStart(2, "0")}
            <span className="text-xl text-blue-600">%</span>
          </div>
          <span className="text-[0.6rem] uppercase tracking-widest text-gray-400">
            Loading
          </span>
        </div>
        <div className="h-px w-full bg-gray-200 relative">
          <div ref={barRef} className="absolute w-full inset-y-0 left-0 bg-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
