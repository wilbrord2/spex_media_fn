"use client";
import React from "react";
import RedirectionBtn from "../../components/Buttons/redirectionBtn";
import aboutus from "@/public/images/aboutus.jpeg";
import Logo from "@/app/[locale]/components/Logo/DefaultLogo";
import InfoCard from "../../components/card/infocard";
import { GiSpiralLollipop } from "react-icons/gi";
import { GoEye } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { LuAward } from "react-icons/lu";
import StatItem from "../../components/text/stati";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { TeamData } from "@/app/constants";
import TeamCard from "../../components/card/teamcard";
import { getContentList } from "@/app/actions/review";
import { getAdminBooks } from "@/app/actions/book";

const AboutPage = () => {
  const [storiesCount, setStoriesCount] = React.useState(0);
  const [booksCount, setBooksCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const stories = await getContentList();
        const books = await getAdminBooks();
        setStoriesCount(stories?.totalContents || 0);
        setBooksCount(books?.books?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {/* top section */}
      <div className="grid grid-cols-1 p-4 md:grid-cols-2 max-w-4xl mx-auto gap-8 py-16 items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-medium uppercase">
            About <span className="font-bold text-primary">Inama</span>
          </h1>

          <p className="text-gray-600 pb-6">
            Championing Africa's Business Renaissance Through Authentic
            Narratives
          </p>
          <RedirectionBtn title="Register your Business" link="/auth" />
        </div>
        <div>
          <img
            src={aboutus.src}
            alt="About us"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
      {/* our story */}
      <div className="bg-slate-50 dark:bg-background py-16 px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 w-full items-center justify-between max-width-container">
          <div className="m-auto">
            <Logo
              withTagline
              logoStyles="text-5xl!"
              taglineStyles="text-2xl!"
            />
          </div>
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold text-primary">Our Story</h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-4">
              <p>
                Founded in the heart of Africa's fastest-growing economy, inama
                Media & Communications Inc. emerged from a simple yet powerful
                recognition: Africa's business narrative was being told by
                others, often missing the nuance, context, and authentic voice
                that only comes from within.
              </p>
              <p>
                Established in Kigali, Rwanda, we chose this dynamic hub not
                just for its strategic location at the crossroads of East and
                Central Africa, but for what it represents—transformation,
                innovation, and the boundless potential of African
                entrepreneurship.
              </p>
              <p>
                {" "}
                Today, inama Media stands as the premier platform for
                pan-African business journalism, strategic communications, and
                executive advisory services, trusted by Fortune 500 companies,
                emerging African champions, and policy makers across the
                continent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* vision and mission */}
      <section className="py-16 px-8 w-full bg-[#fafafa] dark:bg-background">
        <div className="max-width-container p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InfoCard
            icon={GiSpiralLollipop}
            title="Our Mission"
            content="To amplify authentic African business narratives through exceptional journalism, strategic communications, and advisory services that drive meaningful engagement and sustainable growth across the continent."
          />

          <InfoCard
            icon={GoEye}
            title="Our Vision"
            content="To be the definitive voice of African business, setting the global standard for how the continent's economic transformation is understood, reported, and celebrated worldwide."
          />

          <InfoCard
            icon={FaRegHeart}
            title="Our Values"
            content={[
              "Authenticity in every narrative",
              "Excellence without compromise",
              "Cultural intelligence and sensitivity",
              "Innovation in storytelling",
              "Commitment to African prosperity",
            ]}
          />
        </div>
      </section>
      {/* why rwanda */}
      <div className="py-16 px-8 max-width-container mx-auto space-y-6">
        <h2 className="text-3xl font-semibold text-primary text-center">
          Why Rwanda?
        </h2>
        <div className="space-y-4 leading-relaxed">
          <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center">
            Rwanda represents everything we believe about Africa's potential. In
            just three decades, this nation has transformed itself from tragedy
            to triumph, becoming a beacon of innovation, governance excellence,
            and economic dynamism.
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center">
            Strategically positioned at the heart of East Africa, Rwanda offers
            unparalleled access to key regional markets while maintaining the
            stability, infrastructure, and business-friendly environment
            essential for our continental operations.
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center">
            From Kigali, we're not just reporting on Africa's
            transformation—we're part of it, contributing to the narrative of a
            continent that refuses to be defined by its past and is boldly
            writing its future.
          </p>
        </div>
      </div>

      {/* meet the team */}
      <section className="py-20 px-6 w-full bg-[#fafafa] dark:bg-background">
        <div className="max-width-container mx-auto text-center">
          {/* Icon + Title */}
          <div className="flex justify-center items-center gap-3">
            <PiUsersThreeDuotone size={40} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Our Leadership Team
            </h2>
          </div>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            Meet the visionaries and experts driving inama Media's mission to
            elevate African business narratives on the global stage.
          </p>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-16">
            {TeamData.map((member, index) => (
              <TeamCard
                key={index}
                image={member.image.src}
                name={member.name}
                role={member.role}
                description={member.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* recognitions and impact */}
      <section className="py-16 px-6 w-full ">
        <div className="max-width-container text-center mx-auto">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-3">
            <LuAward size={40} className="text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Recognition & Impact
            </h2>
          </div>

          {/* Paragraph */}
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            Since our inception, inama Media has been recognized for excellence
            in journalism, strategic communications, and our contribution to
            shaping positive African business narratives. Our work has been
            featured in leading international publications and has influenced
            policy discussions across the continent.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {/* add a loading skeleton while fetching this data */}
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 mx-auto rounded-lg"></div>
                  <div className="h-4 w-32 bg-gray-100 dark:bg-gray-900 mx-auto rounded mt-2"></div>
                </div>
              ))
            ) : (
              <>
                <StatItem value={storiesCount} label="Stories Published" />
                <StatItem value={booksCount} label="Books Published" />
                <StatItem value={3} label="Events Organized" />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
