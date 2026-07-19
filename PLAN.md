Weather Wardrobe — MVP Plan
Summary
Build a responsive React + Tailwind app where the user enters a city and a free-text clothing preference (for example, “black clothes, elegant”). The app reads the current weather and returns exactly four individual clothing recommendations: a shirt/top, pants/bottom, shoes, and one weather-appropriate extra item.
Key changes
Provide a form with required inputs for:City name.
Free-text clothing preference.

Use Open-Meteo to:Convert the city name into coordinates.
Fetch current temperature, weather condition, precipitation, and wind.
Show the selected city and current weather summary. Open-Meteo geocoding docs, forecast docs

Generate exactly four clothing categories in this fixed order:Shirt/top
Pants/bottom
Shoes
Extra weather item: coat, jacket, hat, scarf, umbrella, bag, or sunglasses

Use weather rules to choose the item type. For example:Cold: warm shirt, long pants, boots, coat/hat/scarf.
Mild: long-sleeve shirt, trousers, sneakers, light jacket.
Warm: light shirt, lightweight pants, breathable shoes, bag/sunglasses.
Hot: short-sleeve shirt, light pants, sandals, sunglasses/hat.
Rain/snow/wind overrides the extra item and footwear with practical options such as an umbrella, waterproof jacket, or boots.

Combine each item type with the user’s exact preference text to form four separate Unsplash searches. Example: “black clothes, elegant” produces searches such as “black elegant shirt”, “black elegant trousers”, “black elegant shoes”, and “black elegant coat”.
Render four item cards with the item category, recommended item name, weather reason, image, alt text, photographer credit, and source link. Use Unsplash API attribution requirements and keep its key in environment configuration. Unsplash API docs
Include empty, loading, success, invalid-input, city-not-found, weather-error, image-error, and partial-results states.
Interfaces and data flow
Form input: { city: string, preference: string }.
Weather result: { locationName, country, temperature, weatherCode, precipitation, windSpeed }.
Clothing recommendation: { category: 'top' | 'bottom' | 'shoes' | 'extra', itemName, reason, searchQuery, imageUrl, imageAlt, photographerName, photographerUrl, photoUrl }.
Flow: validate inputs → geocode city → fetch weather → choose four item recommendations → build preference-aware image queries → fetch images → display four cards in fixed order.
Test plan
Verify each result always contains one top, one bottom, one pair of shoes, and one extra item.
Test cold, mild, warm, hot, rainy, snowy, and windy rules.
Test free-text preferences such as “black clothes, elegant” and “orange clothes, smart casual.”
Test blank inputs, unknown cities, API failures, no image result for one item, and responsive/accessibility behaviour.
Assumptions
This is a front-end React + Tailwind MVP with no account, saved wardrobe, or history.
The user’s preference is free text and is used in every clothing image query.
The fourth recommendation is a flexible extra category; a coat or jacket is treated as a weather outerwear item, while hats, bags, umbrellas, scarves, and sunglasses are accessories.

Extension: fresh suggestions
Every new request should keep the existing MVP flow and fixed four categories, but the clothing item names should not repeat the exact same four-item set from the immediately previous result when alternatives are available.

Implementation requirements:
- Add multiple valid options for each weather/category rule.
- Track the previous recommendation set in React state using variation keys.
- Generate a new combination on each submit and avoid the previous variation-key combination.
- Continue using the user's exact free-text clothing preference in each image query.
- Do not add generated gendered search terms such as men, women, male, or female.
- No AI backend or AI image suitability review is part of this extension.

Updated recommendation shape:
{ category: 'top' | 'bottom' | 'shoes' | 'extra', itemName, reason, searchQuery, imageUrl, imageAlt, photographerName, photographerUrl, photoUrl, variationKey }

Additional tests:
- Submit the same city and preference twice and verify the second result is different.
- Submit the same city and preference multiple times and verify valid alternatives rotate.
- Verify each result still includes exactly one top, one bottom, one shoes item, and one extra item.
- Verify fallback image behavior still works when Unsplash has no result.
