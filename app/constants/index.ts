import Review1 from "@/public/images/bnreview1.jpeg";
import Review2 from "@/public/images/bnreview2.jpeg";
import Review3 from "@/public/images/bnreview3.jpeg";
import Review4 from "@/public/images/bnreview4.jpeg";
import { LuNewspaper } from "react-icons/lu";
import {
  FiGlobe,
  FiMessageCircle,
  FiMessageSquare,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { image } from "motion/react-client";
import { link } from "fs";
import { PricingCardProps } from "../[locale]/components/card/PricingCard";

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
    title: "Business Media & Communications",
    description:
      "A leading pan-African business media company delivering news, analysis, and insights through our digital magazine, TV channel, and YouTube presence.",
    link: "service/publishing",
  },
  {
    image: Review3,
    title: "Publishing & Book Store",
    description:
      "Publishing a diverse range of business books, reports, and research that provide in-depth analysis and insights into African markets and industries.",
    link: "service/store",
  },
  {
    image: Review2,
    title: "Event Management",
    description:
      "Organizing high-profile business conferences, summits, and networking events across Africa that bring together industry leaders, policymakers, and innovators.",
    link: "service/event",
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

export const PricingData: PricingCardProps[] = [
  {
    id: "free",
    title: "Free",
    price: 0,
    priceLabel: "$0,00",
    description: "Great for personal use or a first step to explore Nexwealth",
    buttonText: "Get Started",
    trial: "",
    features: [
      "AI Financial Advisor",
      "Basic analytics and reporting",
      "50 Gratis Transfer & Top up",
      "Access Financial Dashboard",
    ],
  },
  {
    id: "pro",
    title: "Pro",
    price: 1200,
    priceLabel: "$12,00",
    badge: "Most Popular",
    description: "Perfect for experts who want to analyze finances",
    buttonText: "Try for 14 day",
    trial: "14 days",
    features: [
      "AI Financial Advisor",
      "Basic analytics and reporting",
      "50 Gratis Transfer & Top up",
      "Access Financial Dashboard",
    ],
  },
  {
    id: "extended",
    title: "Extended",
    price: 1500,
    priceLabel: "$24,00",
    description:
      "Enhanced support with dedicated SLAs for optimal performance.",
    buttonText: "Try for 14 day",
    trial: "14 days",
    features: [
      "AI Financial Advisor",
      "Basic analytics and reporting",
      "50 Gratis Transfer & Top up",
      "Access Financial Dashboard",
    ],
  },
];

export const ADVERTISING_PACKAGES = [
  {
    title: "Sponsored Article",
    description:
      "A native article written in collaboration with your brand, published and promoted to our audience.",
    pricing: "From $50",
    classname: "border-blue-500 shadow-blue-500/20",
  },
  {
    title: "Newsletter Integration",
    description:
      "Insert a promoted story into our weekly newsletter with targeted placement.",
    pricing: "From $35",
    classname: "border-amber-500 shadow-amber-500/20",
  },
  {
    title: "Programmatic Ad Slots",
    description:
      "Flexible programmatic or direct-buy slots across article pages and archive feeds.",
    pricing: "Contact for pricing",
    classname: "border-green-500 shadow-green-500/20",
  },
];

export const PARTNERS = [
  {
    name: "Google",
    logoUrl:
      "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  },
  {
    name: "Microsoft",
    logoUrl: "https://www.panapress.com/img/logo.png",
  },
  {
    name: "Coca-Cola",
    logoUrl:
      "https://static.wikia.nocookie.net/the-soda/images/d/d8/Coca-Cola_Logo.png/revision/latest/scale-to-width-down/268?cb=20190817015840",
  },
  {
    name: "Amazon",
    logoUrl:
      "https://assets.aboutamazon.com/dims4/default/c3ed523/2147483647/strip/true/crop/1260x224+0+0/resize/1215x216!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F03%2Fdb%2Facdae03e4c01989e1e8253b152b5%2Famazon-business-logo-horizontal-rgb-squid-ink-smile-orange.png",
  },
];

// How It Works Data
export const ReadersSteps = [
  {
    number: 1,
    title: "Discover Quality Content",
    description:
      "Browse curated business news, analyses, and insights across multiple categories",
  },

  {
    number: 2,
    title: "Engage & Comment",
    description:
      "Share your thoughts, ask questions, and participate in our vibrant community",
  },
  {
    number: 3,
    title: "Stay Updated",
    description:
      "Subscribe to newsletters and get the latest articles delivered to your inbox",
  },
  // {
  //   number: 4,
  //   title: "Create Free Account",
  //   description:
  //     "Sign up in seconds to unlock personalized feeds and save your favorite articles",
  // },
];

export const AuthorsSteps = [
  {
    number: 1,
    title: "Create Your Account",
    description:
      "Sign up and set up your author profile with your bio and credentials",
  },
  {
    number: 2,
    title: "Start Writing",
    description:
      "Use our rich text editor to craft compelling articles with formatting and media",
  },
  {
    number: 3,
    title: "Submit for Review",
    description:
      "Our editorial team reviews your submission to ensure quality and relevance before publication",
  },
  {
    number: 4,
    title: "Publish & Share",
    description:
      "Once approved, your article goes live. Share it across social media and engage with readers through comments",
  },
  {
    number: 5,
    title: "Track Analytics",
    description: "Monitor views, engagement, and reader feedback in real-time",
  },
];

export const AdvertisersSteps = [
  {
    number: 1,
    title: "Choose Your Package",
    description:
      "Select from flexible advertising plans tailored to your budget and goals",
  },
  {
    number: 2,
    title: "Create Campaign",
    description:
      "Work with our team to design targeted ads or sponsored content",
  },
  {
    number: 3,
    title: "Launch & Monitor",
    description:
      "Deploy your campaign and track impressions, clicks, and conversions",
  },
  {
    number: 4,
    title: "Optimize & Scale",
    description: "Receive insights and recommendations to maximize your ROI",
  },
];

export const PublishingFeatures = [
  {
    id: 1,
    icon: FiZap,
    iconColor: "text-yellow-500",
    title: "Rich Text Editor",
    description:
      "Powerful yet intuitive editor with formatting, media uploads, and live preview capabilities",
  },
  {
    id: 2,
    icon: FiMessageCircle,
    iconColor: "text-blue-500",
    title: "Comment System",
    description:
      "Moderated comments with threading, replies, and community engagement tools",
  },
  {
    id: 3,
    icon: FiTrendingUp,
    iconColor: "text-green-500",
    title: "Advanced Analytics",
    description:
      "Real-time dashboards tracking views, engagement, reach, and reader demographics",
  },
  {
    id: 4,
    icon: FiGlobe,
    iconColor: "text-amber-500",
    title: "SEO Optimization",
    description:
      "Built-in SEO tools to help your content rank higher and reach more readers",
  },
  {
    id: 5,
    icon: FiShield,
    iconColor: "text-red-500",
    title: "Content Security",
    description:
      "Intellectual property protection, copyright management, and content verification",
  },
  {
    id: 6,
    icon: FiUsers,
    iconColor: "text-orange-500",
    title: "Community Tools",
    description:
      "Author profiles, follower system, and social sharing to build your audience",
  },
];

export const PRICING_FAQS = [
  {
    id: 1,
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.",
  },
  {
    id: 2,
    question: "Do you offer discounts for annual plans?",
    answer:
      "Absolutely! Annual plans save you 17% compared to monthly billing. For larger commitments, we offer custom enterprise pricing.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers.",
  },
  {
    id: 4,
    question: "Is there an enterprise plan?",
    answer:
      "Yes! We offer custom enterprise plans with dedicated support, advanced features, and custom integrations. Contact our sales team for details.",
  },
];