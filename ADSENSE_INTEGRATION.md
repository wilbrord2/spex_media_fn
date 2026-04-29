# Google AdSense Integration Guide

This guide explains how to integrate Google AdSense ads throughout the Inamacom platform.

## Setup Instructions

### 1. Update Your Publisher ID

The Google AdSense script is already added to `app/layout.tsx` with your publisher ID:

```
ca-pub-1556007805797173
```

If you need to update it, edit the script tag in `app/layout.tsx`.

### 2. Create Ad Units in Google AdSense

Go to your Google AdSense account and create ad units for each location:

- Navigate to **Ads > Ad units**
- Create new ad units and note their slot IDs
- Update the `AD_SLOTS` object in `app/constants/adSenseConfig.ts`

## Available Components

### 1. GoogleDisplayAd

Used for banner and responsive display ads.

**File:** `app/[locale]/components/ads/GoogleDisplayAd.tsx`

**Usage:**

```tsx
import GoogleDisplayAd from "@/app/[locale]/components/ads/GoogleDisplayAd";
import { AD_SLOTS } from "@/app/constants/adSenseConfig";

export default function MyPage() {
  return (
    <div>
      <h1>My Content</h1>

      {/* Top banner ad */}
      <GoogleDisplayAd
        adSlot={AD_SLOTS.articleTopBanner}
        adFormat="horizontal"
        fullWidth={true}
      />

      <p>My article content...</p>

      {/* Middle ad */}
      <GoogleDisplayAd adSlot={AD_SLOTS.articleMiddle} adFormat="auto" />
    </div>
  );
}
```

**Props:**

- `adSlot` (required): The ad unit ID from Google AdSense
- `adFormat` (optional): "auto" | "horizontal" | "vertical" | "rectangle" (default: "auto")
- `fullWidth` (optional): Makes the ad responsive to full width (default: false)
- `className` (optional): Additional CSS classes for styling

### 2. GoogleFeedAd

Used for native ads that blend with content feeds.

**File:** `app/[locale]/components/ads/GoogleFeedAd.tsx`

**Usage:**

```tsx
import GoogleFeedAd from "@/app/[locale]/components/ads/GoogleFeedAd";
import { AD_SLOTS } from "@/app/constants/adSenseConfig";

export default function ArticleList() {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}

      <GoogleFeedAd adSlot={AD_SLOTS.infeedAd} />

      {moreArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

**Props:**

- `adSlot` (required): The ad unit ID from Google AdSense
- `className` (optional): Additional CSS classes

### 3. GoogleRectangleAd

Used for sidebar and fixed-size ads.

**File:** `app/[locale]/components/ads/GoogleRectangleAd.tsx`

**Usage:**

```tsx
import GoogleRectangleAd from "@/app/[locale]/components/ads/GoogleRectangleAd";
import { AD_SLOTS } from "@/app/constants/adSenseConfig";

export default function ArticleWithSidebar() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ArticleContent />
      </div>
      <aside>
        <GoogleRectangleAd
          adSlot={AD_SLOTS.sidebarAd}
          width={300}
          height={250}
        />
      </aside>
    </div>
  );
}
```

**Props:**

- `adSlot` (required): The ad unit ID from Google AdSense
- `width` (optional): Ad width in pixels (default: 300)
- `height` (optional): Ad height in pixels (default: 250)
- `className` (optional): Additional CSS classes

## Recommended Ad Placements

### Article Detail Page (`app/[locale]/(pages)/review/[id]/page.tsx`)

1. **Top Banner**: After hero section before metadata
2. **Mid-content**: Between article and comments
3. **Sidebar**: After related articles or in a sidebar

Example integration:

```tsx
// After hero section
<GoogleDisplayAd adSlot={AD_SLOTS.articleTopBanner} fullWidth />

// Between article and comments
<GoogleDisplayAd adSlot={AD_SLOTS.articleMiddle} />

// In related articles sidebar
<GoogleRectangleAd adSlot={AD_SLOTS.articleSidebar} />
```

### Homepage

1. **Hero Banner**: Below main banner
2. **Middle Section**: Between content sections

### Service Pages

1. **Top Banner**: Below page header
2. **Bottom Section**: Before footer

### Article Lists

1. **In-feed ads**: Between article cards
2. **Top Banner**: Above article list

## Ad Performance Tips

1. **Optimal Placement**: Place ads where users naturally pause
2. **Viewability**: Ensure ads are in the viewport (not hidden below fold)
3. **Content Quality**: Higher-quality content gets better-paying ads
4. **User Experience**: Don't overload pages with too many ads (recommended: 3 max per page)
5. **Testing**: Use Google AdSense preview mode before publishing

## Ad Slot Configuration

Update ad slots in `app/constants/adSenseConfig.ts`:

```typescript
export const AD_SLOTS = {
  articleTopBanner: "YOUR_SLOT_ID_1",
  articleMiddle: "YOUR_SLOT_ID_2",
  articleBottom: "YOUR_SLOT_ID_3",
  // ... more slots
};
```

## Troubleshooting

**Ads not showing?**

1. Verify your publisher ID is correct in `layout.tsx`
2. Check that ad slot IDs are correct in `adSenseConfig.ts`
3. Ensure your site has been approved for AdSense
4. Wait 5-10 minutes for ads to appear after updating
5. Check Google AdSense Policy Center for any violations

**Console errors?**

- AdSense errors are caught and logged, but won't break your site
- Check browser console for "AdSense error" messages

## AdSense Policies

Remember to follow Google AdSense policies:

- ✅ High-quality, original content
- ✅ Clear disclosure of ads
- ❌ Fake traffic or clicks
- ❌ Misleading ad placement
- ❌ Ad stacking or hiding
- ❌ Content policy violations

For more info: https://support.google.com/adsense/answer/48182
