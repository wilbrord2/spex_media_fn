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
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("react-pdf").then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  const maxPreviewPages = totalPages > 0 ? Math.ceil(totalPages * 0.1) : 1;
  const canViewPage = previewPage <= maxPreviewPages;

  useEffect(() => {
    if (!isOpen) {
      setPreviewPage(1);
      setLoadProgress(0);
      setIsLoadingPDF(true);
      setHasError(false);
    }
  }, [isOpen]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setTotalPages(numPages);
    setIsLoadingPDF(false);
  };

  const onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    setLoadProgress(Math.floor((loaded / total) * 100));
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl ${isFullscreen ? "" : "p-4 md:p-10"}`}
    >
      <div className="relative w-full h-full bg-background flex flex-col shadow-2xl overflow-hidden md:rounded-3xl border border-white/10">
        {/* Progress Bar (Top) */}
        {isLoadingPDF && !hasError && (
          <div
            className="absolute top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
            style={{ width: `${loadProgress}%` }}
          />
        )}

        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/5 bg-background/50">
          <h2 className="text-xs font-black uppercase tracking-tighter">
            Manuscript <span className="text-primary">Preview</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto bg-[#0a0a0a] flex justify-center items-start p-4 scrollbar-hide">
          {isLoadingPDF && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-background/80">
              <FiLoader className="animate-spin text-primary mb-4" size={32} />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                Streaming Data: {loadProgress}%
              </p>
            </div>
          )}

          {hasError ? (
            <div className="m-auto text-center p-8 bg-red-500/5 border border-red-500/20 rounded-2xl max-w-sm">
              <FiAlertCircle className="text-red-500 mx-auto mb-4" size={40} />
              <p className="text-sm font-bold">Failed to stream PDF.</p>
              <button
                onClick={() => window.location.reload()}
                className="text-[10px] text-primary underline mt-4"
              >
                Retry Connection
              </button>
            </div>
          ) : canViewPage ? (
            <Document
              file={proxiedUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => setHasError(true)}
              onLoadProgress={onProgress}
              loading={null}
            >
              <Page
                pageNumber={previewPage}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-2xl"
              />
            </Document>
          ) : (
            <div className="m-auto text-center p-12 bg-background border border-white/5 rounded-3xl max-w-md animate-in fade-in slide-in-from-bottom-5">
              <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <FiZoomIn size={28} />
              </div>
              <h3 className="text-2xl font-black italic">End of Preview</h3>
              <p className="text-sm text-foreground/50 mt-4 leading-relaxed">
                You have reached the end of the free 10% preview. Unlock the
                full <b>{totalPages} pages</b> to continue.
              </p>
              <button className="w-full mt-8 py-4 bg-primary text-primary-foreground font-black rounded-xl shadow-xl hover:scale-[1.02] transition-all">
                Purchase Full Copy — ${activeFormatPrice?.toFixed(2)}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!hasError && !isLoadingPDF && canViewPage && (
          <div className="p-4 flex items-center justify-between border-t border-white/5 bg-background/80">
            <div className="flex items-center gap-4">
              <button onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}>
                <FiZoomOut />
              </button>
              <span className="text-[10px] font-mono">
                {(scale * 100).toFixed(0)}%
              </span>
              <button onClick={() => setScale((s) => Math.min(s + 0.2, 3.0))}>
                <FiZoomIn />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                disabled={previewPage === 1}
                onClick={() => setPreviewPage((p) => p - 1)}
                className="disabled:opacity-20"
              >
                <FiChevronLeft />
              </button>
              <span className="text-xs font-black">
                {previewPage} / {maxPreviewPages}
              </span>
              <button onClick={() => setPreviewPage((p) => p + 1)}>
                <FiChevronRight />
              </button>
            </div>
            <button onClick={toggleFullscreen}>
              {isFullscreen ? <FiMinimize /> : <FiMaximize />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
