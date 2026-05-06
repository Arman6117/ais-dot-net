// components/ui/service-countries.tsx
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

interface Country {
  name: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  {
    name: "India",
    code: "IN",
    flag: "https://flagcdn.com/w320/in.png"
  },
  {
    name: "United States",
    code: "US",
    flag: "https://flagcdn.com/w320/us.png"
  },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "https://flagcdn.com/w320/gb.png"
  },
  {
    name: "Australia",
    code: "AU",
    flag: "https://flagcdn.com/w320/au.png"
  },
  {
    name: "Canada",
    code: "CA",
    flag: "https://flagcdn.com/w320/ca.png"
  }
];

const ServiceCountries = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const flagsContainerRef = useRef<HTMLDivElement>(null);
  const countryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(flagsContainerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(0.4)" },
        "-=0.2"
      );

      // Animate each country card with stagger
      countryRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 40, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              delay: 0.4 + (index * 0.1),
              ease: "back.out(0.3)"
            }
          );
        }
      });
    }
  }, [inView]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        inViewRef(node);
      }}
      className="relative py-20 md:py-8 px-6 lg:px-12 overflow-hidden"
    >
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Subtle gray gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section - matching image typography style */}
        <div className="text-center mb-16 md:mb-20">
          {/* Section label - uppercase tracking style from image */}
          <p
            ref={subtitleRef}
            className="text-[#1a237e] font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-6 opacity-0"
          >
            OUR GLOBAL REACH
          </p>
          
          {/* Main heading - bold, dark, impactful like image */}
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0a0f2c] leading-tight opacity-0"
          >
            Service Availability
          </h2>

        
        </div>

        {/* Countries Grid - clean card design matching image style */}
        <div
          ref={flagsContainerRef}
          className="opacity-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {countries.map((country, index) => (
              <div
                key={country.code}
                ref={(el) => { countryRefs.current[index] = el; }}
                className="group relative opacity-0"
              >
                {/* Country Card - matching image card style */}
                <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 hover:border-[#1a237e]/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#1a237e]/5 group-hover:-translate-y-1">
                  
                  {/* Flag Container - clean with subtle shadow */}
                  <div className="relative w-24 h-16 md:w-28 md:h-[4.5rem] mx-auto mb-5 rounded-lg overflow-hidden shadow-md border border-gray-100">
                    <Image
                      src={country.flag}
                      alt={`${country.name} flag`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 96px, 112px"
                    />
                  </div>
                  
                  {/* Country Name - matching image text style */}
                  <h3 className="text-center font-semibold text-[#0a0f2c] text-sm md:text-base mb-3 group-hover:text-[#1a237e] transition-colors duration-300">
                    {country.name}
                  </h3>
                  
                  {/* Country Code Badge - subtle accent */}
                  <div className="text-center">
                    <span className="inline-block text-[0.65rem] font-semibold tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 group-hover:bg-[#1a237e]/5 group-hover:text-[#1a237e] group-hover:border-[#1a237e]/20 transition-all duration-300">
                      {country.code}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent - matching image divider style */}
        <div className="relative mt-16 md:mt-20 pt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-[#1a237e]/30 to-transparent" />
          <p className="text-center text-gray-400 text-[0.7rem] tracking-[0.25em] uppercase font-medium">
            Trusted by Researchers and Professionals Worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceCountries;