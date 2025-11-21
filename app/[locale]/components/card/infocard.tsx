import { ComponentType } from "react";
import { IconContext, IconType } from "react-icons";

export default function InfoCard({
  icon: Icon,
  title,
  content,
}: {
  icon: IconType;
  title: string;
  content: string | string[];
}) {
  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-sm p-10 flex flex-col items-center  text-center space-y-4 hover:scale-105 duration-300  hover:shadow-md transition-all">
      <div className="">
        <Icon size={48} className="text-primary dark:text-gray-200" />
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{title}</h3>

      {Array.isArray(content) ? (
        <ul className="space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start justify-start gap-2">
              • {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{content}</p>
      )}
    </div>
  );
}
