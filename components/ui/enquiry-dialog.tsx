// components/ui/enquiry-dialog.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle, Loader2, Phone, Mail } from "lucide-react";
import gsap from "gsap";
import { sendEnquiry } from "@/app/actions/send-enquiry";
import { useFormStatus } from "react-dom";

interface EnquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 bg-gradient-to-r from-[#1A56DB] to-[#3b7de8] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send size={18} />
          Send Enquiry
        </>
      )}
    </button>
  );
}

export default function EnquiryDialog({ isOpen, onClose }: EnquiryDialogProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const services = [
    "Select a service",
    "PhD Thesis Writing",
    "Research Paper Writing",
    "Dissertation Writing",
    "Data Analytics",
    "AI/ML Services",
    "Statistical Analysis",
    "Web Development",
    "Journal Publication",
    "Other",
  ];

  useEffect(() => {
    if (isOpen) {
      // Enable scrolling on body? No, we want to prevent scroll
      document.body.style.overflow = "hidden";
      
      // Animate modal entrance
      gsap.fromTo(dialogRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(0.6)", zIndex: 10000 }
      );
      
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  async function handleSubmit(formData: FormData) {
    setError("");
    const result = await sendEnquiry(formData);
    
    if (result.success) {
      setIsSuccess(true);
      formRef.current?.reset();
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
    >
      {/* Backdrop - make sure it doesn't block the modal */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: 'pointer'
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          position: 'relative',
          zIndex: 10000,
          pointerEvents: 'auto'
        }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#1A56DB] to-[#3b7de8] px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            type="button"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Send size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Get in Touch</h3>
              <p className="text-white/70 text-sm mt-0.5">We'll respond within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You! 🎉</h4>
            <p className="text-gray-600">Your enquiry has been sent. We'll contact you shortly.</p>
          </div>
        ) : (
          // Form with Server Action
          <form ref={formRef} action={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent outline-none transition bg-gray-50/50"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent outline-none transition bg-gray-50/50"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent outline-none transition bg-gray-50/50"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Interested In *
              </label>
              <select
                name="service"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent outline-none transition bg-gray-50/50"
              >
                {services.map((s, index) => (
                  <option key={s} value={index === 0 ? "" : s} disabled={index === 0}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent outline-none transition bg-gray-50/50 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <SubmitButton />

            {/* Contact info */}
            <div className="pt-2 flex justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Phone size={11} /> +91 9975707273</span>
              <span className="flex items-center gap-1"><Mail size={11} /> info@aissolutions.net</span>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span>⚠️</span> Your information is secure and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}