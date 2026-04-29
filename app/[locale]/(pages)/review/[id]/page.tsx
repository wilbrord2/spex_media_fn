"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import {
  getContentById,
  getComments,
  postComment,
  getContentList,
  BackendError,
} from "@/app/actions/review";
import { ContentItem, CommentRes, CommentInput } from "@/lib/dto";
import { toast } from "sonner";
import {
  FiShare2,
  FiClock,
  FiCalendar,
  FiChevronRight,
  FiArrowUp,
  FiLoader,
  FiCheck,
} from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

import { AD_SLOTS } from "@/app/lib/adsenseConfig";
import GoogleDisplayAd from "@/app/[locale]/components/ads/GoogleDisplayAd";
import GoogleRectangleAd from "@/app/[locale]/components/ads/GoogleRectangleAd";

const ContentDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const contentId = parseInt(id);

  const [content, setContent] = useState<ContentItem | null>(null);
  const [comments, setComments] = useState<CommentRes[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function loadPageData() {
      setIsLoading(true);
      const [article, articleComments, allContent] = await Promise.all([
        getContentById(contentId),
        getComments(contentId),
        getContentList(1),
      ]);

      if (article) {
        setContent(article);
        setComments(articleComments);
        if (allContent) {
          const related = allContent.contentList
            .filter(
              (item) =>
                item.categoryId === article.categoryId &&
                item.id !== article.id,
            )
            .slice(0, 3);
          setRelatedArticles(related);
        }
      }
      setIsLoading(false);
    }
    loadPageData();
  }, [contentId]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const commentData: CommentInput = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      comment: formData.comment,
    };

    const result = await postComment(contentId, commentData);

    if (!(result as BackendError).error) {
      const updatedComments = await getComments(contentId);
      setComments(updatedComments);
      setFormData({ name: "", email: "", phone: "", comment: "" });
      toast.success("Comment added");
    } else {
      toast.error((result as BackendError).message || "Failed to post comment");
    }
    setIsSubmitting(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="text-center space-y-4">
          <FiLoader className="animate-spin text-amber-700 mx-auto" size={40} />
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    );

  if (!content)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-white dark:bg-gray-950">
        <div className="text-lg text-gray-900 dark:text-white">
          Article not found
        </div>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-linear-to-r from-amber-700 to-amber-800 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          Go Back
        </button>
      </div>
    );

  const estimatedReadTime = Math.ceil((content.content?.length || 0) / 200);
  const publishDate = new Date(content.createdAt);
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out: ${content.title}`;

  const shareOnSocial = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section with Overlay */}
      <div className="relative w-full h-[400px] md:h-[70vh] overflow-hidden group">
        <Image
          src={content.coverImage}
          alt={content.title}
          fill
          className="object-contain object-top group-hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-2 bg-amber-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                {content.category.name}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {content.title}
            </h1>
          </div>
        </div>
      </div>
      <GoogleRectangleAd
        adSlot={AD_SLOTS.articleTopBanner}
        width={300}
        height={250}
        className="mb-8"
      />
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Metadata Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-amber-600" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-amber-600" />
              <span>{estimatedReadTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span>{comments.length} comments</span>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: content.title,
                  text: shareText,
                  url: shareUrl,
                });
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition text-gray-700 dark:text-gray-300 font-medium"
          >
            <FiShare2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Article Content */}
        <article className="my-12 prose prose-lg dark:prose-invert max-w-none">
          <div
            className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </article>

        {/* Advertisement Section - After Article Content */}
        <GoogleDisplayAd
          adSlot={AD_SLOTS.articleMiddle}
          adFormat="auto"
          fullWidth={true}
          className="my-8"
        />

        {/* Social Share Section */}
        <div className="my-12 py-8 px-8 bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200 dark:border-amber-900/30">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiShare2 className="text-amber-600" />
            Share This Article
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => shareOnSocial("facebook")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition text-blue-600 dark:text-blue-400 font-medium"
            >
              <FaFacebook size={18} />
              <span className="hidden sm:inline">Facebook</span>
            </button>
            <button
              onClick={() => shareOnSocial("twitter")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition text-blue-400 dark:text-blue-300 font-medium"
            >
              <FaTwitter size={18} />
              <span className="hidden sm:inline">Twitter</span>
            </button>
            <button
              onClick={() => shareOnSocial("linkedin")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition text-blue-700 dark:text-blue-400 font-medium"
            >
              <FaLinkedin size={18} />
              <span className="hidden sm:inline">LinkedIn</span>
            </button>
            <button
              onClick={() => shareOnSocial("whatsapp")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition text-green-600 dark:text-green-400 font-medium"
            >
              <FaWhatsapp size={18} />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="my-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 flex items-center gap-3">
            <span className="text-amber-600">{comments.length}</span>
            <span>Comments</span>
          </h2>

          {/* Advertisement Before Comments */}
          <GoogleDisplayAd
            adSlot={AD_SLOTS.articleBottom}
            adFormat="auto"
            fullWidth={true}
            className="mb-12"
          />

          {/* Comment Form */}
          <div className="mb-12 p-8 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Share Your Thoughts
            </h3>
            <form onSubmit={handleSubmitComment} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition md:col-span-2"
                />
              </div>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleFormChange}
                required
                rows={5}
                placeholder="Share your thoughts, insights, and feedback..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-linear-to-r from-amber-700 to-amber-800 text-white rounded-lg hover:shadow-lg disabled:opacity-60 font-bold transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <FiCheck />
                    Post Comment
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.slice(0, 5).map((comment) => (
                <div
                  key={comment.id}
                  className="p-6 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {comment.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="grow">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comment.fullName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="my-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            {/* Advertisement Before Related Articles */}
            <div className="mb-12">
              <GoogleRectangleAd
                adSlot={AD_SLOTS.articleSidebar}
                width={300}
                height={250}
                className="mb-8"
              />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10">
              More From {content.category.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => router.push(`/review/${article.id}`)}
                  className="group cursor-pointer flex flex-col overflow-hidden bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="grow p-6 flex flex-col">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {article.category.name}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 grow line-clamp-2">
                      {article.content?.substring(0, 80) || ""}...
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <FiChevronRight className="text-amber-600 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="my-16 p-10 bg-linear-to-r from-primary  to-amber-900 rounded-2xl text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Never Miss an Insight
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl">
              Subscribe to our newsletter and get premium business insights
              delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-amber-300 focus:outline-none grow"
              />
              <button className="px-8 py-3 bg-white text-amber-700 font-bold rounded-lg hover:bg-gray-100 transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
