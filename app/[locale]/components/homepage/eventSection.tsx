"use client";
import React, { useEffect, useState } from "react";
import Headline from "../text/headline";
import RedirectionBtn from "../Buttons/redirectionBtn";
import EventCard from "../card/EventCard";
import { getEvents, Event } from "@/app/actions/event";

const EventSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setError(false);
      try {
        const res = await getEvents({ take: 4 });
        if (res?.success && res.data) {
          setEvents(res.data.events);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-8 space-y-16 flex flex-col items-center justify-center">
      <Headline
        title="Upcoming Events"
        description="Don't miss our upcoming conferences, workshops, and webinars designed to empower and connect professionals."
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <EventSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="col-span-full text-center py-10 text-foreground/50 font-bold uppercase tracking-widest text-xs">
          Failed to load events. Please try again later.
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center space-y-4 text-center py-10">
          <p className="text-lg text-gray-600">
            No upcoming events at the moment — stay tuned for updates!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
          <RedirectionBtn title="Explore All Events" link="/service/event" />
        </>
      )}
    </div>
  );
};

const EventSkeleton = () => (
  <div className="flex flex-col bg-foreground/2 rounded-2xl border border-foreground/5 overflow-hidden h-full animate-pulse">
    {/* Aspect-video image area */}
    <div className="relative aspect-video bg-foreground/10" />

    <div className="p-6 flex flex-col flex-1">
      {/* Date and Time line */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-10 bg-primary/20 rounded" />
        <div className="size-1 rounded-full bg-foreground/10" />
        <div className="h-2 w-12 bg-primary/20 rounded" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-2">
        <div className="h-5 w-full bg-foreground/10 rounded" />
        <div className="h-5 w-2/3 bg-foreground/10 rounded" />
      </div>

      {/* Description */}
      <div className="space-y-1.5 mb-6">
        <div className="h-3 w-full bg-foreground/5 rounded" />
        <div className="h-3 w-5/6 bg-foreground/5 rounded" />
      </div>

      {/* Footer area */}
      <div className="mt-auto flex flex-col gap-5 pt-5 border-t border-foreground/5">
        {/* Location or Speaker line */}
        <div className="flex items-center gap-2">
          <div className="size-4 bg-foreground/10 rounded-full" />
          <div className="h-3 w-24 bg-foreground/10 rounded" />
        </div>
        {/* Button */}
        <div className="h-11 w-full bg-foreground/10 rounded-xl" />
      </div>
    </div>
  </div>
);

export default EventSection;
