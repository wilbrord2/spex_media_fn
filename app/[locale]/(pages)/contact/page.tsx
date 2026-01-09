"use client";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const ContactUsPage = () => {
  return (
    <div>
      {/* Header */}
      <div className="">
        <div className="container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-16">
          <h1 className="text-4xl md:text-5xl font-extrabold  mb-4">
            Connect With Nexus
          </h1>
          <p className="text-foreground max-w-3xl mx-auto text-lg">
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
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-foreground/60"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-foreground/60"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Subject
              </label>
              <input
                type="text"
                placeholder="What can we help you with?"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-foreground/60"
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-foreground/60 resize-none"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary/80 hover:bg-primary text-white font-bold rounded-lg transition-colors shadow-sm mt-4 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
