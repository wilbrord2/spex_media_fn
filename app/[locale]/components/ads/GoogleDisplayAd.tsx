"use client";
import { useEffect } from "react";
import { GOOGLE_ADSENSE_CLIENT_ID } from "@/app/lib/adsenseConfig";

interface GoogleDisplayAdProps {
  adSlot: string;
  adFormat?: "auto" | "horizontal" | "vertical" | "rectangle";
  fullWidth?: boolean;
  className?: string;
}

export default function GoogleDisplayAd({
  adSlot,
  adFormat = "auto",
  fullWidth = false,
  className = "",
}: GoogleDisplayAdProps) {
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
    <div className={`my-6 ${className}`}>
      <ins
        key={adSlot}
        className="adsbygoogle"
        style={{ display: fullWidth ? "block" : "inline-block", width: "100%" }}
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
