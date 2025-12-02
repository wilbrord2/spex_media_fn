"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MainSercivesData } from "@/app/constants";
import MainServiceCard from "../../components/card/mainServiceCard";

const ServicePage = () => {
  return (
    <main className=" bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-width-container mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Services
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            Nexus Media Group combines Publishing, Event Management and a
            Bookstore to deliver content, commerce and experiences across
            Africa. Below is a brief overview of each vertical — click any to
            explore more.
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
