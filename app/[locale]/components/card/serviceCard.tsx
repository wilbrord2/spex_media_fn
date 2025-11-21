import { IconType } from "react-icons";
import { FaArrowRightLong } from "react-icons/fa6";

const ServiceCard = ({
  Icon,
  title,
  description,
  link,
  name,
}: {
  Icon: IconType;
  title: string;
  description: string;
  link: string;
  name: string;
}) => {
  return (
    <div className="group cursor-pointer max-w-sm space-y-8 border hover:duration-500 rounded-lg p-4 shadow-md hover:shadow-xl hover:border-primary transition-shadow">
      <Icon size={50} className="text-primary" />
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mt-2 group-hover:text-primary duration-500">
          {title}
        </h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <a href={link} className="text-primary hover:text-secondary group font-bold mt-2 flex items-center gap-2">
        {name}
        <FaArrowRightLong className="group-hover:translate-x-2 transition-transform" />
      </a>
    </div>
  );
};

export default ServiceCard;
