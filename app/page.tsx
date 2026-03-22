import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Magnetic from "@/components/ui/magnetic";
import AboutSection from "@/components/ui/main/about-section";
import Hero from "@/components/ui/main/hero";
import JourneyTimeline from "@/components/ui/main/journey-timeline";
import MissionVision from "@/components/ui/main/mission-vision";
import OtherServicesSection from "@/components/ui/main/other-service-section";
import ServicesSection from "@/components/ui/main/service-section";
import ServiceCategories from "@/components/ui/main/services-category";
import StatsSection from "@/components/ui/main/stats-section";
import WhyChooseUs from "@/components/ui/main/why-choose-us";
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
      <JourneyTimeline/>
      <ServiceCategories/>
      <OtherServicesSection />
  <WhyChooseUs/>
      <StatsSection />
      <MissionVision/>

      <Footer />
    </main>
  );
}
