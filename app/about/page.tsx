import AboutHero from "@/components/ui/about/about-hero";


import FounderSection from "@/components/ui/about/founder-section";
import MissionStrip from "@/components/ui/about/mission-strip";
import TeamsSection from "@/components/ui/about/team-section";
import TestimonialsSection from "@/components/ui/about/testimonials-section";
import Footer from "@/components/ui/footer";
import AboutCTA from "@/components/ui/about/about-cta";
import StatsSection from "@/components/ui/main/stats-section";

export default function AboutPage() {
  return (
    <main>
      {/* <Navbar /> */}
      <AboutHero />
      <FounderSection />
      <MissionStrip />
      <TeamsSection />
      <TestimonialsSection />
      <StatsSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}