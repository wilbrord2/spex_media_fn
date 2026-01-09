"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiZoomIn,
  FiEye,
  FiShare2,
  FiHeart,
  FiChevronDown,
  FiDownload,
  FiTruck,
  FiSmartphone,
  FiArrowRight,
} from "react-icons/fi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

// --- Types ---
type BookFormat = "platform" | "digital" | "physical";

interface FormatOption {
  id: BookFormat;
  title: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const FORMATS: FormatOption[] = [
  {
    id: "platform",
    title: "Read on Platform",
    description: "Instant access via Nexus Reader.",
    price: 9.99,
    icon: <FiSmartphone size={20} />,
  },
  {
    id: "digital",
    title: "Digital Download",
    description: "PDF & EPUB (DRM-Free).",
    price: 14.99,
    icon: <FiDownload size={20} />,
  },
  {
    id: "physical",
    title: "Physical Book",
    description: "Hardcover. Ships in 3 days.",
    price: 24.99,
    icon: <FiTruck size={20} />,
  },
];

const NexusBookDetails: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>("platform");
  const activeFormatData = FORMATS.find((f) => f.id === selectedFormat);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 pb-20">
      <main className="relative w-full">
        {/* Ambient Background Blur */}
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden -z-10 pointer-events-none">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800')] bg-cover bg-center blur-[100px] opacity-10 dark:opacity-20 scale-110" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 py-4 mb-4 text-sm font-medium text-foreground/40">
            <a href="#" className="hover:text-primary transition-colors">
              Bookstore
            </a>
            <span>/</span>
            <a href="#" className="hover:text-primary transition-colors">
              Non-Fiction
            </a>
            <span>/</span>
            <span className="text-foreground">The Future of Digital Media</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-2">
            {/* --- Left Column: Visuals --- */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center lg:items-start gap-6">
              <div className="relative group w-full max-w-[320px] aspect-2/3 rounded-2xl shadow-2xl overflow-hidden bg-foreground/5 border border-foreground/5 transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800"
                  alt="Book Cover"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full p-4 hover:bg-white/30 transition-colors">
                    <FiZoomIn size={24} />
                  </button>
                </div>
              </div>

              <button className="flex w-full max-w-[320px] items-center justify-center rounded-xl h-14 bg-foreground/5 border border-foreground/10 text-foreground gap-3 hover:bg-foreground/10 transition-all group shadow-sm">
                <FiEye className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold tracking-wide">
                  Look Inside (Free 10%)
                </span>
              </button>

              <div className="flex gap-4 w-full max-w-[320px]">
                <ActionButton icon={<FiShare2 />} label="Share" />
                <ActionButton icon={<FiHeart />} label="Wishlist" />
              </div>
            </div>

            {/* --- Right Column: Details --- */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-8">
              <div className="flex flex-col gap-4 border-b border-foreground/10 pb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  The Future of Digital{" "}
                  <span className="text-primary">Media</span>
                </h1>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/40">By</span>
                    <a
                      href="#"
                      className="text-primary font-bold hover:underline text-lg"
                    >
                      Sarah Jenkins
                    </a>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    Upcoming Webinar
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex text-amber-500 gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <FaStar key={i} />
                    ))}
                    <FaStarHalfAlt />
                  </div>
                  <span className="text-sm font-bold">4.6</span>
                  <span className="text-sm text-foreground/40">
                    (128 reviews)
                  </span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="flex flex-col gap-3 max-w-3xl">
                <h3 className="text-lg font-bold">Synopsis</h3>
                <p className="text-foreground/60 leading-relaxed text-base">
                  An in-depth look at how ecosystems like Nexus are changing the
                  landscape of modern publishing. Sarah Jenkins explores the
                  intersection of traditional storytelling and immersive digital
                  experiences.
                </p>
                <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                  Read more <FiChevronDown />
                </button>
              </div>

              {/* Format Selection */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold">Select Format</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {FORMATS.map((format) => (
                    <FormatCard
                      key={format.id}
                      format={format}
                      isActive={selectedFormat === format.id}
                      onClick={() => setSelectedFormat(format.id)}
                    />
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-foreground/3 border border-foreground/5">
                <div className="flex-1">
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1">
                    Total Price
                  </p>
                  <p className="text-3xl font-black">
                    ${activeFormatData?.price}
                  </p>
                </div>
                <button className="w-full sm:w-auto px-10 h-14 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl hover:shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  Buy Now <FiArrowRight />
                </button>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-foreground/10">
                <Spec label="Publisher" value="Nexus Press" />
                <Spec label="Released" value="Oct 24, 2023" />
                <Spec label="Pages" value="342" />
                <Spec label="Language" value="English" />
              </div>

              {/* --- More from Author Section --- */}
              <div className="mt-12 border-t border-foreground/10 pt-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-foreground">
                    More from Sarah Jenkins
                  </h3>
                  <a
                    className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                    href="#"
                  >
                    View Author Profile <FiArrowRight size={14} />
                  </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <AuthorBookCard
                    title="Modern UX Design"
                    category="Technology"
                    image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800"
                  />
                  <AuthorBookCard
                    title="The Code of Ethics"
                    category="Philosophy"
                    image="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800"
                  />

                  {/* Magazine Cross-Promo Card */}
                  <a
                    href="#"
                    className="group flex flex-col gap-3 col-span-2 md:col-span-2"
                  >
                    <div className="w-full h-full min-h-[180px] bg-foreground/3 rounded-2xl overflow-hidden relative border border-foreground/5 flex flex-row transition-all hover:border-primary/30">
                      <div className="w-1/3 relative">
                        <Image
                          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"
                          alt="Interview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-center">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                          From Nexus Magazine
                        </span>
                        <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-tight">
                          Interview: Defining the Digital Shelf
                        </h4>
                        <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">
                          Sarah discusses her latest book and the challenges of
                          writing for a hyper-connected audience.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const ActionButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-foreground/5 transition-all group">
    <div className="size-11 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-sm group-hover:text-primary group-hover:border-primary/30 transition-all">
      {icon}
    </div>
    <span className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">
      {label}
    </span>
  </button>
);

