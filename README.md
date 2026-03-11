# Shot List Generator

**White-labeled content production tool by JSDetail LLC.**

Upload a brand guide, menu, one-pager, or logo — the engine reads it locally in your browser and builds a visual language profile. 1,200 cinematic styles across 25 categories, scored and ranked by how well they fit *your* brand.

## Features

### Brand Intelligence (Client-Side)
- **Document upload** — drag & drop PDFs, images, text files, markdown
- **Menu extraction** — recognizes 300+ dish and drink patterns, price-tagged items
- **Service detection** — identifies 16 service types (dine-in, delivery, catering, tasting menu, etc.)
- **Space mapping** — detects 20 physical space types (patio, rooftop, private dining, raw bar, etc.)
- **Cuisine classification** — 20 cuisine types from American to Vietnamese
- **Price tier analysis** — calculates from dollar amounts or language cues
- **Color extraction** — pulls brand colors from images via canvas sampling
- **100% in-browser** — no API calls, no data leaves the client

### Style Library
- **1,200 cinematic styles** across 25 categories
- **5-dimension semantic tags** — subject, energy, distance, sense, editorial role
- Scored by brand profile, mood, and extracted offerings
- Searchable, filterable, mood-selectable

### Storyboard Generator
- **8 mood presets** — Candlelight Evening to High Energy
- **4 duration formats** — 15s, 30s, 60s, 90s
- **Beat-sequence logic** — Hook → Establish → Hero → Rhythm → Texture → Energy → People → Closer
- Weighted randomness from top-scoring styles per beat

### Shot List
- Accumulate picks from browse, search, or storyboard
- Copy as formatted text
- Per-shot notes

## Tech

- React 18 + Vite
- Zero dependencies beyond React
- pdf.js loaded on-demand from CDN (only for PDF uploads)
- Deployable to Vercel free tier

## Development

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
# Connect to Vercel via GitHub integration
```

## License

Proprietary — JSDetail LLC. All rights reserved.
