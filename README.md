# Coloft - We Rise Together

A vibrant static website for Coloft, a grassroots healing **co**llective in Arcata, CA (Goudi'ni, Wiyot Land).

---

## 📝 Session Notes (for Claude)

**This README is the single source of truth for project context.**

### Latest Session: 2025-11-27
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

## Project Files

- `index.html` - Main HTML structure
- `styles.css` - All styling (web, mobile, print)
- `qr-code.svg` - QR code for mailto:events@coloft.org (from qr-code-generator.com)
- `test-print.js` - Automated test verifying 1-page print constraint
- `package.json` - NPM config (puppeteer-core for testing only)

## Design Constraints (DO NOT CHANGE)

### Core Purpose
Landing page + printable flyer for somatic practices collective
- Peer-led, grassroots, local to Humboldt County
- "We rise together" theme
- Not-for-money events and gatherings

### Fixed Elements
- **Color palette:** Purple `#7C3AED`, Green `#059669`, Cyan `#0891B2`, Terracotta `#DC6B4A`
- **"Co-" word theme:** co-llective, co-nnection, co-mmunity, co-nspirators throughout copy
- **Land acknowledgment:** Wiyot land, Goudi'ni (indigenous name for Arcata)
- **Four practices:** Breathwork, Community Gatherings, Therapeutic Integration, Healing Circles
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
- Practices: All 4 cards with icons (48px, 2-column grid)
- CTA: Full "Join Us" heading + paragraph + QR code (80px) + email
- Footer: Brief description

**What's hidden:**
- Values section (saves space)
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
