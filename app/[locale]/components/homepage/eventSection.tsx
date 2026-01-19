"use client";
import Headline from "../text/headline";
import ContentCard from "../card/contentCard";
import RedirectionBtn from "../Buttons/redirectionBtn";

const eventsData = [
  {
    id: 1,
    title: "Annual Nexus Leadership Summit",
    description:
      "Join industry leaders and visionaries to discuss the future of business in Africa.",
    img: "/images/chooseus.jpeg",
    category: "Conference",
    name: "Nexus Media Events",
    date: "2023-10-25",
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    description:
      "A hands-on workshop covering the latest strategies in digital marketing.",
    img: "/images/aboutus.jpeg",
    category: "Workshop",
    name: "Marketing Gurus Inc.",
    date: "2023-11-15",
  },
  {
    id: 3,
    title: "The Future of Fintech",
    description:
      "An exclusive webinar with top fintech innovators and investors.",
    img: "/images/bnreview1.jpeg",
    category: "Webinar",
    name: "Fintech Forward",
    date: "2023-12-05",
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    description:
      "Watch the brightest startups pitch their ideas to a panel of expert judges.",
    img: "/images/bnreview2.jpeg",
    category: "Competition",
    name: "Venture Capital Hub",
    date: "2024-02-10",
  },
];

const EventSection = () => {
  return (
    <div className="p-8 space-y-16 flex flex-col items-center justify-center">
      <Headline
        title="Upcoming Events"
        description="Don't miss our upcoming conferences, workshops, and webinars designed to empower and connect professionals."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {eventsData.map((event) => (
          <ContentCard
            url={`/service/event/${event.id}`}
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            img={event.img}
            category={event.category}
            name={event.name}
            date={event.date}
          />
        ))}
      </div>
      <RedirectionBtn title="Explore All Events" link="/service/event" />
    </div>
  );
};

export default EventSection;
