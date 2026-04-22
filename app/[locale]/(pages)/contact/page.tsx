"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiUser,
  FiSend,
  FiMessageSquare,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

// Validation schema
const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must not exceed 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactUsPage = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-10 lg:py-10 w-full bg-linear-to-br from-slate-900 via-slate-800 to-amber-900">
        <div className="container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Connect With Inama
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
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Thank you for your message! We will get back to you soon.",
        });
        reset();
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message || "Failed to send message. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "An error occurred while sending your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      title: "General Inquiries",
      value: "hello@inama.rw",
      icon: <FiMail className="text-primary" size={22} />,
    },
    {
      title: "Editorial",
      value: "editorial@inama.rw",
      icon: <FiMail className="text-primary" size={22} />,
    },
    {
      title: "Advertising",
      value: "advertising@inama.rw",
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

  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-900/50 min-h-screen w-full flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
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

            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <FiCheckCircle
                    className="text-green-600 dark:text-green-400 shrink-0 mt-0.5"
                    size={20}
                  />
                ) : (
                  <FiAlertCircle
                    className="text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                    size={20}
                  />
                )}
                <p
                  className={`text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "text-green-800 dark:text-green-300"
                      : "text-red-800 dark:text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
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
                      {...register("fullName")}
                      className={`w-full rounded-lg bg-background border text-foreground placeholder:text-foreground/50 focus:ring-1 focus:ring-primary py-3 pl-11 pr-4 text-base transition-colors focus:outline-none ${
                        errors.fullName
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                    />
                    <FiUser
                      className="absolute left-3 top-3.5 text-foreground/50"
                      size={20}
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-red-500 text-xs font-medium mt-1">
                      {errors.fullName.message}
                    </span>
                  )}
                </label>
                <label className="flex flex-col flex-1">
                  <p className="text-foreground text-sm font-medium leading-normal pb-2">
                    Email Address
                  </p>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      {...register("email")}
                      className={`w-full rounded-lg bg-background border text-foreground placeholder:text-foreground/50 focus:ring-1 focus:ring-primary py-3 pl-11 pr-4 text-base transition-colors focus:outline-none ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                    />
                    <FiMail
                      className="absolute left-3 top-3.5 text-foreground/50"
                      size={20}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-xs font-medium mt-1">
                      {errors.email.message}
                    </span>
                  )}
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
                    {...register("subject")}
                    className={`w-full rounded-lg bg-background border text-foreground placeholder:text-foreground/50 focus:ring-1 focus:ring-primary py-3 pl-11 pr-4 text-base transition-colors focus:outline-none ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  <FiMessageSquare
                    className="absolute left-3 top-3.5 text-foreground/50"
                    size={20}
                  />
                </div>
                {errors.subject && (
                  <span className="text-red-500 text-xs font-medium mt-1">
                    {errors.subject.message}
                  </span>
                )}
              </label>

              {/* Message */}
              <label className="flex flex-col w-full">
                <p className="text-foreground text-sm font-medium leading-normal pb-2">
                  Message
                </p>
                <textarea
                  rows={6}
                  placeholder="How can we help you today?"
                  {...register("message")}
                  className={`w-full resize-none rounded-lg bg-background border text-foreground placeholder:text-foreground/50 focus:ring-1 focus:ring-primary p-4 text-base transition-colors focus:outline-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-primary"
                  }`}
                />
                {errors.message && (
                  <span className="text-red-500 text-xs font-medium mt-1">
                    {errors.message.message}
                  </span>
                )}
              </label>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-primary/60 disabled:cursor-not-allowed px-8 py-3 text-white font-bold transition-all transform active:scale-95 shadow-lg shadow-primary/20"
                >
                  <span>{isLoading ? "Sending..." : "Send Message"}</span>
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
