import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Magnetic from "@/components/ui/magnetic";
import AboutSection from "@/components/ui/main/about-section";
import Hero from "@/components/ui/main/hero";
import OtherServicesSection from "@/components/ui/main/other-service-section";
import ServicesSection from "@/components/ui/main/service-section";
import StatsSection from "@/components/ui/main/stats-section";
import TheCard from "@/components/ui/the-card";

export default function Home() {
  return (
    <main className="">
      <Magnetic strength={0.15}>
        <TheCard />
      </Magnetic>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <OtherServicesSection />

      <StatsSection />
      <Footer />
    </main>
  );
}
