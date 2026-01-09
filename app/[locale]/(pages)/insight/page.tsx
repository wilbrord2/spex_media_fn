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
      {/* Header */}
      <div className="">
        <div className="container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-16">
          <h1 className="text-4xl md:text-5xl font-extrabold  mb-4">
            Nexus Insights
          </h1>
          <p className="text-foreground max-w-3xl mx-auto text-lg">
            Dedicated to decoding the complexities of African business. We
            bridge the gap between global economic trends and local strategic
            leadership, providing the clarity needed to lead with confidence.
          </p>
        </div>
      </div>

      {/* Featured Insight */}
      <section className="w-full bg-[#f8fafc] dark:bg-slate-900/50 py-6 md:py-12 px-4">
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex flex-col md:flex-row overflow-hidden rounded-xl  shadow-sm border border-border bg-card ">
            <div className="w-full md:w-[42%] relative h-56 md:h-auto">
              <Image
                src={featuredImage}
                alt="Analysis"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="w-full md:w-[58%] px-8 py-8 md:px-10 md:py-8 flex flex-col justify-center">
              <div className="mb-3">
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#856404] bg-[#fff3cd] rounded-full">
                  Featured Insight
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                The Rise of African Sovereign Wealth Funds
              </h2>
              <p className=" text-sm md:text-base leading-relaxed mb-5">
                Analyzing the emergence and strategic importance of sovereign
                wealth funds across the continent and their role in economic
                diversification.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-[13px]">
                <div className="flex items-center gap-1.5">
                  <FiUser size={14} />
                  <span className="">Dr. Sarah Mukamana</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCalendar size={14} />
                  <span>January 14, 2025</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiClock size={14} />
                  <span>8 min read</span>
                </div>
              </div>
              <button className="flex items-center gap-2 w-fit px-5 py-2 bg-[#1e293b] text-white rounded-md font-medium text-sm hover:bg-slate-800 transition-colors group">
                <span>Read Full Insight</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories navigations */}
      <div className="flex justify-center gap-3 flex-wrap my-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm border transition ${
              active === cat
                ? "bg-primary text-white dark:bg-gray-900"
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
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#856404] bg-[#fff3cd] rounded-full">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
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
