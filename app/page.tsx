import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";
import Hero from "@/components/ui/main/hero";
import ServicesSection from "@/components/ui/main/service-section";
import TheCard from "@/components/ui/the-card";


export default function Home() {
  return (
    <main className="">
      <Magnetic strength={0.15}>

      <TheCard/>
      </Magnetic>
     <Hero/>
     {/* <section id="services" style={{ height: "100vh", paddingTop: "100px" }}> */}
     <ServicesSection/>
      {/* </section> */}
    </main>
  );
}
