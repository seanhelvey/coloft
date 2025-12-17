# Coloft - We Rise Together

A vibrant static website for Coloft, a grassroots healing **co**llective in Arcata, CA (Goudi'ni, Wiyot Land).

---

## 📝 Session Notes (for Claude)

**This README is the single source of truth for project context.**

### Latest Session: 2025-12-03 (Afternoon)
- ✅ **Major shift:** From 4 abstract practices → 4 concrete recurring events
  - Somatic Co-Lab (2nd Sunday, 6PM) - Purple/Green theme
  - Coffee & Connection (Every Friday, 7AM) - Terracotta/Amber theme
  - Sex Positive Friends (1st & 3rd Wednesday, 5:30PM) - Pink/Purple theme
  - Brews Without Booze (2nd Monday, 5:30PM) - Cyan/Green theme
- ✅ Removed values section (implied by events themselves)
- ✅ Index page: Summary cards with headline info (clickable to event pages)
- ✅ Each event has own full-page flyer with unique color theme/design
- ✅ Generated unique SVG image for each event (simple, clear icons)
- ✅ Added upcoming dates (copy-paste ready format) to each event page
- ✅ All 5 pages (index + 4 events) fit on exactly 1 page when printed
- ✅ Created events.json with all event data and calculated dates
- ✅ Improved tagline contrast (dark semi-transparent background + stronger shadows)
- ✅ Enhanced beer SVG visibility (added strokes to foam)
- ✅ Added full addresses and Google Maps embeds to venue-based events
- ✅ Added navigation menu at top of each event page
- ✅ Restructured date display: moved upcoming dates into When section
- ✅ Removed "Copy & Paste" label from date headings
- ✅ Created event-print.css for shared print styles across all event pages
- ✅ Improved tagline font weight (800) and explicit white color for better visibility
- ✅ Reorganized file structure into `/events/`, `/images/`, and `/styles/` directories
- ✅ Updated all file paths and test scripts to work with new structure
- ✅ Removed redundant test-print.js (test-all-print.js covers all pages)

### Latest Session: 2025-11-27 (Morning)
- ✅ Added QR code to CTA section (web: 200px, print: 80px)
- ✅ Created automated print test (`npm test`) - verifies 1-page constraint
- ✅ Restored CTA copy in print view while maintaining 1-page constraint
- ✅ Consolidated documentation - removed `.claude/` folder, README is now sole context file

### Key Implementation Details
- QR code from qr-code-generator.com (mailto:events@coloft.org)
- Print test uses puppeteer-core + system Chrome (no browser download)
- Print optimizations: reduced margins/padding, smaller QR/text sizes, hid values section

---

## Quick Start

**Print flyer:** Open [index.html](index.html) in browser → Print Preview → Save as PDF
**Test print constraint:** `npm test` (requires `npm install` first)
**Deploy:** Push to GitHub, enable Pages in repo settings

## Project Structure

```
/
├── index.html              # Main landing page
├── events/                 # Individual event pages
│   ├── somatic-colab.html
│   ├── coffee-connection.html
│   ├── sex-positive-friends.html
│   └── brews-without-booze.html
├── images/                 # All SVG images
│   ├── somatic-colab.svg
│   ├── coffee-connection.svg
│   ├── sex-positive-friends.svg
│   ├── brews-without-booze.svg
│   └── qr-code.svg
├── styles/                 # CSS files
│   ├── styles.css          # Main styles (web, mobile, print)
│   └── event-print.css     # Shared event page print styles
├── events.json             # Event data with calculated dates
├── test-all-print.js       # Automated test (all pages must fit on 1 page)
└── package.json            # NPM config (puppeteer-core only)
```

## Design Constraints (DO NOT CHANGE)

### Core Purpose
Landing page + printable flyers for local healing collective events
- Peer-led, grassroots, local to Humboldt County
- "We rise together" theme
- Not-for-money events and gatherings

### Fixed Elements
- **Color palette:** Purple `#7C3AED`, Green `#059669`, Cyan `#0891B2`, Terracotta `#DC6B4A`, Pink `#E91E63`, Amber `#F4B860`
- **"Co-" word theme:** co-llective, co-nnection, co-mmunity, co-nspirators throughout copy
- **Land acknowledgment:** Wiyot land, Goudi'ni (indigenous name for Arcata)
- **Four recurring events:** Somatic Co-Lab, Coffee & Connection, Sex Positive Friends, Brews Without Booze
- **Contact:** events@coloft.org

### Non-Negotiable Constraints
- **MUST fit on 1 page when printed** (US Letter, portrait)
- No browser headers/footers in print (`@page margin: 0`)
- Responsive: mobile, tablet, desktop
- Visual hierarchy: Icons PRIMARY, text secondary

### Print View Specifications
**What's shown:**
- Header: Logo (60px SVG) + "We Rise Together" + location
- Hero: Main collective message
- Events: All 4 event cards with icons (48px, 2-column grid)
- CTA: Full "Join Us" heading + paragraph + QR code (80px) + email
- Footer: Brief description

**What's hidden:**
- Contact button (QR code serves this purpose)

**Print margins:**
- Body: 0.3in
- Sections: 0.75rem
- CTA padding: 0.75rem

## Customization

### Colors
CSS variables in [styles.css](styles.css):
- Primary: `#7C3AED` (purple)
- Secondary: `#059669` (green)
- Accent: `#0891B2` (cyan)
- Terracotta: `#DC6B4A`

### Content
Edit [index.html](index.html) directly. No build process.

### Icons
All SVG icons inline in HTML for easy customization and perfect print reproduction.

## GitHub Pages Deployment

1. Push to GitHub
2. Settings → Pages → Source: `main` branch, `/` root
3. Site deploys to `https://[username].github.io/coloft/`

**Custom domain:** Add CNAME record pointing to `[username].github.io`

## Testing

```bash
npm install  # First time only
npm test     # Must pass with exactly 1 page
```

Uses `puppeteer-core` (6M+ weekly downloads, audited) to generate PDF and count pages.

## Contact

**events@coloft.org**
