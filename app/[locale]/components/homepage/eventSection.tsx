"use client";
import Headline from "../text/headline";
import RedirectionBtn from "../Buttons/redirectionBtn";
import EventCard, { Event } from "../card/EventCard";

const eventsData: Event[] = [
  {
    id: 1,
    title: "Annual Nexus Leadership Summit",
    description:
      "Join industry leaders and visionaries to discuss the future of business in Africa.",
    image: "/images/chooseus.jpeg",
    category: "Conference",
    date: "Oct 25",
    time: "10:00 AM",
    type: "In-Person",
    location: "Kigali, Rwanda",
    when: "Upcoming",
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    description:
      "A hands-on workshop covering the latest strategies in digital marketing.",
    image: "/images/aboutus.jpeg",
    category: "Workshop",
    date: "Nov 15",
    time: "1:00 PM EST",
    type: "Virtual",
    when: "Upcoming",
    speakers: [],
  },
  {
    id: 3,
    title: "The Future of Fintech",
    description:
      "An exclusive webinar with top fintech innovators and investors.",
    image: "/images/bnreview1.jpeg",
    category: "Webinar",
    date: "Dec 05",
    time: "4:00 PM GMT",
    type: "Virtual",
    when: "Upcoming",
    speakers: [],
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    description:
      "Watch the brightest startups pitch their ideas to a panel of expert judges.",
    image: "/images/bnreview2.jpeg",
    category: "Competition",
    date: "Feb 10",
    time: "9:00 AM PST",
    type: "Hybrid",
    location: "Lagos, Nigeria & Online",
    when: "Upcoming",
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
          <EventCard event={event} key={event.id} />
        ))}
      </div>
      <RedirectionBtn title="Explore All Events" link="/service/event" />
    </div>
  );
};

export default EventSection;
