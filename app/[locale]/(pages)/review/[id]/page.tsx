"use client";
import { Article, ArticlesData, CommentData } from "@/app/constants";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  date: string;
}

const ContentDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [content, setContent] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>(CommentData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const Content = ArticlesData.find((item) => item.id === parseInt(id));
    if (Content) {
      setContent(Content);
      const related = ArticlesData.filter(
        (item) => item.category === Content.category && item.id !== Content.id
      ).slice(0, 3);
      setRelatedArticles(related);
    }
    setIsLoading(false);
  }, [id]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.comment) {
      const newComment: Comment = {
        id: comments.length + 1,
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      setComments([newComment, ...comments]);
      setFormData({ name: "", email: "", phone: "", comment: "" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-gray-600 dark:text-gray-300 text-lg">
          Article not found
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Image Section */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <Image
          src={content.img}
          alt={content.title}
          fill
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white px-4 text-center">
              {content.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Header Info */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold rounded-full">
              {content.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {content.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {content.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 font-semibold">
                {content.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {content.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {content.description}
          </p>

          {/* Additional Content Sections */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Key Insights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Related Content Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              About the Author
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {content.name} is an experienced journalist and analyst
              specializing in African business and technology trends.
            </p>
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
          >
            ← Back to Articles
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Leave a Comment
            </h3>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comment *
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="Share your thoughts..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
              >
                Post Comment
              </button>
            </form>
          </div>

          {/* Recent Comments */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Comments
            </h3>
            {comments.slice(0, 3).map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-300 font-semibold">
                      {comment.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comment.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.date}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => router.push(`/review/${article.id}`)}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/20 transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={article.img}
                      alt={article.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {article.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ContentDetails;
