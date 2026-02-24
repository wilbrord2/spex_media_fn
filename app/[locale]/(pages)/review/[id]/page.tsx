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
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  if (!content)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg">Article not found</div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-700 text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="mt-16 min-h-screen max-w-5xl bg-white dark:bg-gray-950 relative mx-auto">
      {/* Hero Image */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-md">
        <Image
          src={content.coverImage}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold rounded-full uppercase tracking-wider">
            {content.category.name}
          </span>
          <span className="ml-4 text-sm text-gray-500 font-medium">
            {new Date(content.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </article>

        {/* Comment Form */}
        <div className="mt-32 bg-gray-50 dark:bg-gray-900/50 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6">Leave a Comment</h3>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                placeholder="Name"
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="Email"
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                placeholder="Phone Number"
                className="w-full p-2 border rounded dark:bg-gray-800"
              />
            </div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleFormChange}
              required
              rows={4}
              placeholder="Your thoughts..."
              className="w-full p-2 border rounded dark:bg-gray-800"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50 font-bold transition"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>

        {/* Recent Comments */}
        <div className="mt-12 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Comments ({comments.length})
          </h3>
          {comments.slice(0, 3).map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center font-bold">
                  {comment.fullName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {comment.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {comment.comment}
              </p>
            </div>
          ))}
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
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded mb-2 uppercase">
                      {article.category.name}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
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
