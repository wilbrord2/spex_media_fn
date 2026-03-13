"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiWifi, FiUsers, FiMapPin, FiArrowRight } from "react-icons/fi";
import { Event } from "@/app/actions/event";

const EventCard = ({ event }: { event: Event }) => {
  // Simple date formatter
  const eventDate = new Date(event.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const eventTime = new Date(event.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="group flex flex-col bg-foreground/2 rounded-2xl border border-foreground/5 overflow-hidden hover:border-primary/30 transition-all duration-300 h-full">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={event.coverImage || "/images/placeholder.jpeg"}
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
          ) : event.speakers && event.speakers.length > 0 ? (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {event.speakers.slice(0, 2).map((speaker, i) => (
                  <div
                    key={speaker.id}
                    className="size-7 rounded-full border-2 border-background bg-foreground/10 overflow-hidden relative"
                  >
                    <Image
                      src={speaker.profilePicture || "/images/avatar.png"}
                      alt={speaker.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-foreground/30">
                {event.speakers.length} Speaker
                {event.speakers.length !== 1 ? "s" : ""}
              </span>
            </div>
          ) : null}
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

export default EventCard;
