import Navbar from "./components/nav/navbar";
import Footer from "./components/footer/footer";
import BusinesReviewSection from "./components/homepage/businesReviewSection";
import ServiceSection from "./components/homepage/serviceSection";
import ChooseusSection from "./components/homepage/chooseusSection";
import NewsletterSection from "./components/homepage/newsletter";
import { HeroSection } from "./components/homepage/herosection";

export default function Home() {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <div className=" bg-gray-50 dark:bg-background min-h-screen">
        <div className="max-w-[1850px] mx-auto flex flex-col gap-4">
          <HeroSection />
          <BusinesReviewSection />
          <ServiceSection />
          <ChooseusSection />
          <NewsletterSection/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