const FormatCard = ({
  format,
  isActive,
  onClick,
}: {
  format: FormatOption;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`cursor-pointer h-full p-5 rounded-2xl border-2 transition-all flex flex-col gap-4 ${
      isActive
        ? "border-primary bg-primary/5"
        : "border-foreground/5 bg-foreground/2 hover:border-foreground/20"
    }`}
  >
    <div className="flex justify-between items-start">
      <div
        className={`p-2.5 rounded-lg ${isActive ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-foreground/40"}`}
      >
        {format.icon}
      </div>
      <div
        className={`size-5 rounded-full border-2 flex items-center justify-center ${isActive ? "border-primary" : "border-foreground/10"}`}
      >
        {isActive && <div className="size-2.5 bg-primary rounded-full" />}
      </div>
    </div>
    <div>
      <h4 className="font-bold text-sm">{format.title}</h4>
      <p className="text-[11px] text-foreground/40 mt-1 leading-snug">
        {format.description}
      </p>
    </div>
    <div
      className={`mt-auto pt-4 border-t ${isActive ? "border-primary/20" : "border-foreground/5"}`}
    >
      <span className="text-lg font-black">${format.price}</span>
    </div>
  </div>
);

const AuthorBookCard = ({
  title,
  category,
  image,
}: {
  title: string;
  category: string;
  image: string;
}) => (
  <a className="group flex flex-col gap-3" href="#">
    <div className="w-full aspect-2/3 bg-foreground/5 rounded-2xl overflow-hidden relative border border-foreground/5">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div>
      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
        {title}
      </h4>
      <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mt-1">
        {category}
      </p>
    </div>
  </a>
);

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-1">
      {label}
    </p>
    <p className="text-sm font-bold">{value}</p>
  </div>
);

export default NexusBookDetails;
