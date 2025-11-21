import { ServiceData } from "@/app/constants";
import Headline from "../text/headline";
import ServiceCard from "../card/serviceCard";

const ServiceSection = () => {
  return (
    <div className="lg:px-8 px-4 py-6 lg:py-16 bg-white dark:bg-gray-900 space-y-8 flex flex-col items-center justify-center rounded-lg">
      <Headline
        title="Our Core Services"
        description="Integrated solutions designed to amplify African business narratives and drive meaningful engagement across diverse markets and audiences."
      />
      <div className="flex items-stretch grow justify-start flex-wrap gap-4">
        {ServiceData.map((service, index) => (
          <div key={index}>
            <ServiceCard
              Icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              name={service.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
