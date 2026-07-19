import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Check, ChevronDown, CloudRain, Droplets, MapPin, Search, Shirt, Sparkles, Sun, Wind, X } from 'lucide-react'
import './styles.css'

const fallbackImages = {
  top: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85',
  bottom: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85',
  shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  extra: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85'
}

const weatherText = { 0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Foggy', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers', 95: 'Thunderstorm', 96: 'Storm with hail', 99: 'Storm with hail' }
const isRain = (code) => [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)
const isSnow = (code) => [71, 73, 75].includes(code)

const option = (category, itemName, reason) => ({ category, itemName, reason, variationKey: `${category}:${itemName.toLowerCase().replaceAll(' ', '-')}` })

function getRecommendationPools(temp, code, wind) {
  const wet = isRain(code) || isSnow(code)
  const snowy = isSnow(code)

  if (temp < 8) {
    return {
      top: [
        option('top', 'Warm knit layer', 'A cozy knit keeps the chill out'),
        option('top', 'Thermal long-sleeve top', 'A close warm layer helps hold body heat'),
        option('top', 'Heavyweight overshirt', 'Structured fabric adds warmth without losing polish')
      ],
      bottom: [
        option('bottom', 'Insulated trousers', 'A heavier fabric holds in warmth'),
        option('bottom', 'Wool-blend pants', 'Warm fabric keeps the outfit comfortable in cold air'),
        option('bottom', 'Straight-leg winter pants', 'Full coverage works well for low temperatures')
      ],
      shoes: wet ? [
        option('shoes', snowy ? 'Snow-ready boots' : 'Waterproof boots', 'Practical grip and coverage help with wet ground'),
        option('shoes', 'Weatherproof ankle boots', 'A sealed pair keeps the look practical in damp weather'),
        option('shoes', 'Lug-sole boots', 'A stronger sole helps with cold, slippery conditions')
      ] : [
        option('shoes', 'Lined boots', 'Warm underfoot for a cold day'),
        option('shoes', 'Leather ankle boots', 'A sturdy closed shoe suits cold weather'),
        option('shoes', 'Chunky sole boots', 'A warmer base adds comfort and structure')
      ],
      extra: wet ? [
        option('extra', snowy ? 'Wool scarf' : 'Weatherproof coat', 'Your essential cold-weather layer'),
        option('extra', snowy ? 'Knit hat' : 'Water-resistant coat', 'A practical extra protects against the conditions'),
        option('extra', 'Warm scarf', 'Extra coverage helps keep the outfit comfortable')
      ] : [
        option('extra', 'Wool coat', 'Your essential cold-weather layer'),
        option('extra', 'Knit hat', 'A warm accessory helps on colder days'),
        option('extra', 'Structured coat', 'A polished outer layer completes the cold-weather outfit')
      ]
    }
  }

  if (temp < 18) {
    return {
      top: [
        option('top', 'Long-sleeve shirt', 'Easy warmth for a crisp day'),
        option('top', 'Light knit top', 'A soft layer is comfortable in mild weather'),
        option('top', 'Cotton overshirt', 'Light coverage works well between warm and cool')
      ],
      bottom: [
        option('bottom', 'Relaxed trousers', 'Comfortable coverage without bulk'),
        option('bottom', 'Tailored pants', 'A clean shape works well for mild temperatures'),
        option('bottom', 'Straight-leg chinos', 'A practical midweight choice for the forecast')
      ],
      shoes: wet ? [
        option('shoes', 'Water-resistant shoes', 'A smart choice for changeable weather'),
        option('shoes', 'Weatherproof sneakers', 'Useful when the ground may be damp'),
        option('shoes', 'Closed-toe loafers', 'A covered pair keeps the outfit practical')
      ] : [
        option('shoes', 'Clean sneakers', 'A versatile everyday pair'),
        option('shoes', 'Soft loafers', 'Comfortable and polished for mild weather'),
        option('shoes', 'Low-profile trainers', 'Easy to wear through the day')
      ],
      extra: wet ? [
        option('extra', 'Light rain jacket', 'An extra layer for showers'),
        option('extra', 'Compact umbrella', 'A practical backup for wet weather'),
        option('extra', 'Water-resistant jacket', 'Keeps the outfit useful if rain arrives')
      ] : [
        option('extra', 'Light jacket', 'Perfect for the temperature drop'),
        option('extra', 'Soft scarf', 'A flexible layer for cooler moments'),
        option('extra', 'Crossbody bag', 'A useful finishing touch for a mild day')
      ]
    }
  }

  if (temp < 27) {
    return {
      top: [
        option('top', 'Breathable shirt', 'Light and comfortable in the warmth'),
        option('top', 'Relaxed button-up', 'A breathable shape suits warmer air'),
        option('top', 'Soft cotton top', 'A light fabric keeps the outfit comfortable')
      ],
      bottom: [
        option('bottom', 'Lightweight pants', 'A polished, breathable base'),
        option('bottom', 'Wide-leg trousers', 'An easy shape helps airflow'),
        option('bottom', 'Cropped pants', 'Lighter coverage works well in warm weather')
      ],
      shoes: wet ? [
        option('shoes', 'Water-friendly sneakers', 'Comfortable for moving through a damp day'),
        option('shoes', 'Closed-toe walking shoes', 'A practical choice if showers are possible'),
        option('shoes', 'Rubber-sole sneakers', 'Better grip helps when pavement is wet')
      ] : [
        option('shoes', 'Everyday sneakers', 'Comfortable for moving through the day'),
        option('shoes', 'Canvas slip-ons', 'Light and easy for warm weather'),
        option('shoes', 'Breathable loafers', 'A polished pair that still feels light')
      ],
      extra: wet ? [
        option('extra', 'Compact umbrella', 'Keep a dry layer close'),
        option('extra', 'Packable rain layer', 'Useful protection without adding bulk'),
        option('extra', 'Waterproof tote bag', 'Keeps daily items protected from showers')
      ] : [
        option('extra', 'Canvas tote bag', 'A useful finishing touch'),
        option('extra', 'Sunglasses', 'Simple protection for brighter weather'),
        option('extra', 'Lightweight bag', 'An easy extra that fits a warm day')
      ]
    }
  }

  return {
    top: [
      option('top', 'Airy short-sleeve top', 'Breathable fabric keeps you cool'),
      option('top', 'Linen shirt', 'Light fabric helps in hot weather'),
      option('top', 'Sleeveless woven top', 'A cooler shape works well for high temperatures')
    ],
    bottom: [
      option('bottom', 'Light summer pants', 'Easy coverage for sunny weather'),
      option('bottom', 'Linen trousers', 'Breathable fabric helps heat feel manageable'),
      option('bottom', 'Flowy lightweight pants', 'A loose shape improves comfort in hot air')
    ],
    shoes: wet ? [
      option('shoes', 'Water-friendly sandals', 'A practical choice for hot, wet weather'),
      option('shoes', 'Rubber-sole sandals', 'Light footwear with better wet-ground grip'),
      option('shoes', 'Quick-dry walking shoes', 'Useful when heat and showers overlap')
    ] : [
      option('shoes', 'Breathable sandals', 'Cool, comfortable and ready for walking'),
      option('shoes', 'Canvas slip-ons', 'Light footwear suits hot weather'),
      option('shoes', 'Open-weave flats', 'A breathable pair keeps the outfit polished')
    ],
    extra: wet ? [
      option('extra', 'Packable rain layer', 'A light backup for a passing shower'),
      option('extra', 'Compact umbrella', 'Useful rain protection without heavy layers'),
      option('extra', 'Waterproof bag', 'Keeps essentials protected in hot, wet weather')
    ] : [
      option('extra', 'Sun hat', 'Simple protection from the sun'),
      option('extra', 'Sunglasses', 'A practical extra for bright weather'),
      option('extra', 'Lightweight tote bag', 'A useful warm-weather finishing touch')
    ]
  }
}

