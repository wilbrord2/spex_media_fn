"use client";
import WhiteBtn from "@/app/[locale]/components/Buttons/whiteBtn";
import NewsletterSection from "@/app/[locale]/components/homepage/newsletter";
import Pageheader from "@/app/[locale]/components/homepage/pageheader";
import StartWithUsForm from "../../../components/form/StartWithUsForm";
import AdvertisingPackageCard from "../../../components/card/AdvertisingPackageCard";
import PricingCard from "../../../components/card/PricingCard";
import PartnerCard from "../../../components/card/PartnerCard";
import { ADVERTISING_PACKAGES, PARTNERS, PricingData } from "@/app/constants";
import { Suspense, useState } from "react";
import { FiLoader } from "react-icons/fi";

const tabs = ["monthly", "yearly"];

const PublishingServiceContent = () => {
  const [active, setActive] = useState("monthly");
  return (
    <main className="text-gray-900 dark:text-gray-100 space-y-8">
      <Pageheader
        title="Media Publishing Service"
        description="Explore our Media Publishing Service, dedicated to delivering high-quality content that informs, entertains, and engages audiences across Africa. Our publishing arm focuses on producing a diverse range of media, including digital articles, magazines, and multimedia content that reflects the rich cultural tapestry of the continent."
        quickAction={
          <div className="w-full flex flex-col md:flex-row gap-4">
            <WhiteBtn
              title="Weekly Business Review"
              link="/review"
              className="bg-red-900 text-white hover:bg-red-700"
            />
            <WhiteBtn
              title="Our Insights"
              link="/insight"
              className="bg-white text-gray-900 hover:bg-gray-300"
            />
          </div>
        }
      />
      <div className="max-width-container mx-auto space-y-8 px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Discover Our Publishing Excellence
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            Our Media Publishing Service is committed to producing content that
            resonates with diverse audiences across Africa. From in-depth
            analyses of current affairs to captivating lifestyle features, we
            cover a broad spectrum of topics that matter to our readers.
          </p>
        </header>

        {/* how to get started with us  */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Get Started</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Working with our publishing team is quick and straightforward. We
              provide an end-to-end service from editorial planning to
              distribution. Follow these simple steps to begin:
            </p>

            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Book a Starter Pack:</strong> Use the form to request a
                starter pack and short onboarding call.
              </li>
              <li>
                <strong>Editorial Brief:</strong> We work with your team to
                define topics, tone and publication cadence (e.g., weekly
                business review).
              </li>
              <li>
                <strong>Publishing & Distribution:</strong> We publish, promote
                and provide analytics to help you grow readership.
              </li>
            </ol>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Typical timeline: Discovery (1 week) → Pilot issue (2-3 weeks) →
              Ongoing weekly publishing.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg border border-blue-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Request Starter Pack</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Tell us about your goals and we’ll propose a tailored plan.
            </p>
            <StartWithUsForm />
          </div>
        </div>

        {/* advertising */}
        <section className="bg-gray-50 dark:bg-gray-900/40 py-12">
          <div className="max-width-container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">
              Advertising & Sponsored Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We offer bespoke advertising solutions integrated directly into
              our editorial pipeline and across our distribution channels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {ADVERTISING_PACKAGES.map((pkg, idx) => (
                <AdvertisingPackageCard
                  key={idx}
                  title={pkg.title}
                  description={pkg.description}
                  pricing={pkg.pricing}
                  classname={pkg.classname}
                />
              ))}
            </div>
          </div>
        </section>

        {/* pricing */}
        <section className="px-6 pt-10 pb-16 flex flex-col items-center gap-4">
          <h2 className="text-3xl text-center font-bold">Pricing Packages</h2>
          <div className="flex items-center gap-1 border border-gray-200 bg-gray-100 dark:bg-card p-1.5 w-fit rounded-md">
            {tabs.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActive(item);
                }}
                className={` ${
                  active === item
                    ? "bg-primary text-white dark:bg-accent rounded-md p-2"
                    : ""
                } capitalize cursor-pointer min-w-20 text-center font-semibold text-sm`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center max-lg:flex-wrap pt-16 w-full gap-4 max-lg:gap-6">
            {PricingData.map((tier, idx) => (
              <PricingCard
                key={tier.id}
                id={tier.id}
                title={tier.title}
                badge={tier.badge}
                price={active === "monthly" ? tier.price : tier.price * 2}
                priceLabel={tier.priceLabel}
                description={tier.description}
                buttonText={tier.buttonText}
                trial={tier.trial}
                features={tier.features}
              />
            ))}
          </div>
        </section>

        {/* our partners */}
        <section className="bg-gray-50 dark:bg-gray-900/40 py-12">
          <div className="max-width-container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We collaborate with broadcasters, research institutions and
              commercial partners to amplify reach.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              {PARTNERS.map((partner, idx) => (
                <PartnerCard
                  key={idx}
                  name={partner.name}
                  logoUrl={partner.logoUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <NewsletterSection />
    </main>
  );
};

export default function PublishingService() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <PublishingServiceContent />
    </Suspense>
  );
}
