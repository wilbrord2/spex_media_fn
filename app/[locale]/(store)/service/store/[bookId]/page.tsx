"use client";

import PdfViewer from "@/app/[locale]/components/model/PdfViewer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useContext, Suspense } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  FiArrowRight,
  FiChevronDown,
  FiDownload,
  FiEye,
  FiHeart,
  FiShare2,
  FiSmartphone,
  FiTruck,
  FiZoomIn,
  FiLoader,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Book, getBookById, rateBook, commentOnBook } from "@/app/actions/book";
import { CartContext } from "@/app/[locale]/context";
import { CartBook } from "@/app/[locale]/context";

// --- Types & Constants ---
type BookFormat = "platform" | "digital" | "physical";

interface FormatOption {
  id: BookFormat;
  title: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const NexusBookDetailsContent: React.FC = () => {
  const params = useParams();
  const bookId = Number(params.bookId);
  const { addToCart } = useContext(CartContext);

  // --- States ---
  const [book, setBook] = useState<Partial<Book> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>("platform");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // New API States
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const fetchBook = async () => {
    const data = await getBookById(bookId);
    if (data) setBook(data);
    setLoading(false);
  };

  useEffect(() => {
    if (bookId) fetchBook();
  }, [bookId]);

  // --- Handlers ---
  const handleRate = async (rating: number) => {
    setIsRating(true);
    const res = await rateBook(bookId, rating);
    if (res.success) {
      toast.success("Thank you for your rating!");
      setUserRating(rating);
      fetchBook(); // Refresh average
    } else {
      toast.error(res.error || "Failed to rate");
    }
    setIsRating(false);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsCommenting(true);
    const res = await commentOnBook(bookId, comment);
    if (res.success) {
      toast.success("Comment posted");
      setComment("");
      fetchBook(); // Refresh comments list
    } else {
      toast.error(res.error || "Failed to post comment");
    }
    setIsCommenting(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-primary" size={32} />
      </div>
    );
  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/40">Book not found.</p>
      </div>
    );

  const FORMATS: FormatOption[] = [
    {
      id: "platform",
      title: "Read on Platform",
      description: "Instant access via Inama Reader.",
      price: book.priceReadOnPlatform || 9.99,
      icon: <FiSmartphone size={20} />,
    },
    {
      id: "digital",
      title: "Digital Download",
      description: "PDF & EPUB (DRM-Free).",
      price: book.priceDigitalDownload || 14.99,
      icon: <FiDownload size={20} />,
    },
    {
      id: "physical",
      title: "Physical Book",
      description: "Hardcover. Ships in 3 days.",
      price: book.pricePhysicalBook || 24.99,
      icon: <FiTruck size={20} />,
    },
  ];

  const activeFormatData = FORMATS.find((f) => f.id === selectedFormat);
  const pdfUrl = book.manuscript || "/books/book1.pdf";

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: book.title, url });
      } catch (err) {
        if ((err as Error).name !== "AbortError") copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) =>
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Link copied to clipboard!"));

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 pb-20">
      <PdfViewer
        pdfUrl={pdfUrl}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        activeFormatPrice={activeFormatData?.price}
      />

      <main className="relative w-full overflow-x-hidden">
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden -z-10 pointer-events-none">
          <div
            className="w-full h-full bg-cover bg-center blur-[100px] opacity-10 dark:opacity-20 scale-110"
            style={{ backgroundImage: `url(${book.coverImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background" />
        </div>

        <div className="max-w-[1500px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-2 py-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">
            <Link
              href="/service/store"
              className="hover:text-primary transition-colors"
            >
              Bookstore
            </Link>
            <span>/</span>
            <Link
              href={`/service/store?category=${book.category?.name}#browse-catalog`}
              className="hover:text-primary transition-colors"
            >
              {book.category?.name || "Uncategorized"}
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {book.title?.slice(0, 15)}...
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-2">
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center lg:items-start gap-6">
              <div className="relative group w-full max-w-[320px] aspect-2/3 rounded-2xl shadow-2xl overflow-hidden bg-foreground/5 border border-foreground/5 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={book.coverImage!}
                  alt={book.title!}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full p-4 hover:bg-white/30 transition-colors"
                  >
                    <FiZoomIn size={24} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex w-full max-w-[320px] items-center justify-center rounded-xl h-14 bg-foreground/5 border border-foreground/10 text-foreground gap-3 hover:bg-foreground/10 transition-all group shadow-sm"
              >
                <FiEye className="text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold tracking-wide">
                  Look Inside (Free 10%)
                </span>
              </button>

              <div className="flex gap-4 w-full max-w-[320px]">
                <ActionButton
                  icon={<FiShare2 />}
                  label="Share"
                  onClick={handleShare}
                />
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-8">
              <div className="flex flex-col gap-4 border-b border-foreground/10 pb-8">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] max-w-4xl">
                  {book.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/40 text-sm">By</span>
                    <a
                      href="#"
                      className="text-primary font-bold hover:underline text-lg"
                    >
                      {book.authorName}
                    </a>
                  </div>
                  {book.numberOfBooksInStock! > 50 && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                      Best Seller
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const rating = book.averageRating || 0;
                      const index = i + 1;

                      return (
                        <span key={i}>
                          {rating >= index ? (
                            <FaStar />
                          ) : rating >= index - 0.5 ? (
                            <FaStarHalfAlt />
                          ) : (
                            <FaStar className="opacity-20" />
                          )}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold tabular-nums">
                      {Number(book.averageRating || 0).toFixed(1)}
                    </span>
                    <span className="text-sm text-foreground/40">
                      {book.ratings?.length || 0} Review(s)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-w-3xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                  Synopsis
                </h3>
                <div
                  className={`text-foreground/60 leading-relaxed text-base transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: book.description! }}
                  />
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary font-bold text-sm flex items-center gap-1 hover:underline w-fit"
                >
                  {isExpanded ? "Read less" : "Read more"}
                  <FiChevronDown
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                  Select Format
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {FORMATS.map((format) => (
                    <FormatCard
                      key={format.id}
                      format={format}
                      isActive={selectedFormat === format.id}
                      onClick={() => setSelectedFormat(format.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-foreground/3 border border-foreground/5 shadow-inner">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">
                    Price Point
                  </p>
                  <p className="text-4xl font-black tracking-tighter">
                    ${activeFormatData?.price}
                  </p>
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      ...book,
                      image: book.coverImage,
                      price: activeFormatData?.price,
                    } as CartBook)
                  }
                  className="w-full sm:w-auto px-12 h-16 bg-primary text-primary-foreground font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  Add to Cart <FiArrowRight />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-foreground/10">
                <Spec
                  label="Publisher"
                  value={book.authorName! || "Inama Press"}
                />
                <Spec
                  label="Released"
                  value={new Date(book.createdAt!).toLocaleDateString()}
                />
                <Spec
                  label="Stock"
                  value={book.numberOfBooksInStock!.toString()}
                />
                <Spec label="Language" value={book.language || "English"} />
              </div>

              {/* COMMUNITY: RATING & COMMENTS SECTION */}
              <div className="mt-12 pt-12 border-t border-foreground/10 grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Left: Rating & Submit Comment */}
                <div className="xl:col-span-5 space-y-8">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-4">
                      Rate this Work
                    </h3>
                    <div className="flex items-center gap-4 bg-foreground/3 p-6 rounded-2xl border border-foreground/5">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            disabled={isRating}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRate(star)}
                            className="text-2xl transition-all hover:scale-125 disabled:opacity-50"
                          >
                            {star <= (hoverRating || userRating) ? (
                              <FaStar className="text-amber-500" />
                            ) : (
                              <FaRegStar className="text-foreground/20" />
                            )}
                          </button>
                        ))}
                      </div>
                      <span className="text-[10px] font-black uppercase text-foreground/40 tracking-widest">
                        {isRating
                          ? "Saving..."
                          : userRating > 0
                            ? "Your Rating"
                            : "Tap to rate"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-4">
                      Leave a Thought
                    </h3>
                    <form onSubmit={handleComment} className="relative">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What did you think of this book?"
                        className="w-full bg-foreground/3 border border-foreground/5 rounded-2xl p-4 text-sm font-medium focus:ring-1 ring-primary min-h-[120px] transition-all"
                      />
                      <button
                        type="submit"
                        disabled={isCommenting || !comment.trim()}
                        className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:grayscale"
                      >
                        {isCommenting ? (
                          <FiLoader className="animate-spin" />
                        ) : (
                          <FiSend />
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right: Comments List */}
                <div className="xl:col-span-7">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black uppercase tracking-tighter">
                      Reader Reviews
                    </h3>
                    <span className="text-[10px] font-black px-3 py-1 bg-foreground/5 rounded-full uppercase tracking-widest">
                      {book.comments?.length || 0} Comments
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {book.comments?.length === 0 ? (
                      <div className="py-20 text-center border-2 border-dashed border-foreground/5 rounded-3xl">
                        <FiMessageSquare
                          className="mx-auto text-foreground/10 mb-2"
                          size={32}
                        />
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                          Be the first to comment
                        </p>
                      </div>
                    ) : (
                      book.comments
                        ?.map((c, i) => (
                          <div
                            key={i}
                            className="bg-foreground/2 p-5 rounded-2xl border border-foreground/5 hover:border-foreground/10 transition-all"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-sm font-black uppercase tracking-tight">
                                {c.fullName || "Inama Reader"}
                              </p>
                              <span className="text-[9px] font-black text-foreground/20 uppercase">
                                Verified Member
                              </span>
                            </div>
                            <p className="text-sm text-foreground/60 leading-relaxed font-medium italic">
                              "{c.comment}"
                            </p>
                          </div>
                        ))
                        .reverse()
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---
const ActionButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-foreground/5 transition-all group active:scale-95"
  >
    <div className="size-11 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-sm group-hover:text-primary group-hover:border-primary/30 transition-all">
      {icon}
    </div>
    <span className="text-foreground/40 text-[9px] font-black uppercase tracking-widest">
      {label}
    </span>
  </button>
);

const FormatCard = ({
  format,
  isActive,
  onClick,
}: {
  format: FormatOption;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`cursor-pointer h-full p-5 rounded-2xl border-2 transition-all flex flex-col gap-4 ${isActive ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-foreground/5 bg-foreground/2 hover:border-foreground/20"}`}
  >
    <div className="flex justify-between items-start">
      <div
        className={`p-2.5 rounded-xl ${isActive ? "bg-primary text-primary-foreground" : "bg-foreground/5 text-foreground/40"}`}
      >
        {format.icon}
      </div>
      <div
        className={`size-5 rounded-full border-2 flex items-center justify-center ${isActive ? "border-primary" : "border-foreground/10"}`}
      >
        {isActive && (
          <div className="size-2.5 bg-primary rounded-full animate-in zoom-in-50" />
        )}
      </div>
    </div>
    <div>
      <h4 className="font-bold text-sm">{format.title}</h4>
      <p className="text-[11px] text-foreground/40 mt-1 leading-tight">
        {format.description}
      </p>
    </div>
    <div
      className={`mt-auto pt-4 border-t ${isActive ? "border-primary/20" : "border-foreground/5"}`}
    >
      <span className="text-lg font-black">${format.price}</span>
    </div>
  </div>
);

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-1">
      {label}
    </p>
    <p className="text-sm font-bold">{value}</p>
  </div>
);

export default function NexusBookDetails() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <FiLoader className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <NexusBookDetailsContent />
    </Suspense>
  );
}
