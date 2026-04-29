"use client";
import { useEffect } from "react";
import { GOOGLE_ADSENSE_CLIENT_ID } from "@/app/lib/adsenseConfig";

interface GoogleFeedAdProps {
  adSlot: string;
  className?: string;
}

export default function GoogleFeedAd({
  adSlot,
  className = "",
}: GoogleFeedAdProps) {
useEffect(() => {
  if (typeof window !== "undefined") {
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle = adsbygoogle;
      adsbygoogle.push({});
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }
}, []);

  return (
    <div className={`my-8 ${className}`}>
      <ins
        key={adSlot}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="feed"
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
      ></ins>
    </div>
  );
}
