import Navbar from "./components/nav/navbar";
import Footer from "./components/footer/footer";
import BusinesReviewSection from "./components/homepage/businesReviewSection";
import ServiceSection from "./components/homepage/serviceSection";
import ChooseusSection from "./components/homepage/chooseusSection";
import NewsletterSection from "./components/homepage/newsletter";
import { HeroSection } from "./components/homepage/herosection";
import BookSection from "./components/homepage/BookSection";
import EventSection from "./components/homepage/eventSection";
import { getContentList } from "../actions/review";

export default async function Home() {
  const reviews = await getContentList();
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <div className=" bg-gray-50 dark:bg-background min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
          <HeroSection />
          <BusinesReviewSection reviews={reviews?.contentList || []} />
          <BookSection />
          <EventSection />
          <ServiceSection />
          <ChooseusSection />
          <NewsletterSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
