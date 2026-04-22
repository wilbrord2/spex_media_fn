"use client";
import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "1. Introduction",
      content:
        "Inama ('we', 'us', 'our', or 'Company') operates the Inama website and platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.",
    },
    {
      id: 2,
      title: "2. Information Collection and Use",
      content:
        "We collect several different types of information for various purposes to provide and improve our Service to you.",
      subsections: [
        {
          subtitle: "2.1 Types of Data Collected:",
          points: [
            "Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ('Personal Data'). This may include, but is not limited to:",
            "Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City, Cookies and Usage Data",
            "Usage Data: We may also collect information about how the Service is accessed and used ('Usage Data'). This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "3. Use of Data",
      content: "Inama uses the collected data for various purposes:",
      subpoints: [
        "To provide and maintain our Service",
        "To notify you about changes to our Service",
        "To allow you to participate in interactive features of our Service when you choose to do so",
        "To provide customer support and respond to your inquiries",
        "To gather analysis and valuable information so that we can improve our Service",
        "To monitor the usage of our Service",
        "To detect, prevent and address technical and security issues",
        "To provide you with news, special offers and general information about other goods, services and events which we offer",
      ],
    },
    {
      id: 4,
      title: "4. Security of Data",
      content:
        "The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.",
    },
    {
      id: 5,
      title: "5. Cookies",
      content:
        "We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.",
      subsections: [
        {
          subtitle: "5.1 Types of Cookies:",
          points: [
            "Session Cookies: Used to remember your login information and preferences during your visit",
            "Persistent Cookies: Used to remember your preferences and settings for future visits",
            "Analytics Cookies: Used to understand how you use our Service and improve performance",
            "Marketing Cookies: Used to deliver targeted advertisements and measure campaign effectiveness",
          ],
        },
      ],
    },
    {
      id: 6,
      title: "6. Third-Party Links",
      content:
        "Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.",
    },
    {
      id: 7,
      title: "7. Changes to This Privacy Policy",
      content:
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
    },
    {
      id: 8,
      title: "8. Information Sharing and Disclosure",
      content: "We may share your information in the following situations:",
      subpoints: [
        "With Service Providers: We may share your information with companies that assist us in operating our website, conducting our business, or serving our users",
        "For Business Transfers: If we are involved in a merger, acquisition or asset sale, your Personal Data may be transferred as part of that transaction",
        "With Your Consent: We may disclose your Personal Data for any other purpose with your consent",
        "Legal Requirements: We may disclose your information when required by law, court order, or government authority",
      ],
    },
    {
      id: 9,
      title: "9. Data Retention",
      content:
        "We will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations.",
    },
    {
      id: 10,
      title: "10. Your Data Protection Rights",
      content:
        "You have the following rights regarding your personal information:",
      subpoints: [
        "The right to access your Personal Data",
        "The right to request correction of inaccurate Personal Data",
        "The right to request deletion of your Personal Data",
        "The right to restrict processing of your Personal Data",
        "The right to data portability",
        "The right to object to processing of your Personal Data",
        "The right to withdraw consent at any time",
      ],
    },
    {
      id: 11,
      title: "11. User Accounts",
      content:
        "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
    },
    {
      id: 12,
      title: "12. Children's Privacy",
      content:
        "Our Service does not address anyone under the age of 18 ('Children'). We do not knowingly collect personally identifiable information from anyone under 18 years of age. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from a child without parental consent, we take steps to remove such information from our servers.",
    },
    {
      id: 13,
      title: "13. California Privacy Rights (CCPA)",
      content:
        "If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with specific rights regarding your personal information. These rights include the right to know what personal information is collected, used, shared or sold, the right to delete personal information collected, and the right to opt-out of the sale or sharing of personal information.",
    },
    {
      id: 14,
      title: "14. European Data Protection Rights (GDPR)",
      content:
        "If you are located in the EU, you are entitled to the following rights under the General Data Protection Regulation (GDPR): right of access, right to rectification, right to erasure, right to restrict processing, right to data portability, right to object, and rights related to automated decision making and profiling.",
    },
    {
      id: 15,
      title: "15. Marketing Communications",
      content:
        "We would like to send you information about products and services of ours that we think you might like. If you have agreed to receive marketing, you may always opt out at a later time. You have the right at any time to stop us from contacting you for marketing purposes. You can unsubscribe from our marketing emails by clicking the 'unsubscribe' link in any email or by contacting us directly.",
    },
    {
      id: 16,
      title: "16. Payment Information",
      content:
        "When you make a purchase through our Service, your payment information is processed by third-party payment processors. We do not store your full credit card information. These payment processors are bound by the PCI Data Security Standard, which ensures the secure handling of payment data.",
    },
    {
      id: 17,
      title: "17. Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us through the contact form on our website or by emailing us at the contact information provided in our Contact Us page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-10 lg:py-10 w-full bg-linear-to-br from-slate-900 via-slate-800 to-amber-900">
        <div className="container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-4 md:p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and otherwise handle your information when
            you use our platform.
          </p>
          <p className="text-white/70 text-sm mt-4">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          {sections.map((section) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {section.content}
              </p>

              {section.subsections && (
                <div className="ml-4 space-y-4 mb-4">
                  {section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">
                        {subsection.subtitle}
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {subsection.points.map((point, pointIndex) => (
                          <li
                            key={pointIndex}
                            className="text-gray-700 leading-relaxed"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {section.subpoints && (
                <ul className="list-disc list-inside space-y-2 ml-4">
                  {section.subpoints.map((point, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Important Notice Box */}
          <div className="mt-12 p-6 bg-green-50 border-l-4 border-green-500 rounded">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Your Privacy Matters
            </h3>
            <p className="text-gray-700 mb-3">
              We are committed to protecting your personal information and your
              right to privacy. We take the protection of your data seriously
              and implement appropriate technical and organizational measures to
              ensure the security of your information.
            </p>
            <p className="text-gray-700">
              If you have any privacy concerns or believe we have not adhered to
              this Privacy Policy, please do not hesitate to contact us
              immediately.
            </p>
          </div>

          {/* Data Rights Summary Box */}
          <div className="mt-6 p-6 bg-purple-50 border-l-4 border-purple-500 rounded">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Your Data Rights at a Glance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Access your data",
                "Correct inaccuracies",
                "Delete your data",
                "Restrict processing",
                "Data portability",
                "Opt-out of marketing",
              ].map((right, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-purple-600 font-bold mr-3">✓</span>
                  <span className="text-gray-700">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Have questions about our privacy practices? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
