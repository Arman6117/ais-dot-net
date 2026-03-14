import AboutCTA from "@/components/ui/about/about-cta";
import Footer from "@/components/ui/footer";
import StatsSection from "@/components/ui/main/stats-section";
import ServicesGrid from "@/components/ui/services/services-grid";
import ServicesHero from "@/components/ui/services/services-hero";


export default function ServicesPage() {
  return (
    <main>
      
      <ServicesHero />
      <ServicesGrid />
      <StatsSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}