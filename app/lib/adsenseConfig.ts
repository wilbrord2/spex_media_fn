// Google AdSense Configuration from Environment Variables
export const GOOGLE_ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID || "ca-pub-1556007805797173";

// Ad Slot Configuration
export const AD_SLOTS = {
  // Article Detail Page
  articleTopBanner: "2607516493",
  articleMiddle: "2607516493",
  articleBottom: "2607516493",
  articleSidebar: "2607516493",

  // Homepage
  homeHeroBanner: "2607516493",
  homeMiddle: "2607516493",

  // Review/List Pages
  reviewListTop: "2607516493",
  reviewListBottom: "2607516493",

  // Service Pages
  servicePageTop: "2607516493",
  servicePageBottom: "2607516493",

  // General Purpose
  sidebarAd: "2607516493",
  infeedAd: "2607516493",
};

// Update ad slot IDs with your actual Google AdSense ad unit IDs
// Get these from your Google AdSense account under Ads > Ad units
