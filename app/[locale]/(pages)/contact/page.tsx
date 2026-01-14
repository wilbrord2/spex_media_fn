"use client";
import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiUser,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";

const ContactUsPage = () => {
  return (
    <div>
      {/* Header */}
      <div className="my-10 w-full bg-linear-to-br from-slate-900 via-slate-800 to-red-900">
        <div className="container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Connect With Nexus
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            We&apos;re always looking for new voices and strategic partners to
            join our mission. If you&apos;re looking for communications support
            or want to contribute to the conversation, get in touch. We&apos;d
            love to help you tell your story to the world.
          </p>
        </div>
      </div>

      {/* Form section */}
      <ContactSection />
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const contactMethods = [
    {
      title: "General Inquiries",
      value: "hello@nexusmedia.com",
      icon: <FiMail className="text-primary" size={22} />,
    },
    {
      title: "Editorial",
      value: "editorial@nexusmedia.com",
      icon: <FiMail className="text-primary" size={22} />,
    },
    {
      title: "Advertising",
      value: "advertising@nexusmedia.com",
      icon: <FiMail className="text-primary" size={22} />,
    },
    {
      title: "Phone",
      value: "+250 788 123 456",
      icon: <FiPhone className="text-primary" size={22} />,
    },
    {
      title: "Address",
      value: "Kigali Heights, KG 7 Ave\nKigali, Rwanda",
      icon: <FiMapPin className="text-primary" size={22} />,
    },
  ];

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-900/50 min-h-screen w-full flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column: Get in Touch */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-foreground/60 text-lg leading-relaxed mb-10 max-w-lg">
            Rooted in the energy of Kigali and focused on the future of Africa.
            Our team operates at the intersection of global standards and local
            insights, ensuring your business narrative is heard clearly in every
            time zone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1 shrink-0">{method.icon}</div>
                <div>
                  <h4 className="font-bold text-foreground leading-none mb-1">
                    {method.title}
                  </h4>
                  <p className="text-foreground/60 text-[15px] whitespace-pre-line leading-relaxed">
                    {method.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-border rounded-xl p-6 max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <FiClock className="text-primary" size={20} />
              <h4 className="font-bold text-foreground">Office Hours</h4>
            </div>
            <div className="space-y-2 text-foreground/60 text-sm">
              <p className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium text-foreground/80">
                  8:00 AM - 6:00 PM (CAT)
                </span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium text-foreground/80">
                  9:00 AM - 2:00 PM (CAT)
                </span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-foreground/60 italic">Closed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Send Us a Message */}
        <div>
          <div className="bg-white dark:bg-gray-800 border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-foreground text-2xl font-bold mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name & Email Row */}
              <div className="flex flex-col md:flex-row gap-5">
                <label className="flex flex-col flex-1">
                  <p className="text-foreground text-sm font-medium leading-normal pb-2">
                    Full Name
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary py-3 pl-11 pr-4 text-base transition-colors focus:outline-none"
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                    <FiUser
                      className="absolute left-3 top-3.5 text-foreground/50"
                      size={20}
                    />
                  </div>
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-foreground text-sm font-medium leading-normal pb-2">
                    Email Address
                  </p>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary py-3 pl-11 pr-4 text-base transition-colors focus:outline-none"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <FiMail
                      className="absolute left-3 top-3.5 text-foreground/50"
                      size={20}
                    />
                  </div>
                </label>
              </div>

              {/* Subject */}
              <label className="flex flex-col w-full">
                <p className="text-foreground text-sm font-medium leading-normal pb-2">
                  Subject
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What can we help you with?"
                    className="w-full rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary py-3 pl-11 pr-4 text-base transition-colors focus:outline-none"
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                  <FiMessageSquare
                    className="absolute left-3 top-3.5 text-foreground/50"
                    size={20}
                  />
                </div>
              </label>

              {/* Message */}
              <label className="flex flex-col w-full">
                <p className="text-foreground text-sm font-medium leading-normal pb-2">
                  Message
                </p>
                <textarea
                  rows={6}
                  placeholder="How can we help you today?"
                  className="w-full resize-none rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary p-4 text-base transition-colors focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </label>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 px-8 py-3 text-white font-bold transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                >
                  <span>Send Message</span>
                  <FiSend className="text-sm font-bold" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
