# How to Use Google AdSense Components - Complete Guide

## ✅ What's Already Set Up

### 1. Google AdSense Script

**Location**: [app/layout.tsx](app/layout.tsx) (head section)

This script loads the Google AdSense library globally on every page. It's required for ads to work.

```tsx
<head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1556007805797173"
    crossOrigin="anonymous"
  ></script>
</head>
```

### 2. Ad Components Created

These are reusable components ready to use anywhere:

- **GoogleDisplayAd** → [app/[locale]/components/ads/GoogleDisplayAd.tsx](app/[locale]/components/ads/GoogleDisplayAd.tsx)
- **GoogleFeedAd** → [app/[locale]/components/ads/GoogleFeedAd.tsx](app/[locale]/components/ads/GoogleFeedAd.tsx)
- **GoogleRectangleAd** → [app/[locale]/components/ads/GoogleRectangleAd.tsx](app/[locale]/components/ads/GoogleRectangleAd.tsx)

### 3. Ad Configuration

**Location**: [app/lib/adsenseConfig.ts](app/lib/adsenseConfig.ts)

Contains your Publisher ID and ad slot IDs.

---

## 🚀 How to Display Ads on Your Pages

The components are created but need to be **imported and used** in your pages. Here's how:

### Example 1: Add Ads to Article Detail Page

**File**: `app/[locale]/(pages)/review/[id]/page.tsx`

```tsx
// ✅ Step 1: Import the ad component
import GoogleDisplayAd from "@/app/[locale]/components/ads/GoogleDisplayAd";
import { AD_SLOTS } from "@/app/lib/adsenseConfig";

export default function ArticleDetailPage() {
  return (
    <div>
      {/* Your existing hero section and content */}

      {/* ✅ Step 2: Add the ad component where you want it */}

      {/* Ad at the top after hero */}
      <GoogleDisplayAd adSlot={AD_SLOTS.articleTopBanner} fullWidth={true} />

      {/* Your article content here */}
      <article>{/* article content */}</article>

      {/* Ad in the middle */}
      <GoogleDisplayAd adSlot={AD_SLOTS.articleMiddle} adFormat="auto" />

      {/* Your comments section */}
      {/* comments */}

      {/* Rectangle ad in sidebar */}
      <GoogleRectangleAd
        adSlot={AD_SLOTS.articleSidebar}
        width={300}
        height={250}
      />
    </div>
  );
}
```

### Example 2: Add Feed Ad to Article List Page

**File**: `app/[locale]/(pages)/review/page.tsx`

```tsx
import GoogleFeedAd from "@/app/[locale]/components/ads/GoogleFeedAd";
import { AD_SLOTS } from "@/app/lib/adsenseConfig";

export default function ReviewListPage() {
  return (
    <div>
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} />
      ))}

      {/* In-feed ad appears between articles */}
      <GoogleFeedAd adSlot={AD_SLOTS.infeedAd} />

      {moreArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### Example 3: Add Ads to Service Pages

**File**: `app/[locale]/(pages)/service/publishing/page.tsx`

```tsx
import GoogleDisplayAd from "@/app/[locale]/components/ads/GoogleDisplayAd";
import { AD_SLOTS } from "@/app/lib/adsenseConfig";

export default function PublishingServicePage() {
  return (
    <div>
      {/* Page header */}

      {/* Ad after header */}
      <GoogleDisplayAd adSlot={AD_SLOTS.servicePageTop} fullWidth={true} />

      {/* Your content sections */}

      {/* Ad at bottom */}
      <GoogleDisplayAd adSlot={AD_SLOTS.servicePageBottom} fullWidth={true} />
    </div>
  );
}
```

---

## 📊 Component Reference

### GoogleDisplayAd

**Best for**: Banner ads, responsive ads across the page width

```tsx
<GoogleDisplayAd
  adSlot="YOUR_SLOT_ID"
  adFormat="auto" // "auto" | "horizontal" | "vertical" | "rectangle"
  fullWidth={true} // Makes it responsive to container width
  className="my-custom-class"
/>
```

### GoogleFeedAd

**Best for**: In-feed ads, native ads between content

```tsx
<GoogleFeedAd adSlot="YOUR_SLOT_ID" className="my-custom-class" />
```

### GoogleRectangleAd

**Best for**: Sidebar ads, fixed-size ads (300×250, 300×600, etc.)

```tsx
<GoogleRectangleAd
  adSlot="YOUR_SLOT_ID"
  width={300} // Default: 300
  height={250} // Default: 250
  className="my-custom-class"
/>
```

---

## 🎯 Next Steps

### 1. Get Your Ad Slot IDs from Google AdSense

Go to your Google AdSense account:

1. Click **Ads** > **Ad units**
2. Click **Create** to create new ad units
3. Choose the ad format you want
4. Click **Create**
5. Copy the ad unit ID (looks like: `1234567890`)

### 2. Update Ad Slots

Update the `AD_SLOTS` in [app/lib/adsenseConfig.ts](app/lib/adsenseConfig.ts):

```typescript
export const AD_SLOTS = {
  articleTopBanner: "1234567890", // Replace with your actual slot ID
  articleMiddle: "1234567891",
  articleBottom: "1234567892",
  // ... etc
};
```

### 3. Add Components to Pages

Choose the pages where you want ads:

- ✅ Article detail page ([review/[id]/page.tsx](<app/[locale]/(pages)/review/[id]/page.tsx>))
- ✅ Review list page
- ✅ Service pages (publishing, store, etc.)
- ✅ Homepage
- ✅ Any other pages

Import and add the components (see examples above).

### 4. Test

1. Make sure `.env.local` has your Publisher ID:

   ```env
   NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-your-actual-id
   ```

2. Restart your dev server:

   ```bash
   npm run dev
   ```

3. Visit a page with an ad component
4. You should see the ad placeholder (or actual ads if your site is approved)

---

## ❓ Frequently Asked Questions

**Q: Why do I see blank ad spaces?**
A: Google needs time to fill ads. It can take 5-10 minutes, and your site needs to be approved by AdSense.

**Q: How many ads can I add per page?**
A: Maximum 3 ad units per page (per Google AdSense policy).

**Q: Can I customize ad colors?**
A: Yes, in your Google AdSense account under Ad Settings > Colors.

**Q: Are the ad slots real?**
A: The placeholder slot IDs are fake. You must replace them with your actual Google AdSense slot IDs.

**Q: What if I see console errors about AdSense?**
A: The error handling catches them and logs them without breaking your site. Check the browser console to see the message.

---

## 📍 Component Locations Summary

```
app/
├── layout.tsx                    ← ✅ Google AdSense script added here
├── lib/
│   └── adsenseConfig.ts         ← ✅ Ad slots configuration
└── [locale]/
    └── components/
        └── ads/
            ├── GoogleDisplayAd.tsx   ← ✅ Banner ads component
            ├── GoogleFeedAd.tsx      ← ✅ In-feed ads component
            └── GoogleRectangleAd.tsx ← ✅ Sidebar ads component
```

---

## 🚀 Ready to Go!

Your ad infrastructure is fully set up. Now you just need to:

1. Get your ad slot IDs from Google AdSense
2. Update them in `app/lib/adsenseConfig.ts`
3. Import and use the components in your pages
4. Test and optimize placement

Happy advertising! 🎉
