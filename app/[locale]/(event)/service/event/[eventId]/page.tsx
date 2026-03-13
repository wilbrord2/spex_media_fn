"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiHelpCircle,
  FiCreditCard,
  FiLoader,
} from "react-icons/fi";
import Link from "next/link";
import { getEventById, Event } from "@/app/actions/event";

const EventDetails: React.FC = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketType, setTicketType] = useState<"general" | "vip">("general");
  const [quantity, setQuantity] = useState(1);
  const [showAllSpeakers, setShowAllSpeakers] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEventById(Number(eventId));
      if (res.success && res.data) {
        setEvent(res.data);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/50">Event not found.</p>
      </div>
    );
  }

  const displayedSpeakers = showAllSpeakers
    ? event.speakers
    : event.speakers?.slice(0, 3);

  const eventDate = new Date(event.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const eventTime = new Date(event.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30">
      <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Hero Section --- */}
        <section className="relative w-full rounded-3xl overflow-hidden min-h-[450px] flex flex-col justify-end mb-12 group shadow-2xl">
          <Image
            src={
              event.coverImage ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
            }
            alt={event.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

          <div className="relative z-10 p-8 md:p-14 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary text-[10px] font-black uppercase tracking-widest text-white py-1.5 px-4 rounded-full">
                {event.category?.name || "Event"}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full border border-white/20">
                {event.eventType}
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-[1.1] tracking-tight mb-8">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/90">
              <HeroInfo icon={<FiCalendar />} text={eventDate} />
              <HeroInfo icon={<FiClock />} text={`${eventTime} EST`} />
              <HeroInfo
                icon={<FiMapPin />}
                text={event.location || "Virtual Event"}
              />
            </div>
          </div>
        </section>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          <div className="lg:col-span-8 space-y-16">
            {/* About */}
            <section>
              <SectionHeading title="About this Event" />
              <div className="space-y-6 text-foreground/70 text-lg leading-relaxed max-w-none">
                <p>{event.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  <CheckItem text="Expert-led sessions" />
                  <CheckItem text="Networking opportunities" />
                  <CheckItem text="Interactive workshops" />
                  <CheckItem text="Exclusive event resources" />
                </div>
              </div>
            </section>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <SectionHeading title="Featured Speakers" noMargin />
                  {event.speakers.length > 3 && (
                    <button
                      onClick={() => setShowAllSpeakers(!showAllSpeakers)}
                      className="text-primary font-bold text-sm hover:underline"
                    >
                      {showAllSpeakers ? "Show Less" : "View All"}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {displayedSpeakers?.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                  ))}
                </div>
              </section>
            )}

            {/* Agenda (Placeholder as API typically lacks detailed agenda arrays) */}
            <section>
              <SectionHeading title="Event Schedule" />
              <div className="relative pl-8 border-l-2 border-foreground/5 space-y-10">
                <AgendaRow
                  item={{
                    day: 1,
                    time: eventTime,
                    title: "Opening Session",
                    description: `Starting promptly at ${eventTime}, join us for the opening of ${event.title}.`,
                  }}
                />
              </div>
            </section>

            {/* Venue Map */}
            {event.location && (
              <section className="rounded-2xl overflow-hidden bg-foreground/3 border border-foreground/5">
                <div className="p-6 border-b border-foreground/5 flex justify-between items-center">
                  <h3 className="font-bold">Location</h3>
                  <span className="text-sm text-foreground/40">
                    {event.location}
                  </span>
                </div>
                <div className="h-72 bg-foreground/10 relative group cursor-pointer overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1526778545894-dd8163498ce6?q=80&w=1200"
                    alt="Map"
                    fill
                    className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground p-4 rounded-full shadow-2xl animate-bounce">
                      <FiMapPin size={24} />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-10 space-y-6">
              <div className="bg-foreground/3 backdrop-blur-sm rounded-3xl border border-foreground/5 shadow-xl overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                        Starting from
                      </p>
                      <h3 className="text-4xl font-black">
                        $149.00{" "}
                        <span className="text-sm text-foreground/40 font-bold uppercase tracking-widest ml-1">
                          USD
                        </span>
                      </h3>
                    </div>
                    <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/20">
                      Selling Fast
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <TicketOption
                      active={ticketType === "general"}
                      onClick={() => setTicketType("general")}
                      title="General Admission"
                      desc="Full access to sessions"
                      price="149"
                    />
                    <TicketOption
                      active={ticketType === "vip"}
                      onClick={() => setTicketType("vip")}
                      title="VIP Pass"
                      desc="Priority seating + materials"
                      price="299"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-foreground/5">
                    <span className="font-bold text-sm">Quantity</span>
                    <div className="flex items-center bg-background rounded-xl border border-foreground/10 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-foreground/5 rounded-lg transition-colors"
                      >
                        <FiMinus />
                      </button>
                      <span className="w-10 text-center font-black">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-foreground/5 rounded-lg transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground font-black py-5 px-6 rounded-2xl transition-all shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3 active:scale-95">
                    <span>Get Tickets</span>
                    <FiArrowRight />
                  </button>
                  <p className="text-center text-[10px] font-bold text-foreground/30 mt-6 uppercase tracking-widest">
                    Secure checkout by Inama Pay
                  </p>
                </div>

                <div className="bg-foreground/5 px-8 py-4 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all">
                  <FiCreditCard size={18} />
                  <div className="flex gap-4 font-black text-[10px]">
                    <span>VISA</span>
                    <span>AMEX</span>
                    <span>PAYPAL</span>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full text-foreground/40 hover:text-foreground text-xs font-bold flex items-center justify-center gap-2 py-4"
              >
                <FiHelpCircle /> Have questions? Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components (Updated for Data Mapping) ---

const HeroInfo = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-sm font-bold tracking-wide">
    <span className="text-primary-foreground/70">{icon}</span>
    {text}
  </div>
);

const SectionHeading = ({
  title,
  noMargin,
}: {
  title: string;
  noMargin?: boolean;
}) => (
  <h2
    className={`text-2xl font-black flex items-center gap-3 ${noMargin ? "" : "mb-8"}`}
  >
    <span className="w-1.5 h-7 bg-primary rounded-full"></span>
    {title}
  </h2>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/2 border border-foreground/5">
    <FiCheckCircle className="text-primary shrink-0" />
    <span className="text-sm font-bold text-foreground/60">{text}</span>
  </div>
);

const SpeakerCard = ({ speaker }: { speaker: any }) => (
  <div className="group bg-foreground/2 border border-foreground/5 p-6 rounded-2xl hover:border-primary/30 transition-all hover:-translate-y-1">
    <div className="relative size-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary/50 transition-all">
      <Image
        src={speaker.profilePicture || "/avatar.png"}
        alt={speaker.fullName}
        fill
        className="object-cover"
      />
    </div>
    <div className="text-center">
      <h3 className="font-bold text-lg">{speaker.fullName}</h3>
      <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest mt-1">
        Professional
      </p>
      <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-2">
        Inama Guest
      </p>
    </div>
  </div>
);

const AgendaRow = ({ item }: { item: any }) => (
  <div className="relative group">
    <div className="absolute -left-[41px] top-1 size-5 rounded-full ring-4 ring-background border-2 bg-background border-foreground/20"></div>
    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">
      Day {item.day} • {item.time}
    </span>
    <h3 className="text-xl font-black leading-tight mb-2 group-hover:text-primary transition-colors">
      {item.title}
    </h3>
    <p className="text-foreground/50 text-sm leading-relaxed max-w-xl">
      {item.description}
    </p>
  </div>
);

const TicketOption = ({ active, onClick, title, desc, price }: any) => (
  <div
    onClick={onClick}
    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
      active
        ? "bg-primary/5 border-primary shadow-lg shadow-primary/5"
        : "bg-background border-foreground/5 hover:border-foreground/20"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-primary" : "border-foreground/20"}`}
      >
        {active && <div className="size-2.5 bg-primary rounded-full" />}
      </div>
      <div>
        <span className="block font-bold text-sm">{title}</span>
        <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
          {desc}
        </span>
      </div>
    </div>
    <span className="font-black text-lg">${price}</span>
  </div>
);

export default EventDetails;
