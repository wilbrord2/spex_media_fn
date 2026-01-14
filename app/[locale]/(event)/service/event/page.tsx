"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  FiCalendar,
  FiVideo,
  FiGrid,
  FiArrowRight,
  FiMapPin,
  FiWifi,
  FiUsers,
  FiChevronDown,
  FiLoader,
} from "react-icons/fi";
import NewsletterSection from "@/app/[locale]/components/homepage/newsletter";
import RedirectionBtn from "@/app/[locale]/components/Buttons/redirectionBtn";
import Link from "next/link";

// --- Types ---
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "Virtual" | "Hybrid" | "In-Person";
  image: string;
  location?: string;
  speakers?: string[];
  category: string;
  when: string;
  badges?: { label: string; color: string }[];
}

// --- Mock Data ---
const EVENTS: Event[] = [
  {
    id: 1,
    title: "Global Publishing Trends 2024",
    description:
      "Discover the latest shifts in the publishing industry with insights from top editors and agents.",
    date: "Oct 25",
    time: "2:00 PM EST",
    type: "Virtual",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    category: "Publishing",
    when: "Upcoming",
    speakers: ["/spk1.jpg", "/spk2.jpg"],
  },
  {
    id: 2,
    title: "Nexus Annual Book Fair",
    description:
      "Join us in New York or online for a celebration of literature, featuring over 100 authors.",
    date: "Nov 02",
    time: "10:00 AM EST",
    type: "Hybrid",
    location: "Javits Center, NYC",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800",
    category: "Literature",
    when: "Upcoming",
  },
  {
    id: 3,
    title: "Code & Content: The AI Revolution",
    description:
      "A technical deep dive into how large language models are reshaping content creation.",
    date: "Nov 15",
    time: "1:00 PM EST",
    type: "Virtual",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800",
    category: "Technology",
    when: "Upcoming",
    speakers: ["Dr. Alan Grant"],
  },
];

