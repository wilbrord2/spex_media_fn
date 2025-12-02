import { MainSercivesData } from "@/app/constants";
import Headline from "../text/headline";
import MainServiceCard from "../card/mainServiceCard";

const ServiceSection = () => {
  return (
    <div className="lg:px-8 px-4 py-6 lg:py-16 bg-white dark:bg-gray-900 space-y-16 flex flex-col items-center justify-center rounded-lg">
      <Headline
        title="Our Core Services"
        description="Integrated solutions designed to amplify African business narratives and drive meaningful engagement across diverse markets and audiences."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MainSercivesData.map((service, index) => (
          <div key={index}>
            <MainServiceCard
              key={index}
              image={service.image.src}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
