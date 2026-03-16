import CareersHero from "@/components/careers/careers-hero";
import HowItWorks from "@/components/careers/how-it-works";
import TermsSection from "@/components/careers/terms-section";
import TestimonialsSection from "@/components/ui/about/testimonials-section";
import Footer from "@/components/ui/footer"

export default function CareersPage() {
  return (
    <main>
    
      <CareersHero />
      <HowItWorks />
      {/* <InternshipDomains /> */}
      <TermsSection />
      <TestimonialsSection />
        <Footer/>
    </main>
  );
}