const EventManagementServiceContent: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [dateFilter, setDateFilter] = useState("Any Date");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  useEffect(() => {
    if (window.location.hash === "#upcoming-events") {
      const element = document.getElementById("upcoming-events");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const isEventThisWeek = (event: Event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day

    const eventDate = new Date(event.date + " " + today.getFullYear());
    eventDate.setHours(0, 0, 0, 0); // Normalize eventDate to start of day

    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Sunday (0-6 where 0 is Sunday)

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Saturday

    return eventDate >= firstDayOfWeek && eventDate <= lastDayOfWeek;
  };

  const isEventThisMonth = (event: Event) => {
    const today = new Date();
    const eventDate = new Date(event.date + " " + today.getFullYear());
    return (
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  };

  const filteredEvents = EVENTS.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.speakers &&
        event.speakers.some((speaker) =>
          speaker.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    const matchesDate =
      dateFilter === "Any Date" ||
      (dateFilter === "This Week" && isEventThisWeek(event)) ||
      (dateFilter === "This Month" && isEventThisMonth(event));

    const matchesType = typeFilter === "All Types" || event.type === typeFilter;

    // This is a placeholder for category filtering as the mock data doesn't have a category field.
    // In a real app, 'event' would have a category property.
    const matchesCategory =
      categoryFilter === "All Categories" || event.category === categoryFilter;

    return matchesSearch && matchesDate && matchesType && matchesCategory;
  });

  return (
    <div className="bg-background text-foreground min-h-screen font-sans pb-20">
      <main className=" max-w-[1440px] mx-auto px-4 md:px-10 py-5 flex flex-col gap-12">
        {/* --- Hero Section --- */}
        <section className="relative w-full rounded-2xl overflow-hidden min-h-[400px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-12 bg-foreground/95 group">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000"
              alt="Conference Stage"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-xs font-bold uppercase tracking-wider w-fit backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Featured Event
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              The Future of Digital Media Summit
            </h1>
            <p className="text-white/80 text-lg max-w-lg">
              Live in 2 Days. Join over 5,000 industry leaders globally for the
              most anticipated virtual gathering of the year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/20 cursor-pointer">
                Register Now
              </button>
              <Link
                href={`/service/event/1`}
                className="h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-lg font-bold transition-all flex items-center"
              >
                View Agenda
              </Link>
            </div>
          </div>
        </section>

        {/* --- Page Heading & Filters --- */}
        <section id="upcoming-events" className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-foreground/10 pb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-black tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-foreground/60 text-base">
                Connect with the Nexus community through workshops and panels.
              </p>
            </div>
            <div className="text-sm text-foreground/40 font-medium">
              Showing{" "}
              <span className="text-foreground">{filteredEvents.length}</span>{" "}
              of <span className="text-foreground">{EVENTS.length}</span> events
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 justify-end">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <FilterSelect
                icon={<FiCalendar />}
                options={["Any Date", "This Week", "This Month"]}
                selectedValue={dateFilter}
                onChange={setDateFilter}
              />
              <FilterSelect
                icon={<FiVideo />}
                options={["All Types", "Virtual", "Hybrid"]}
                selectedValue={typeFilter}
                onChange={setTypeFilter}
              />
              <FilterSelect
                icon={<FiGrid />}
                options={["All Categories", "Tech & AI", "Design"]}
                selectedValue={categoryFilter}
                onChange={setCategoryFilter}
              />
            </div>
          </div>
        </section>

        {/* --- Event Grid --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full py-20 text-center text-foreground/40">
              <p className="text-lg">No events found matching your criteria.</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </section>

        {/* Load More button */}
        <div className="flex justify-center mb-8">
          <RedirectionBtn title="Load More Articles" link="#" />
        </div>

        {/* --- Newsletter --- */}
        <NewsletterSection />
      </main>
    </div>
  );
};

// --- Sub-components ---

const EventCard = ({ event }: { event: Event }) => (
  <article className="group flex flex-col bg-foreground/2 rounded-2xl border border-foreground/5 overflow-hidden hover:border-primary/30 transition-all duration-300">
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={event.image}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-foreground/10">
          {event.type === "Virtual" ? (
            <FiWifi className="text-green-500" />
          ) : (
            <FiUsers className="text-primary" />
          )}
          {event.type}
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
        <span>{event.date}</span>
        <span className="size-1 rounded-full bg-foreground/10"></span>
        <span>{event.time}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
        {event.title}
      </h3>
      <p className="text-foreground/50 text-sm line-clamp-2 mb-6">
        {event.description}
      </p>

      <div className="mt-auto flex flex-col gap-5 pt-5 border-t border-foreground/5">
        {event.location ? (
          <div className="flex items-center gap-2 text-foreground/40 text-xs font-bold">
            <FiMapPin className="text-primary" /> {event.location}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="size-7 rounded-full border-2 border-background bg-foreground/10"
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-foreground/30">
              +3 Speakers
            </span>
          </div>
        )}
        <Link
          href={`/service/event/${event.id}`}
          className="w-full h-11 rounded-xl bg-foreground/5 hover:bg-primary hover:text-primary-foreground transition-all font-bold text-sm flex items-center justify-center gap-2"
        >
          View Details <FiArrowRight />
        </Link>
      </div>
    </div>
  </article>
);

const FilterSelect = ({
  icon,
  options,
  selectedValue,
  onChange,
}: {
  icon: React.ReactNode;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary pointer-events-none">
      {icon}
    </div>
    <select
      className="appearance-none h-12 pl-12 pr-10 rounded-xl bg-foreground/5 border border-foreground/10 text-sm font-medium focus:outline-none focus:border-primary/50 cursor-pointer min-w-40 w-full lg:w-auto"
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} className="bg-background">
          {opt}
        </option>
      ))}
    </select>
    <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/20 pointer-events-none" />
  </div>
);

export default function EventManagementService() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <EventManagementServiceContent />
    </Suspense>
  );
}
