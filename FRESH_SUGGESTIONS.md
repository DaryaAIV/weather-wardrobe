# Fresh Suggestions Feature

## Overview

The Fresh Suggestions feature makes Weather Wardrobe return a different clothing suggestion set each time the user submits a request, even when the city and clothing preference are the same.

The app still keeps the original MVP rule: every result must contain exactly four recommendations in this fixed order:

1. Shirt/top
2. Pants/bottom
3. Shoes
4. Weather-appropriate extra item

## User goal

The user should not see the same outfit suggestion again immediately after submitting the same request. For example, if the user enters:

```text
City: London
Style preference: black clothes, elegant
```

and submits the form twice, the second result should keep the same weather logic and style preference, but use a different valid combination of clothing items when alternatives are available.

## How it works

- The app checks the current weather using Open-Meteo.
- The app chooses the correct weather category:
  - Cold
  - Mild
  - Warm
  - Hot
  - Rainy
  - Snowy
  - Windy
- Each weather/category rule has multiple clothing options instead of one fixed item.
- Each clothing option has a `variationKey`.
- After a successful result, the app stores the previous result's variation keys in React state.
- On the next request, the app avoids returning the exact same four variation keys.
- The user's exact clothing preference text is still included in every image search query.

## Recommendation data

Each recommendation now includes a `variationKey`:

```js
{
  category: 'top' | 'bottom' | 'shoes' | 'extra',
  itemName: string,
  reason: string,
  searchQuery: string,
  imageUrl: string,
  imageAlt: string,
  photographerName: string,
  photographerUrl: string,
  photoUrl: string,
  variationKey: string
}
```

The previous result is stored as:

```js
previousVariationKeys: string[]
```

## Example behavior

First request:

```text
Top: Long-sleeve shirt
Bottom: Relaxed trousers
Shoes: Clean sneakers
Extra: Light jacket
```

Second request with the same city and preference:

```text
Top: Light knit top
Bottom: Tailored pants
Shoes: Soft loafers
Extra: Crossbody bag
```

Both results are valid, weather-aware, and style-aware, but they are not the same four-item combination.

## Gender-neutral search behavior

The feature does not add gendered search terms.

Generated image queries should not add:

- `men`
- `women`
- `male`
- `female`

The app focuses on clothing type, weather suitability, and the user's style preference.

## What this feature does not include

- No AI backend.
- No AI image suitability review.
- No account system.
- No saved wardrobe history.
- No gender selection.

## Test checklist

- Submit the same city and preference twice.
- Confirm the second result does not repeat the exact same four item names.
- Confirm every result still contains one top, one bottom, one shoes item, and one extra item.
- Test cold, mild, warm, hot, rainy, snowy, and windy weather cases.
- Test preferences such as:
  - `black clothes, elegant`
  - `orange clothes, smart casual`
- Confirm generated search queries include the user's preference text.
- Confirm generated search queries do not add gendered terms.
- Confirm fallback images still appear when Unsplash does not return an image.

## Main implementation file

The feature is implemented in:

```text
src/main.jsx
```

Important functions and state:

- `getRecommendationPools`
- `chooseFreshOptions`
- `buildRecommendations`
- `previousVariationKeys`
