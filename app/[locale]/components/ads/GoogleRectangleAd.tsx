"use client";
import { useEffect } from "react";
import { GOOGLE_ADSENSE_CLIENT_ID } from "@/app/lib/adsenseConfig";

interface GoogleRectangleAdProps {
  adSlot: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function GoogleRectangleAd({
  adSlot,
  width = 300,
  height = 250,
  className = "",
}: GoogleRectangleAdProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <ins
        key={adSlot}
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: `${width}px`,
          height: `${height}px`,
        }}
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
      ></ins>
    </div>
  );
}
