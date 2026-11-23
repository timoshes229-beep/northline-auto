import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Calculator from "@/components/Calculator";
import Catalog from "@/components/Catalog";
import Directions from "@/components/Directions";
import FinalCta from "@/components/FinalCta";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadProvider from "@/components/LeadProvider";
import MotionLayer from "@/components/MotionLayer";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: site.name,
  description: "Подбор, проверка, покупка и доставка автомобилей из США и Канады в Украину.",
  url: site.url,
  areaServed: "UA",
};

export default function Home() {
  return (
    <LeadProvider>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Directions />
        <Catalog />
        <Calculator />
        <Process />
        <Gallery />
        <Advantages />
        <Reviews />
        <FinalCta />
      </main>
      <MotionLayer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </LeadProvider>
  );
}