function chooseFreshOptions(pools, previousVariationKeys) {
  const categories = ['top', 'bottom', 'shoes', 'extra']
  const previousKey = previousVariationKeys.join('|')
  const optionCounts = categories.map((category) => pools[category].length)
  const combinationCount = optionCounts.reduce((total, count) => total * count, 1)
  const startIndex = Math.floor(Math.random() * combinationCount)

  for (let offset = 0; offset < combinationCount; offset += 1) {
    let cursor = (startIndex + offset) % combinationCount
    const selected = categories.map((category, categoryIndex) => {
      const options = pools[category]
      const optionIndex = cursor % options.length
      cursor = Math.floor(cursor / options.length)
      return options[optionIndex]
    })
    const selectedKey = selected.map((item) => item.variationKey).join('|')
    if (selectedKey !== previousKey || combinationCount === 1) return selected
  }

  return categories.map((category) => pools[category][0])
}

function buildRecommendations(temp, code, wind, preference, previousVariationKeys = []) {
  const pools = getRecommendationPools(temp, code, wind)
  if (wind > 30 && !isRain(code) && !isSnow(code)) {
    pools.extra = [
      option('extra', 'Windbreaker jacket', 'A light shell keeps the breeze off'),
      option('extra', 'Light wind jacket', 'A practical layer helps with strong wind'),
      option('extra', 'Structured overshirt', 'Extra coverage keeps the outfit comfortable in breezy weather')
    ]
  }

  return chooseFreshOptions(pools, previousVariationKeys).map((item) => ({
    ...item,
    searchQuery: `${preference} ${item.itemName}`,
    imageUrl: fallbackImages[item.category],
    imageAlt: `${preference} ${item.itemName}`,
    photographerName: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
    photoUrl: 'https://unsplash.com'
  }))
}

