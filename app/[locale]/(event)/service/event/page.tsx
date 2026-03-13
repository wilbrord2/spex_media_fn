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
import { getEvents, Event, EventsResponse } from "@/app/actions/event";
import { getEventCategories } from "@/app/actions/event";
import { Category } from "@/lib/dto";

const EventManagementServiceContent: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [eventsData, setEventsData] = useState<EventsResponse | null>(null);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [dateFilter, setDateFilter] = useState<string>("AllTime");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");
  const [categoryFilter, setCategoryFilter] =
    useState<string>("All Categories");

  useEffect(() => {
    const loadInitialData = async () => {
      const catRes = await getEventCategories(1, 50);
      if (catRes.success && catRes.data) {
        setCategories(catRes.data.items);
      }
    };
    loadInitialData();
  }, []);

  const fetchFilteredEvents = async (page: number, isLoadMore: boolean) => {
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    const params: any = {
      take: 9,
      page: page,
      presetTimeFrame:
        dateFilter === "Any Date" ? "AllTime" : dateFilter.replace(" ", ""),
    };

    if (typeFilter !== "All Types") {
      params.eventType = typeFilter.replace("-", "");
    }

    const res = await getEvents(params);
    if (res?.success && res.data) {
      setEventsData(res.data);
      setAllEvents((prev) =>
        isLoadMore
          ? [...prev, ...(res.data?.events || [])]
          : res.data?.events || [],
      );
    }
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchFilteredEvents(1, false);
  }, [dateFilter, typeFilter, searchQuery]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchFilteredEvents(nextPage, true);
  };

  const displayEvents = allEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-background text-foreground min-h-screen font-sans pb-20">
      <main className="max-w-[1440px] mx-auto px-4 md:px-10 py-5 flex flex-col gap-12">
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

        <section id="upcoming-events" className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-foreground/10 pb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-black tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-foreground/60 text-base">
                Connect with the Inama community through workshops and panels.
              </p>
            </div>
            <div className="text-sm text-foreground/40 font-medium">
              Showing{" "}
              <span className="text-foreground">{displayEvents.length}</span> of{" "}
              <span className="text-foreground">
                {eventsData?.totalEvents || 0}
              </span>{" "}
              events
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-end">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <FilterSelect
                icon={<FiCalendar />}
                options={[
                  "Any Date",
                  "Today",
                  "This Week",
                  "This Month",
                  "This Year",
                ]}
                selectedValue={dateFilter}
                onChange={setDateFilter}
              />
              <FilterSelect
                icon={<FiVideo />}
                options={["All Types", "Virtual", "Hybrid", "In-Person"]}
                selectedValue={typeFilter}
                onChange={setTypeFilter}
              />
              <FilterSelect
                icon={<FiGrid />}
                options={["All Categories", ...categories.map((c) => c.name)]}
                selectedValue={categoryFilter}
                onChange={setCategoryFilter}
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <FiLoader className="animate-spin text-primary" size={40} />
            </div>
          ) : displayEvents.length === 0 ? (
            <div className="col-span-full py-20 text-center text-foreground/40">
              <p className="text-lg">No events found matching your criteria.</p>
            </div>
          ) : (
            displayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </section>

        {eventsData?.hasNextPage && (
          <div className="flex justify-center mb-8">
            <button
              className="cursor-pointer"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              <RedirectionBtn
                title={loadingMore ? "Loading..." : "Load More Events"}
                link="#"
              />
            </button>
          </div>
        )}

        <NewsletterSection />
      </main>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const eventDate = new Date(event.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const eventTime = new Date(event.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="group flex flex-col bg-foreground/2 rounded-2xl border border-foreground/5 overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={
            event.coverImage ||
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
          }
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-foreground/10">
            {event.eventType === "Virtual" ? (
              <FiWifi className="text-green-500" />
            ) : (
              <FiUsers className="text-primary" />
            )}
            {event.eventType}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
          <span>{eventDate}</span>
          <span className="size-1 rounded-full bg-foreground/10"></span>
          <span>{eventTime}</span>
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
                {event.speakers?.slice(0, 3).map((s) => (
                  <div
                    key={s.id}
                    className="size-7 rounded-full border-2 border-background bg-foreground/10 overflow-hidden relative"
                  >
                    <Image
                      src={s.profilePicture || "/avatar.png"}
                      alt={s.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              {event.speakers && event.speakers.length > 0 && (
                <span className="text-[10px] font-bold text-foreground/30">
                  {event.speakers.length} Speaker
                  {event.speakers.length > 1 ? "s" : ""}
                </span>
              )}
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
};

const FilterSelect = ({ icon, options, selectedValue, onChange }: any) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary pointer-events-none">
      {icon}
    </div>
    <select
      className="appearance-none h-12 pl-12 pr-10 rounded-xl bg-foreground/5 border border-foreground/10 text-sm font-medium focus:outline-none focus:border-primary/50 cursor-pointer min-w-40 w-full lg:w-auto"
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="bg-background">
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
