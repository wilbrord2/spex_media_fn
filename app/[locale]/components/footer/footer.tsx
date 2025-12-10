"use client";
import Logo from "@/public/logo/nexuslogo.png";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { MdCall, MdOutlineAlternateEmail } from "react-icons/md";

const Footer = () => {
  const year = new Date().getFullYear();
  const quickLinks = [
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Use", href: "/about" },
    { label: "Careers", href: "/services" },
    { label: "Advertise With Us", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
  ];
  return (
    <div className="bg-primary dark:bg-slate-950">
      <div className="max-width-container w-full flex flex-row flex-wrap items-start justify-between p-8 gap-4">
        <div className="flex flex-col  gap-4  text-sm">
          <Link href="/" className="bg-white p-2 rounded-lg w-fit">
            <Image
              src={Logo}
              alt="Nexus Logo"
              height={40}
              width={120}
              className="object-cover"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-slate-300 text-lg font-medium">
              "Elevating African Business Narratives to Their Peak."
            </span>
            <span className="text-slate-200 font-semibold text-sm">
              © {year} nexus Media & Communications Inc.
              <br /> All Rights Reserved. Kigali, Rwanda.
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg mb-2">Quick Links</h2>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white hover:underline duration-300 font-semibold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-white font-bold text-lg mb-2">Follow Us</h2>
          <span className="text-white font-bold hover:underline flex items-center gap-1 cursor-pointer">
            <MdOutlineAlternateEmail /> nexus@gmail.com
          </span>
          <span className="text-white font-bold hover:underline flex items-center gap-1 cursor-pointer">
            <MdCall /> +50780891731
          </span>
          <div className="flex flex-wrap gap-4 text-2xl mt-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-white duration-300"
            >
              <AiFillInstagram size={30} />
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-white duration-300"
            >
              <FaYoutube size={30} />
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-white duration-300"
            >
              <BsTwitterX size={30} />
            </Link>
            <Link
              href="/"
              className="text-gray-500 hover:text-white duration-300"
            >
              <BsLinkedin size={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