async function getImages(recommendations) {
  const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  if (!key) return recommendations
  return Promise.all(recommendations.map(async (item) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.searchQuery)}&per_page=1&orientation=portrait`, { headers: { Authorization: `Client-ID ${key}` } })
      if (!response.ok) return item
      const data = await response.json(); const photo = data.results?.[0]
      return photo ? { ...item, imageUrl: `${photo.urls.small}&auto=format&fit=crop&w=900&q=85`, imageAlt: photo.alt_description || item.imageAlt, photographerName: photo.user.name, photographerUrl: photo.user.links.html, photoUrl: photo.links.html } : item
    } catch { return item }
  }))
}

function App() {
  const [city, setCity] = useState('')
  const [preference, setPreference] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [previousVariationKeys, setPreviousVariationKeys] = useState([])

  async function handleSubmit(event) {
    event.preventDefault(); setError('')
    if (!city.trim() || !preference.trim()) { setError('Please tell us both where you are and what you love to wear.'); return }
    setStatus('loading')
    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.trim())}&count=1&language=en&format=json`)
      if (!geoResponse.ok) throw new Error('Could not find that city.')
      const geo = await geoResponse.json(); const place = geo.results?.[0]
      if (!place) throw new Error('We couldn’t find that city. Try adding a country name.')
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code,precipitation,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=auto`)
      if (!weatherResponse.ok) throw new Error('Weather is unavailable right now. Please try again.')
      const data = await weatherResponse.json(); const current = data.current
      const nextWeather = { name: place.name, country: place.country, temperature: Math.round(current.temperature_2m), code: current.weather_code, precipitation: current.precipitation, wind: Math.round(current.wind_speed_10m) }
      const nextItems = await getImages(buildRecommendations(nextWeather.temperature, nextWeather.code, nextWeather.wind, preference.trim(), previousVariationKeys))
      setWeather(nextWeather); setRecommendations(nextItems); setPreviousVariationKeys(nextItems.map((item) => item.variationKey)); setStatus('success')
    } catch (err) { setError(err.message || 'Something went wrong.'); setStatus('error') }
  }

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><Shirt size={18} /></span><span>Weather <em>Wardrobe</em></span></a><div className="topbar-note"><span className="live-dot" /> live styling for wherever you are</div></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> THE DAILY EDIT</p><h1>Dress for the<br /><i>day ahead.</i></h1><p className="intro">The forecast has a point of view. Tell us where you are and what you love to wear—we’ll translate the weather into four pieces that feel like you.</p><div className="trust-row"><span><Check size={14} /> Weather-aware</span><span><Check size={14} /> Your style, your way</span></div></div><div className="hero-art"><div className="sun-disc" /><div className="art-label"><span>Today’s mood</span><strong>Light layers<br />&amp; good energy</strong></div><div className="art-shape art-shape-one" /><div className="art-shape art-shape-two" /></div></section>
      <section className="planner-card"><div className="section-kicker"><span>01</span><span>Set your scene</span></div><form onSubmit={handleSubmit}><div className="form-grid"><label className="field"><span>Where are you today?</span><div className="input-wrap"><MapPin size={18} /><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City, country" /></div></label><label className="field"><span>What’s your style?</span><div className="input-wrap"><Shirt size={18} /><input value={preference} onChange={(e) => setPreference(e.target.value)} placeholder="e.g. black clothes, elegant" /></div></label><button className="submit-button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Styling…' : 'Style me'}<ArrowRight size={18} /></button></div>{error && <p className="error-message"><X size={15} /> {error}</p>}</form><p className="form-hint">Try “orange clothes, smart casual” or “linen, minimalist neutrals”.</p></section>
      {status === 'idle' && <section className="empty-state"><div className="empty-icon"><Sun size={28} /></div><p className="eyebrow">YOUR CLOSET, CURATED</p><h2>A little weather wisdom<br /><i>goes a long way.</i></h2><p>Enter your details above to get a thoughtful edit for today.</p></section>}
      {status === 'loading' && <section className="results"><div className="results-heading"><div><p className="eyebrow">CURATING YOUR EDIT</p><h2>Finding your four…</h2></div></div><div className="loading-grid">{[1,2,3,4].map((x) => <div className="skeleton-card" key={x}><div className="skeleton-image" /><div className="skeleton-line" /><div className="skeleton-line short" /></div>)}</div></section>}
      {status === 'success' && weather && <section className="results"><div className="results-heading"><div><p className="eyebrow">02 / YOUR DAILY EDIT</p><h2>Made for <i>{weather.name}</i></h2><p className="weather-line"><span className="weather-temp">{weather.temperature}°</span><span>{weatherText[weather.code] || 'Current conditions'} · {weather.wind} km/h wind</span></p></div><div className="weather-pills"><span><Droplets size={15} /> {weather.precipitation} mm</span><span><Wind size={15} /> {weather.wind} km/h</span></div></div><div className="recommendation-grid">{recommendations.map((item, index) => <article className="item-card" key={item.category}><div className="item-image-wrap"><img src={item.imageUrl} alt={item.imageAlt} /><span className="item-number">0{index + 1}</span></div><div className="item-content"><div className="item-meta"><span>{item.category === 'extra' ? 'EXTRA LAYER' : item.category.toUpperCase()}</span><span className="meta-dot" /></div><h3>{item.itemName}</h3><p>{item.reason}</p><a href={item.photoUrl} target="_blank" rel="noreferrer">Photo by {item.photographerName} <ArrowRight size={13} /></a></div></article>)}</div><p className="results-footnote"><CloudRain size={14} /> Recommendations adapt to current conditions and your personal style.</p></section>}
    </main><footer><span>Weather Wardrobe © 2025</span><span>Made for getting dressed with intention.</span></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
