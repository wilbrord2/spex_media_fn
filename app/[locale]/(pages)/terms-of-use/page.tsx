"use client";
import React from "react";

const TermsAndConditions = () => {
  const sections = [
    {
      id: 1,
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using the Inama platform (including our website, mobile applications, and services), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      id: 2,
      title: "2. Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials (information or software) on Inama's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
      subpoints: [
        "Modify or copy the materials",
        "Use the materials for any commercial purpose or for any public display",
        "Attempt to decompile or reverse engineer any software contained on the website",
        "Remove any copyright or other proprietary notations from the materials",
        "Transfer the materials to another person or 'mirror' the materials on any other server",
      ],
    },
    {
      id: 3,
      title: "3. Disclaimer",
      content:
        "The materials on Inama's website are provided on an 'as is' basis. Inama makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
      id: 4,
      title: "4. Limitations",
      content:
        "In no event shall Inama or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Inama's website, even if Inama or an authorized representative has been notified orally or in writing of the possibility of such damage.",
    },
    {
      id: 5,
      title: "5. Accuracy of Materials",
      content:
        "The materials appearing on Inama's website could include technical, typographical, or photographic errors. Inama does not warrant that any of the materials on its website are accurate, complete, or current. Inama may make changes to the materials contained on its website at any time without notice.",
    },
    {
      id: 6,
      title: "6. Materials and Content",
      content:
        "Inama has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Inama of the site. Use of any such linked website is at the user's own risk.",
    },
    {
      id: 7,
      title: "7. Modifications",
      content:
        "Inama may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.",
    },
    {
      id: 8,
      title: "8. Governing Law",
      content:
        "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Inama operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
    },
    {
      id: 9,
      title: "9. User Accounts and Registrations",
      content:
        "If you create an account on Inama, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must notify Inama immediately of any unauthorized use of your account.",
    },
    {
      id: 10,
      title: "10. User Generated Content",
      content:
        "By posting, uploading, or submitting content to Inama (including but not limited to reviews, articles, books, events, or any other materials), you grant Inama a non-exclusive, royalty-free, perpetual license to use, reproduce, modify, publish, and distribute such content in any media. You represent and warrant that you own or have the necessary rights to the content you submit.",
    },
    {
      id: 11,
      title: "11. Intellectual Property Rights",
      content:
        "All content included on this website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on this website, is the property of Inama or its content suppliers and protected by international copyright laws.",
    },
    {
      id: 12,
      title: "12. Payment and Transactions",
      content:
        "For any paid services or products offered through Inama, you agree to pay all charges and fees that you incur, as well as all applicable taxes. Inama reserves the right to change its fees and billing methods at any time. Refund requests must be made in accordance with our refund policy.",
    },
    {
      id: 13,
      title: "13. Prohibited Activities",
      content:
        "You agree not to engage in any of the following prohibited activities:",
      subpoints: [
        "Harassing or causing distress or inconvenience to any person",
        "Obscene or abusive language or content",
        "Disrupting the normal flow of dialogue within our platform",
        "Commercial solicitation or spam",
        "Infringement of intellectual property rights",
        "Illegal activities or violation of any laws",
        "Creating multiple accounts to circumvent restrictions",
      ],
    },
    {
      id: 14,
      title: "14. Suspension and Termination",
      content:
        "Inama may suspend or terminate your account and access to the platform at any time, in its sole discretion, for violation of these terms or for any other reason, with or without notice.",
    },
    {
      id: 15,
      title: "15. Privacy",
      content:
        "Your use of Inama is also governed by our Privacy Policy. Please review our Privacy Policy to understand our privacy practices.",
    },
    {
      id: 16,
      title: "16. Contact Information",
      content:
        "If you have any questions about these Terms and Conditions, please contact us through the contact form on our website or through the email address listed in our contact information.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="mb-10 lg:py-10 w-full bg-linear-to-br from-slate-900 via-slate-800 to-amber-900">
        <div className="container mx-auto text-center w-full flex flex-col justify-center items-center h-full gap-4 p-4 md:p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            Please read these terms and conditions carefully before using the
            Inama platform. By accessing and using our services, you agree to be
            bound by these terms.
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

          {/* Additional Info Box */}
          <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Important Notice
            </h3>
            <p className="text-gray-700">
              These Terms and Conditions constitute the entire agreement between
              you and Inama regarding your use of the platform. If any provision
              of these terms is found to be invalid or unenforceable, the
              remaining provisions shall remain in full force and effect.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Have questions about our terms? Contact us anytime.
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

export default TermsAndConditions;
