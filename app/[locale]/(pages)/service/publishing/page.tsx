"use client";
import WhiteBtn from "@/app/[locale]/components/Buttons/whiteBtn";
import NewsletterSection from "@/app/[locale]/components/homepage/newsletter";
import Pageheader from "@/app/[locale]/components/homepage/pageheader";
import StartWithUsForm from "../../../components/form/StartWithUsForm";
import AdvertisingPackageCard from "../../../components/card/AdvertisingPackageCard";
import PricingCard from "../../../components/card/PricingCard";
import PartnerCard from "../../../components/card/PartnerCard";
import {
  AdvertisersSteps,
  ADVERTISING_PACKAGES,
  AuthorsSteps,
  PARTNERS,
  PricingData,
  PublishingFeatures,
  ReadersSteps,
} from "@/app/constants";
import { Suspense, useState } from "react";
import {
  FiLoader,
  FiUsers,
  FiPenTool,
  FiEye,
  FiMessageCircle,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiGlobe,
} from "react-icons/fi";
import { Link } from "@/i18n/navigation";

const tabs = ["monthly", "yearly"];

const PublishingServiceContent = () => {
  const [active, setActive] = useState("monthly");
  return (
    <main className="text-gray-900 dark:text-gray-100 space-y-8">
      <Pageheader
        title="Business Media & Communications"
        description="A leading pan-African business media platform delivering premium news, articles, and insights. Create, publish, engage, and advertise in one unified ecosystem."
        quickAction={
          <div className="w-full flex flex-col md:flex-row gap-4">
            <WhiteBtn
              title="Weekly Business Review"
              link="/review"
              className="bg-amber-900 text-white hover:bg-amber-700"
            />
            <WhiteBtn
              title="Our Insights"
              link="/insight"
              className="bg-white text-gray-900 hover:bg-gray-300"
            />
          </div>
        }
      />
      <div className="container mx-auto space-y-8 px-4 md:px-8 py-16 ">
        {/* Platform Overview */}
        <section className="mb-16">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold mb-6 text-center">
              Discover Our Publishing Excellence
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center leading-relaxed">
              Our Media Publishing Platform is committed to producing
              world-class content that resonates with diverse audiences across
              Africa. From in-depth business analyses to captivating lifestyle
              features, we cover the full spectrum of topics that matter to our
              readers, while providing creators and advertisers with powerful
              tools to reach their target audience.
            </p>
          </header>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
              <FiPenTool className="text-4xl text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Easy Publishing
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Publish professional articles with our intuitive editor. No
                technical knowledge required.
              </p>
            </div>
            <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8 border border-green-200 dark:border-green-800">
              <FiUsers className="text-4xl text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Engaged Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Connect with thousands of readers and build meaningful
                discussions around your content.
              </p>
            </div>
            <div className="bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-8 border border-amber-200 dark:border-amber-800">
              <FiTrendingUp className="text-4xl text-amber-600 dark:text-amber-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Growth Tools
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Track performance with advanced analytics. Promote your content
                to reach a wider audience and grow your influence.
              </p>
            </div>
          </div>
        </section>

        {/* How it Works for Different Users */}
        <section className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Visitors */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <FiEye className="text-3xl text-primary dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                For Readers & Visitors
              </h3>
              <ol className="space-y-4">
                {ReadersSteps.map((step) => (
                  <li key={step.number} className="flex items-start gap-3">
                    <span className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-sm font-bold">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Authors & Content Creators */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <FiPenTool className="text-3xl text-green-900 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                For Authors & Publishers
              </h3>
              <ol className="space-y-4">
                {AuthorsSteps.map((step) => (
                  <li key={step.number} className="flex items-start gap-3">
                    <span className="bg-green-900 text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-sm font-bold">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* For Advertisers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <FiTrendingUp className="text-3xl text-amber-900 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                For Advertisers & Brands
              </h3>
              <ol className="space-y-4">
                {AdvertisersSteps.map((step) => (
                  <li key={step.number} className="flex items-start gap-3">
                    <span className="bg-amber-900 text-white rounded-full w-7 h-7 flex items-center justify-center shrink-0 text-sm font-bold">
                      {step.number}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Powerful Features for Everyone
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PublishingFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <IconComponent
                      className={`text-2xl ${feature.iconColor} shrink-0 mt-1`}
                    />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* advertising */}
        <section className="bg-linear-to-br from-gray-900 to-gray-800 dark:from-gray-900 dark:to-black rounded-2xl p-8 md:p-12 my-16">
          <div className="max-width-container mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-white">
              Advertising & Sponsored Content
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Reach thousands of engaged business professionals and
              decision-makers with our bespoke advertising solutions. Integrated
              directly into our editorial pipeline and distributed across all
              our channels.
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

            <div className="mt-12 p-8 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">
                Custom Advertising Solutions
              </h3>
              <p className="text-gray-300 mb-6">
                Not sure which package fits your needs? Our advertising team can
                create a custom solution tailored to your specific goals,
                budget, and target audience.
              </p>
              <Link
                href="/contact"
                className="bg-white hover:bg-primary hover:text-white text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </section>

        {/* pricing */}
        <section className="px-6 pt-20 pb-16 flex flex-col items-center gap-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Flexible Pricing Plans</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include access
              to our full platform features, community tools, and support.
            </p>
          </div>
          {/* Billing Toggle */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 p-1.5 w-fit rounded-full shadow-sm">
              {tabs.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActive(item);
                  }}
                  className={`${
                    active === item
                      ? "bg-linear-to-r from-primary to-amber-600 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-400"
                  } capitalize cursor-pointer px-6 py-2 text-center font-semibold text-sm rounded-full transition-all duration-300`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="flex items-center justify-center max-lg:flex-wrap pt-8 w-full gap-6 max-lg:gap-8">
            {PricingData.map((tier, idx) => (
              <div
                key={tier.id}
                className={`relative flex-1 min-w-80 max-w-sm transform transition-all duration-300 hover:scale-105 ${tier.badge ? "lg:scale-105" : ""}`}
              >
                {/* Best Value Badge */}
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-linear-to-r from-primary to-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      {tier.badge}
                    </div>
                  </div>
                )}

                <PricingCard
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
              </div>
            ))}
          </div>
          {/* Additional Info */}
          <div className="mt-16 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Free Trial
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  All plans come with a 14-day free trial. No credit card
                  required.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Money Back Guarantee
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Not satisfied? Get a full refund within 30 days, no questions
                  asked.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  24/7 Support
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Dedicated support team available round the clock to help you
                  succeed.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Pricing FAQ
              </h3>
              <div className="space-y-4">
                <details className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-gray-900 dark:text-white flex justify-between items-center">
                    Can I change my plan anytime?
                    <span className="text-primary">+</span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    Yes, you can upgrade or downgrade your plan at any time.
                    Changes take effect at your next billing cycle.
                  </p>
                </details>

                <details className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-gray-900 dark:text-white flex justify-between items-center">
                    Do you offer discounts for annual plans?
                    <span className="text-primary">+</span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    Absolutely! Annual plans save you 17% compared to monthly
                    billing. For larger commitments, we offer custom enterprise
                    pricing.
                  </p>
                </details>

                <details className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-gray-900 dark:text-white flex justify-between items-center">
                    What payment methods do you accept?
                    <span className="text-primary">+</span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    We accept all major credit cards (Visa, Mastercard, American
                    Express), PayPal, and bank transfers for enterprise
                    customers.
                  </p>
                </details>

                <details className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow">
                  <summary className="font-semibold text-gray-900 dark:text-white flex justify-between items-center">
                    Is there an enterprise plan?
                    <span className="text-primary">+</span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    Yes! We offer custom enterprise plans with dedicated
                    support, advanced features, and custom integrations. Contact
                    our sales team for details.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* our partners */}
        <section className="bg-linear-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900 py-16 rounded-2xl">
          <div className="max-width-container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              We collaborate with broadcasters, research institutions, and
              leading commercial partners to amplify reach and deliver
              world-class content.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
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

        {/* CTA Section */}
        <section className="bg-linear-to-r from-primary via-amber-600 to-orange-600 rounded-2xl p-12 md:p-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of readers, authors, and brands already using Inama
            to create, publish, and grow their reach across Africa.
          </p>
          <Link
            href="/auth"
            className="bg-white text-primary px-10 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Your Free Trial Today
          </Link>
        </section>
      </div>
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
