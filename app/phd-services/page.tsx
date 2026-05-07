import Footer from "@/components/ui/footer";
import StatsSection from "@/components/ui/main/stats-section";
import PhdHero from "@/components/ui/phd-services/phd-hero";
import PhdJourney from "@/components/ui/phd-services/phd-journey";


export default function PhdServicesPage() {
  return (
    <main>
   
      <PhdHero />
      <PhdJourney />
      <StatsSection/>
     <Footer/>
    </main>
  );
}