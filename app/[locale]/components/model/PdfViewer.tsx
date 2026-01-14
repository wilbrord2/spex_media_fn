"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiMinimize,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiLoader,
} from "react-icons/fi";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false },
);
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

interface PdfViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  activeFormatPrice?: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  isOpen,
  onClose,
  activeFormatPrice,
}) => {
  useEffect(() => {
    import("react-pdf").then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  const [previewPage, setPreviewPage] = useState(1);
  const [totalPages, setTotalPages] = useState(340);
  const [isLoadingPDF, setIsLoadingPDF] = useState(true);
  const [scale, setScale] = useState(1.0); // Zoom level
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const getPageWidth = useCallback(() => {
    if (typeof window === "undefined") return 600;
    return Math.min(window.innerWidth - 40, 700);
  }, []);

  const [pageWidth, setPageWidth] = useState(getPageWidth());

  useEffect(() => {
    // Reset state when modal closes
    if (!isOpen) {
      setPreviewPage(1);
      setScale(1.0);
      setIsLoadingPDF(true);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => setPageWidth(getPageWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getPageWidth]);

  const maxPreviewPages = Math.ceil(totalPages * 0.1);
  const canViewPage = previewPage < maxPreviewPages;

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setTotalPages(numPages);
      setIsLoadingPDF(false);
    },
    [],
  );

  const goToNextPage = () => {
    setPreviewPage((prev) => Math.min(prev + 1, maxPreviewPages));
  };

  const goToPrevPage = () => {
    setPreviewPage((prev) => Math.max(prev - 1, 1));
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0)); // Max zoom 3.0
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 ${isFullscreen ? "" : "md:p-10"}`}
      ref={viewerRef}
    >
      <div
        className={`relative w-full h-full bg-background flex flex-col shadow-2xl overflow-hidden ${isFullscreen ? "" : "md:max-w-5xl md:rounded-3xl border border-white/10"} animate-in fade-in zoom-in-95 duration-300`}
      >
        {/* Slim Header */}
        <div className="p-1 flex items-center justify-between px-5 border-b border-foreground/10 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-sm md:text-base font-bold tracking-tight">
              Nexus <span className="text-primary">Preview</span>
            </h2>
          </div>
          <p className="flex-1 hidden md:block text-[10px] font-bold text-primary uppercase tracking-widest ml-4 text-center">
            The Future of Digital Media
          </p>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-foreground/5 rounded-full transition-colors"
            title="Close Preview"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-auto bg-[#1a1a1a] flex justify-center items-center p-4 scrollbar-hide">
          {isLoadingPDF && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background/20">
              <FiLoader className="animate-spin text-primary mb-4" size={32} />
              <p className="text-xs font-black uppercase tracking-widest text-white/40">
                Decrypting PDF...
              </p>
            </div>
          )}

          {canViewPage ? (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={null}
              error={
                <p className="text-red-500 text-center">
                  Failed to load PDF. Please try again.
                </p>
              }
            >
              <Page
                pageNumber={previewPage}
                width={pageWidth * scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-2xl border border-white/5"
              />
            </Document>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-10 bg-background rounded-3xl border border-white/5 max-w-md mx-auto my-auto animate-in fade-in slide-in-from-bottom-4">
              <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <FiZoomIn size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Preview Limit Reached</h3>
              <p className="text-sm text-foreground/50 mb-8 leading-relaxed">
                You&apos;ve enjoyed 10% of this manuscript. Purchase the full
                version to unlock all {totalPages} pages.
              </p>
              <button className="w-full py-4 bg-primary text-primary-foreground font-black rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20">
                Unlock Full Book — ${activeFormatPrice?.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Slim Footer with Controls */}
        <div className="p-1 flex items-center justify-between px-5 border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="p-1.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-all disabled:opacity-30"
              title="Zoom Out"
            >
              <FiZoomOut size={16} />
            </button>
            <span className="text-sm font-semibold">
              {(scale * 100).toFixed(0)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={scale >= 3.0}
              className="p-1.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-all disabled:opacity-30"
              title="Zoom In"
            >
              <FiZoomIn size={16} />
            </button>
          </div>

          {/* Page Navigation */}
          {canViewPage && (
            <div className="flex items-center gap-3">
              <button
                disabled={previewPage === 1}
                onClick={goToPrevPage}
                className="p-1.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg disabled:opacity-30 transition-all active:scale-90"
                title="Previous Page"
              >
                <FiChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2 bg-foreground/5 px-3 py-1 rounded-md">
                <span className="text-xs font-black">{previewPage}</span>
                <div className="h-3 w-px bg-foreground/20" />
                <span className="text-xs font-bold text-foreground/30">
                  {maxPreviewPages}
                </span>
              </div>

              <button
                disabled={previewPage >= maxPreviewPages}
                onClick={goToNextPage}
                className="p-1.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg disabled:opacity-30 transition-all active:scale-90"
                title="Next Page"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Fullscreen Control */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
