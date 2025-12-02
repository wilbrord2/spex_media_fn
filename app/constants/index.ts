import Review1 from "@/public/images/bnreview1.jpeg";
import Review2 from "@/public/images/bnreview2.jpeg";
import Review3 from "@/public/images/bnreview3.jpeg";
import Review4 from "@/public/images/bnreview4.jpeg";
import { LuNewspaper } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { image } from "motion/react-client";
import { link } from "fs";

export const BusinesReviewData = [
  {
    id: 1,
    category: "Lead Story",
    title: "African Markets Rally Amid Global Economic Uncertainty",
    description:
      "African stock markets have shown resilience in the face of global economic challenges, with key indices posting gains over the past week. Analysts attribute this to strong corporate earnings and increased foreign investment.",
    name: "John Doe",
    date: "June 20, 2024",
    img: Review1,
  },
  {
    id: 2,
    category: "Market Analysis",
    title: "Commodities Drive Growth in African Economies",
    description:
      "The surge in commodity prices, particularly in oil and minerals, has been a significant driver of economic growth across several African nations. This trend is expected to continue as global demand for resources remains robust.",
    name: "Jane Smith",
    date: "June 18, 2024",
    img: Review2,
  },
  {
    id: 3,
    category: "Leadership Insights",
    title: "Innovative Leadership in Africa's Tech Sector",
    description:
      "African tech leaders are pioneering innovative solutions that address local challenges while also making a mark on the global stage. Their leadership styles and strategies offer valuable lessons for businesses worldwide.",
    name: "Alice Johnson",
    date: "June 15, 2024",
    img: Review3,
  },
  {
    id: 4,
    category: "Economic Policy",
    title: "New Trade Policies Boost Intra-African Commerce",
    description:
      "Recent trade agreements within the African continent are fostering increased commerce among member states. These policies aim to reduce tariffs and streamline regulations, promoting a more integrated economic landscape.",
    name: "Michael Brown",
    date: "June 10, 2024",
    img: Review4,
  },
];

export const ServiceData = [
  {
    icon: LuNewspaper,
    title: "Business News and Journalism",
    description:
      "Unparalleled insights into African economies through our dynamic digital magazine, television presence, and engaging YouTube channel. We bring you the stories that matter.",
    link: "",
    name: "Learn More",
  },
  {
    icon: FiMessageSquare,
    title: "Strategic Communications & PR",
    description:
      "Crafting compelling brand narratives, managing reputations, and executing impactful PR campaigns across diverse African markets. Let us amplify your voice.",
    link: "",
    name: "Discover Our Approach",
  },
  {
    icon: FaChartLine,
    title: " Business Advisory & Development",
    description:
      "Expert consulting in market strategy, organizational growth, and leadership excellence. We partner with you to achieve peak performance in Africa.",
    link: "",
    name: "Unlock Your Potential ",
  },
];

export const MainSercivesData = [
  {
    image: Review1,
    title: "Media & Publishing",
    description:
      "Weekly business reviews, in-depth articles, newsletters, and editorial services — built for reach and subscription monetization.",
    link: "service/publishing",
  },
  {
    image: Review2,
    title: "Event Management",
    description:
      "End-to-end event planning, management and coverage for conferences, exhibitions, sporting and faith events — virtual, hybrid and physical.",
    link: "service/event",
  },
  {
    image: Review3,
    title: "Book Store & Self-Publishing",
    description:
      "A digital marketplace and self-publishing engine where authors upload manuscripts and readers buy securely across multiple currencies.",
    link: "service/store",
  },
];

export const OurMotivesData = [
  {
    title: "Unmatched Pan-African Perspective",
    description:
      "On-the-ground reporting and analysis from across the continent.",
  },
  {
    title: "Multilingual Content",
    description:
      "Reaching diverse audiences in English, French, Kiswahili, and more.",
  },
  {
    title: "Integrated Expertise",
    description: "A unique synergy of media insight and strategic advisory.",
  },
  {
    title: "Ethical & Authoritative Voice",
    description: "Content and counsel you can trust.",
  },
];

export const TeamData = [
  {
    image: Review1,
    name: "Dr. Sarah Mukamana",
    role: "Chief Executive Officer",
    description:
      "Leading strategic vision with 15+ years in African media landscape.",
  },
  {
    image: Review1,
    name: "Jean-Baptiste Nzeyimana",
    role: "Editor-in-Chief",
    description:
      "Award-winning journalist specializing in pan-African business coverage.",
  },
  {
    image: Review1,
    name: "Dr. Amina Hassan",
    role: "Head of Research & Analysis",
    description:
      "Economics PhD with expertise in African market dynamics and policy analysis.",
  },
  {
    image: Review1,
    name: "Prof. Kwame Asante",
    role: "Senior Strategic Advisor",
    description:
      "Renowned business strategist and thought leader in African development.",
  },
];

export const VideoData = [
  {
    thumbnail: Review1.src,
    title: "CEO Spotlight: Building Pan-African Brands",
    views: "12.5K",
    duration: "24:30",
  },
  {
    thumbnail: Review2.src,
    title: "Market Analysis: East African Trade Dynamics",
    views: "8.2K",
    duration: "18:45",
  },
  {
    thumbnail: Review3.src,
    title: "Innovation Series: African Agritech Startups",
    views: "15.7K",
    duration: "32:15",
  },
];

export interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  name: string;
  img: string;
}

export const ArticlesData: Article[] = [
  {
    id: 1,
    title: "Rwanda’s Digital Economy Reaches $2.3B Milestone",
    description:
      "Comprehensive analysis of Rwanda’s digital transformation journey and its impact on regional economic growth.",
    category: "Technology",
    name: "Dr. Sarah Mukamana",
    date: "January 15, 2025",
    img: Review1.src,
  },
  {
    id: 2,
    title: "East African Banking Sector Transformation",
    description:
      "How digital banking innovations are reshaping financial services across East Africa.",
    category: "Finance",
    name: "Jean-Baptiste Nziyimana",
    date: "January 14, 2025",
    img: Review4.src,
  },
  {
    id: 3,
    title: "Nigeria’s Fintech Revolution Continues",
    description:
      "Deep dive into Nigeria’s fintech ecosystem and its expansion into West African markets.",
    category: "Finance",
    name: "Dr. Amina Hassan",
    date: "January 13, 2025",
    img: Review2.src,
  },
  {
    id: 4,
    title: "Agribusiness Innovation Across the Continent",
    description:
      "Transformation from Kenya’s vertical farms to Ghana’s agri-tech startups.",
    category: "Agribusiness",
    name: "Prof. Kwame Asante",
    date: "January 12, 2025",
    img: Review3.src,
  },
  {
    id: 5,
    title: "Renewable Energy Boom in Southern Africa",
    description:
      "Wind and solar energy projects transforming the landscape across Botswana, Namibia, and Zambia.",
    category: "Energy",
    name: "Dr. Sarah Mukamana",
    date: "January 11, 2025",
    img: Review1.src,
  },
  {
    id: 6,
    title: "Healthcare Innovation in African Cities",
    description:
      "Telemedicine and digital health solutions revolutionizing healthcare delivery across Africa.",
    category: "Healthcare",
    name: "Dr. Fatima Al-Rashid",
    date: "January 10, 2025",
    img: Review2.src,
  },
];

export const CommentData = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    comment:
      "Excellent analysis! This provides great insights into the market trends.",
    date: "January 14, 2025",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    comment:
      "Very informative article. Looking forward to more content like this.",
    date: "January 13, 2025",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    comment: "Great perspective on African economic growth. Keep it up!",
    date: "January 12, 2025",
  },
];
