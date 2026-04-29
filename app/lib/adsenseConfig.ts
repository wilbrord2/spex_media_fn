// Google AdSense Configuration from Environment Variables
export const GOOGLE_ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

// Ad Slot Configuration
export const AD_SLOTS = {
  // Article Detail Page
  articleTopBanner: "26075164931",
  articleMiddle: "2607516492",
  articleBottom: "2607516493",
  articleSidebar: "2607516494",

  // Homepage
  homeHeroBanner: "2607516495",
  homeMiddle: "2607516496",

  // Review/List Pages
  reviewListTop: "2607516497",
  reviewListBottom: "2607516498",

  // Service Pages
  servicePageTop: "2607516499",
  servicePageBottom: "2607516413",

  // General Purpose
  sidebarAd: "2607516423",
  infeedAd: "2607516433",
};

// Update ad slot IDs with your actual Google AdSense ad unit IDs
// Get these from your Google AdSense account under Ads > Ad units
