"use client";
import { MainSercivesData } from "@/app/constants";
import MainServiceCard from "../../components/card/mainServiceCard";
import Pageheader from "../../components/homepage/pageheader";
import WhiteBtn from "../../components/Buttons/whiteBtn";

const ServicePage = () => {
  return (
    <main className="text-gray-900 dark:text-gray-100">
      <Pageheader
        title="Our Services"
        description="Discover the diverse services offered by Nexus Media Group, including Publishing, Event Management, and our Bookstore, all designed to deliver exceptional content, commerce, and experiences across Africa."
        quickAction={
          <div className="w-full">
            <WhiteBtn title="Signup" link="#" className="bg-red-900 text-white hover:bg-red-700" />
          </div>
        }
      />
      <div className="max-width-container mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Explore Our Core Services
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            At Nexus Media Group, we pride ourselves on offering a comprehensive
            suite of services designed to meet the diverse needs of our clients
            and audiences across Africa. Our core services include:
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MainSercivesData.map((service, index) => (
            <div key={index}>
              <MainServiceCard
                image={service.image.src}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
