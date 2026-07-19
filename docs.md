# Weather Wardrobe — Implementation Update

## Overview

The Weather Wardrobe MVP is now implemented as a responsive React application with weather-aware clothing recommendations.

## Implemented features

- City search using Open-Meteo geocoding.
- Current weather retrieval using Open-Meteo:
  - Temperature
  - Weather condition
  - Precipitation
  - Wind speed
- Free-text clothing preference input, such as:
  - `black clothes, elegant`
  - `orange clothes, smart casual`
- Exactly four recommendations in a fixed order:
  1. Shirt or top
  2. Pants or bottom
  3. Shoes
  4. Weather-based extra item, such as a coat, jacket, hat, scarf, umbrella, bag, or sunglasses
- Weather rules for cold, mild, warm, hot, rainy, snowy, and windy conditions.
- Fresh suggestion variation:
  - Each weather/category rule now has multiple valid clothing options.
  - Repeated submissions avoid showing the exact same four item names as the previous result when alternatives are available.
  - Each recommendation includes a `variationKey` used to track and rotate suggestions.
- Unsplash image search support using `VITE_UNSPLASH_ACCESS_KEY`.
- Fallback images when an Unsplash key is not configured or an image cannot be loaded.
- Recommendation cards with:
  - Item category
  - Item name
  - Weather explanation
  - Image and alt text
  - Photographer attribution
  - Source photo link
- Loading skeletons while results are being prepared.
- Empty state before the first search.
- Validation and error messages for missing fields, unknown cities, and failed API requests.
- Responsive layout for mobile, tablet, and desktop screens.
- Keyboard-friendly form controls and labelled inputs.

## Main project files

- `src/main.jsx` — React application, API calls, weather rules, and recommendations.
- `src/styles.css` — Responsive visual design and component styles.
- `vite.config.js` — Vite and Tailwind configuration.
- `package.json` — Project scripts and dependencies.
- `.env.example` — Unsplash environment-variable template.

## Running the app

Install dependencies:

```powershell
npm.cmd install
```

Start the development server:

```powershell
npm.cmd run dev
```

Open [http://localhost:5173](http://localhost:5173) in a browser.

## Unsplash configuration

Copy `.env.example` to `.env` and add an Unsplash access key:

```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Without this key, the app still works using the included fallback images.

## Verification

The production build has been verified successfully with:

```powershell
npm.cmd run build
```

## Latest extension

The app now supports fresh suggestions on repeated requests. If the user enters the same city and the same clothing preference again, the app keeps the same four required categories but selects a different valid combination of clothing items whenever possible. This update does not add AI processing or image suitability review.
