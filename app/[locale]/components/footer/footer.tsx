"use client";

import { Link } from "@/i18n/navigation";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { MdCall, MdOutlineAlternateEmail } from "react-icons/md";
import Logo from "../Logo/DefaultLogo";

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
    <footer className="mt-10 bg-background border-t border-border">
      <div className="max-width-container w-full px-6 md:px-12 py-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Logo withTagline />

            <div className="text-sm leading-relaxed text-black/70 dark:text-white/70">
              <span className="font-semibold block">
                © {year} Inama | information to business insights.
              </span>
              <span className="block">All Rights Reserved.</span>
              <span className="block">Kigali, Rwanda.</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold tracking-wide text-black dark:text-white">
              Quick Links
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-black/70 dark:text-white/70 
                             hover:text-[#1B4965] dark:hover:text-[#5FA8D3]
                             transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold tracking-wide text-black dark:text-white">
              Connect With Us
            </h2>

            <div className="flex flex-col gap-3 text-sm text-black/70 dark:text-white/70">
              <span className="flex items-center gap-2 hover:text-[#1B4965] dark:hover:text-[#5FA8D3] transition-colors cursor-pointer">
                <MdOutlineAlternateEmail />
                inama@gmail.com
              </span>

              <span className="flex items-center gap-2 hover:text-[#1B4965] dark:hover:text-[#5FA8D3] transition-colors cursor-pointer">
                <MdCall />
                +50780891731
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <Link
                href="/"
                className="text-black/60 dark:text-white/60 hover:text-[#1B4965] dark:hover:text-[#5FA8D3] transition-colors"
              >
                <AiFillInstagram size={22} />
              </Link>

              <Link
                href="/"
                className="text-black/60 dark:text-white/60 hover:text-[#1B4965] dark:hover:text-[#5FA8D3] transition-colors"
              >
                <FaYoutube size={22} />
              </Link>

              <Link
                href="/"
                className="text-black/60 dark:text-white/60 hover:text-[#1B4965] dark:hover:text-[#5FA8D3] transition-colors"
              >
                <BsTwitterX size={20} />
              </Link>

              <Link
                href="/"
                className="text-black/60 dark:text-white/60 hover:text-[#1B4965] dark:hover:text-[#5FA8D3] transition-colors"
              >
                <BsLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
