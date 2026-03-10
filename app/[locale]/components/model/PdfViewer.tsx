"use client";

import React, { useState, useEffect, useRef } from "react";
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
  FiAlertCircle,
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
  const [previewPage, setPreviewPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoadingPDF, setIsLoadingPDF] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const viewerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Resize for Responsive Width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Subtract padding for mobile safety
        setContainerWidth(containerRef.current.clientWidth - 32);
      }
    };

    if (isOpen) {
      updateWidth();
      window.addEventListener("resize", updateWidth);
    }
    return () => window.removeEventListener("resize", updateWidth);
  }, [isOpen]);

  useEffect(() => {
    import("react-pdf").then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  const maxPreviewPages = totalPages > 0 ? Math.ceil(totalPages * 0.1) : 1;
  const canViewPage = previewPage <= maxPreviewPages;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setIsLoadingPDF(false);
  };

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  if (!isOpen) return null;

  const proxiedUrl = `/api/proxy-pdf?url=${encodeURIComponent(pdfUrl)}`;

  return (
    <div
      ref={viewerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl ${
        isFullscreen ? "" : "p-0 md:p-6"
      }`}
    >
      <div className="relative w-full h-full max-w-5xl bg-background flex flex-col shadow-2xl overflow-hidden md:rounded-2xl border border-white/10">
        {/* Header - Compact for Mobile */}
        <div className="p-3 md:p-4 flex items-center justify-between border-b border-white/5 bg-background/50">
          <div className="flex flex-col">
            <h2 className="text-[10px] md:text-xs font-black uppercase tracking-tighter">
              Manuscript <span className="text-primary">Preview</span>
            </h2>
            <p className="text-[8px] opacity-50">10% Limited View</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* PDF Body Container */}
        <div
          ref={containerRef}
          className="flex-1 overflow-auto bg-[#0d0d0d] flex justify-center items-start p-4 scrollbar-hide select-none"
        >
          {isLoadingPDF && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-background/90">
              <FiLoader className="animate-spin text-primary mb-4" size={32} />
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>
          )}

          {hasError ? (
            <div className="m-auto text-center p-8 border border-red-500/20 rounded-2xl max-w-sm">
              <FiAlertCircle className="text-red-500 mx-auto mb-4" size={40} />
              <p className="text-sm font-bold">Failed to load manuscript.</p>
              <button
                onClick={() => window.location.reload()}
                className="text-[10px] text-primary underline mt-4"
              >
                Retry
              </button>
            </div>
          ) : canViewPage ? (
            <Document
              file={proxiedUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setHasError(true)}
              onLoadProgress={({ loaded, total }) =>
                setLoadProgress(Math.floor((loaded / total) * 100))
              }
              loading={null}
            >
              <Page
                pageNumber={previewPage}
                width={containerWidth ? containerWidth * scale : undefined}
                renderTextLayer={true}
                renderAnnotationLayer={false}
                className="shadow-2xl transition-all duration-200"
              />
            </Document>
          ) : (
            /* Purchase CTA */
            <div className="m-auto text-center p-8 md:p-12 bg-card border border-white/5 rounded-3xl max-w-md">
              <h3 className="text-xl font-black">End of Preview</h3>
              <p className="text-xs text-muted-foreground mt-4">
                Unlock the full <b>{totalPages} pages</b>.
              </p>
              <button className="w-full mt-6 py-4 bg-primary text-primary-foreground font-black rounded-xl">
                Purchase — ${activeFormatPrice?.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Footer - Optimized for Mobile Taps */}
        {!hasError && !isLoadingPDF && canViewPage && (
          <div className="p-3 md:p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-white/5 bg-background/95">
            {/* Zoom Controls */}
            <div className="flex items-center gap-6 bg-white/5 px-4 py-1.5 rounded-full">
              <button
                onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}
                className="p-1"
              >
                <FiZoomOut />
              </button>
              <span className="text-[10px] font-mono min-w-[30px] text-center">
                {(scale * 100).toFixed(0)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(s + 0.2, 2.5))}
                className="p-1"
              >
                <FiZoomIn />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-8">
              <button
                disabled={previewPage === 1}
                onClick={() => setPreviewPage((p) => p - 1)}
                className="disabled:opacity-20 p-2"
              >
                <FiChevronLeft size={24} />
              </button>
              <span className="text-xs font-black tabular-nums">
                {previewPage} <span className="opacity-30 mx-1">/</span>{" "}
                {maxPreviewPages}
              </span>
              <button
                onClick={() => setPreviewPage((p) => p + 1)}
                className="p-2"
              >
                <FiChevronRight size={24} />
              </button>
            </div>

            <button
              onClick={toggleFullscreen}
              className="hidden md:block p-2 opacity-50 hover:opacity-100"
            >
              {isFullscreen ? <FiMinimize /> : <FiMaximize />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
