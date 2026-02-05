"use client";
import { useState } from "react";
import { FiUser, FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import featuredImage from "@/public/images/bnreview1.jpeg";
import Image from "next/image";
import RedirectionBtn from "../../components/Buttons/redirectionBtn";
import NewsletterSection from "../../components/homepage/newsletter";
import Link from "next/link";

const data = {
  general_insights: [
    {
      category: "Leadership",
      title: "Digital Leadership in the African Context",
      description:
        "How traditional leadership principles are being reimagined for the digital age across African businesses and institutions.",
      author: "Prof. Kwame Asante",
      read_time: "6 min read",
      image: featuredImage,
    },
    {
      category: "Policy",
      title: "Policy Innovation in Rwanda's Economic Transformation",
      description:
        "A deep dive into the policy frameworks that have driven Rwanda's remarkable economic growth and what other nations can learn.",
      author: "Jean-Baptiste Nzeyimana",
      read_time: "12 min read",
      image: featuredImage,
    },
    {
      category: "Innovation",
      title: "Fintech Innovation Waves Across Africa",
      description:
        "Exploring the second wave of fintech innovation and how it's addressing more complex financial challenges across the continent.",
      author: "Dr. Amina Hassan",
      read_time: "10 min read",
      image: featuredImage,
    },
    {
      category: "Markets",
      title: "Understanding African Capital Markets Evolution",
      description:
        "A comprehensive analysis of how African capital markets are maturing and attracting international investment flows.",
      author: "Dr. Sarah Mukamana",
      read_time: "9 min read",
      image: featuredImage,
    },
    {
      category: "Leadership",
      title: "The Next Generation of African CEOs",
      description:
        "Profiling the new generation of African bussiness leaders who are redefining corporate success and social impact.",
      author: "Jean-Baptiste Nzeyimana",
      read_time: "7 min read",
      image: featuredImage,
    },
  ],
  categories_navigation: [
    "Strategy",
    "Leadership",
    "Policy",
    "Innovation",
    "Markets",
  ],
};

const categories = ["All", ...data.categories_navigation];
const general_insights = data.general_insights;

const InsightPage = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? general_insights
      : general_insights.filter((item) => item.category === active);
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full bg-linear-to-br from-slate-900 via-slate-800 to-red-900 py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Header Content */}
          <div className="text-white text-center lg:text-left flex flex-col justify-center gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Nexus Insights
            </h1>
            <p className="text-lg leading-relaxed text-white/90">
              Dedicated to decoding the complexities of African business. We
              bridge the gap between global economic trends and local strategic
              leadership, providing the clarity needed to lead with confidence.
            </p>
          </div>

          {/* Right: Featured Insight */}
          <section className="relative w-full rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end p-8 md:p-12 bg-background/95 group shadow-2xl">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={featuredImage}
                alt="Featured Insight"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 w-full flex flex-col gap-4">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-xs font-bold uppercase tracking-wider w-fit backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Featured Insight
              </span>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-black leading-tight text-white">
                The Rise of African Sovereign Wealth Funds
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 font-medium">
                <div className="flex items-center gap-1.5">
                  <FiUser size={14} />
                  <span>Dr. Sarah Mukamana</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCalendar size={14} />
                  <span>Jan 14, 2025</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiClock size={14} />
                  <span>8 min read</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3">
                Analyzing the emergence and strategic importance of sovereign
                wealth funds across the continent and their role in economic
                diversification.
              </p>

              {/* Button */}
              <div className="flex flex-wrap gap-4 mt-2">
                <button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
                  Read Full Insight <FiArrowRight />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Categories navigations */}
      <div className="flex justify-center gap-3 flex-wrap my-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm border transition ${
              active === cat
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* General Insights Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item, index) => (
          <Link
            key={index}
            href={"#"}
            className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border overflow-hidden cursor-pointer hover:shadow-md transition"
          >
            <div className="h-48 relative">
              <Image
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="mb-3">
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-700 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 text-sm text-gray-500 pt-4">
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center gap-1.5">
                    <FiUser size={14} />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiClock size={14} />
                    <span>{item.read_time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More button */}
      <div className="flex justify-center mb-8">
        <RedirectionBtn title="Load More Articles" link="#" />
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default InsightPage;
