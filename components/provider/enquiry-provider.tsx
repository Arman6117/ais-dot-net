// components/providers/enquiry-provider.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import EnquiryDialog from "@/components/ui/enquiry-dialog";

export default function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownRef = useRef(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("enquiryPopupShown");
    
    if (!hasSeenPopup && !hasShownRef.current) {
      const delay = Math.random() * 5000 + 7000; // 7-12 seconds
      
      timeoutRef.current = setTimeout(() => {
        setIsOpen(true);
        hasShownRef.current = true;
        sessionStorage.setItem("enquiryPopupShown", "true");
      }, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Exit intent
  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownRef.current) {
        setIsOpen(true);
        hasShownRef.current = true;
        sessionStorage.setItem("enquiryPopupShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);
    return () => document.removeEventListener("mouseleave", handleExitIntent);
  }, []);

  return (
    <>
      {children}
      <EnquiryDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}