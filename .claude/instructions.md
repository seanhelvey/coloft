# Claude Instructions for Coloft Project

## Project Overview
Coloft is a grassroots healing collective in Arcata, CA (Goudi'ni, Wiyot Land). The website includes:
- **Local Events**: 3 recurring Humboldt County events with dynamic date calculation
- **Regional Calendar**: 37 transformational events across 10 regions (Oregon & Northern California)
  - Data stored in regional-events.json
  - HTML generated via build script: `npm run build:regional`

## Documentation Policy
- **NEVER** create additional markdown files (no CLEANUP_SUMMARY.md, NOTES.md, etc.)
- Documentation goes in **only two places**:
  - `.claude/instructions.md` (this file - AI context)
  - `README.md` (user documentation, includes guide for activating event schedules)

## Core Principles
- **Focus**: Connection, co-creation, community, collective healing
- **Quality**: Transformational modalities only (ecstatic dance, breathwork, somatic healing, connection practices, tantra, authentic relating)
- **Geography**: Oregon & Northern California within ~3 hours of Humboldt County
- **DRY**: No duplicate code, scripts in `/scripts/`, tests in `/tests/`

## Event Criteria
✅ **Include:**
- Ecstatic dance, 5Rhythms, Contact Improvisation
- Breathwork, somatic practices, embodiment work
- Authentic relating, circling, connection practices
- Tantra, sacred sexuality, polyamory/ENM community events
- Transformational festivals (Oregon Country Fair, New Culture, tantra festivals)
- Goddess temples, Red Tents, sacred feminine practices
- Consciousness communities (meditation sanghas, spiritual centers)
- Nature-based retreats with transformational focus

❌ **Exclude:**
- Generic yoga studios (unless somatic/transformational focus)
- Folk/swing dance (not transformational)
- Events >4hr from Humboldt or outside Oregon/Northern CA corridor
- Low-quality: vague schedules, only Facebook pages, unclear offerings
- Social media-only contact (prefer official websites, email, newsletters)

## Event Indicators
- 🔄 = Recurring (weekly/monthly)
- 🎪 = Workshops/retreats/festivals

## Tag Taxonomy
**Event Types** (use 1):
- `dance`, `connection`, `retreat`, `breathwork`, `consciousness`, `ritual`, `festival`, `music`

**Frequencies** (use 1):
- `weekly`, `monthly`, `annual`, `seasonal`

## Repository Structure
```
/
├── index.html              # Main landing page (Coloft local events)
├── regional-calendar.html  # Regional calendar (generated, don't edit directly!)
├── regional-events.json    # Regional event data (24 events, 10 regions)
├── events.json             # Local event metadata (not used by date calculation yet)
├── events/                 # Individual Coloft event pages with printable flyers
│   ├── somatic-lab.html
│   ├── munch.html
│   └── relating-games.html
├── images/                 # SVG images for events
├── styles/                 # CSS files
│   ├── styles.css          # Main styles + print styles for index
│   └── event-print.css     # Shared event flyer print styles
├── scripts/                # Maintenance & build scripts
│   ├── dates.js            # Browser-side dynamic date calculations (local events)
│   ├── build-regional-calendar.js  # Build regional-calendar.html from JSON
│   ├── verify-order.js     # Validate north→south region ordering
│   ├── validate-links.js   # Check all external URLs
│   ├── validate-event-data.js  # Validate regional event data quality
│   └── check-stale-dates.js    # Identify events needing quarterly updates
├── tests/                  # Automated tests
│   ├── test-all-print.js   # Verify 1-page print constraint
│   └── test-dates.js       # Verify date calculations
├── .claude/                # Claude context
│   ├── instructions.md     # This file - AI assistant guidelines
│   └── settings.local.json # Permissions for Claude Code
├── package.json            # NPM scripts and dependencies
└── README.md               # User documentation (includes activation guide)
```

## Maintenance Commands
```bash
# Data validation & building
npm run validate-data       # Validate regional event data quality
npm run build:regional      # Build regional-calendar.html from JSON
npm run verify-calendar     # Check region ordering (north→south)
npm run validate-links      # Check all external URLs (~1 min)
npm run check-stale-dates   # Identify events needing quarterly updates

# Testing
npm test                    # Run all tests (print + dates)
npm run test:print          # Test print constraint only
npm run test:dates          # Test date calculations only
```

## Design Constraints (DO NOT CHANGE)
- **Print constraint**: All event flyers must fit on 1 page (US Letter, portrait)
- **No frameworks**: Pure HTML/CSS/JS
- **Mobile responsive**: Works beautifully on all devices
- **Static site**: Deploys to GitHub Pages
- **Progressive enhancement**: Core content works without JavaScript

## Architecture

### Local Events (3 events)
- **Somatic Lab Loft Sessions**: Select Sundays at 6:00 PM (starts Jan 25, 2026)
- **Munch**: Every Tuesday at 5:30 PM (starts Jan 13, 2026)
- **Relating Games**: Every other Saturday at 3:00 PM (starts Jan 24, 2026)
- **Static HTML** with embedded metadata in index.html and events/*.html
- **Dynamic dates**: scripts/dates.js calculates "Next 3 occurrences" in browser on page load
- **Configuration**: EVENT_SCHEDULES object at top of scripts/dates.js
- **Always fresh**: Dates never go stale, no rebuild needed

### Regional Events (24 events, 10 regions)
- **Static build**: regional-calendar.html generated from regional-events.json
- **Recurring patterns**: 75% use patterns that never go stale ("Tuesdays, 6-8:30 PM")
- **Quarterly updates**: 25% need date updates (annual festivals, seasonal retreats)
- **Automated detection**: npm run check-stale-dates identifies events needing updates
- **Client-side filtering**: JavaScript AND-logic filtering by region/type/frequency

## Common Tasks

### Activating a Local Event Schedule
When ready to publish a specific event schedule:
1. See README.md "Activating Local Event Schedules" section for detailed instructions
2. Update index.html (change "Schedule TBD" to actual schedule)
3. Verify scripts/dates.js EVENT_SCHEDULES configuration
4. Update individual event page (events/*.html)
5. Refresh page - dates appear dynamically!

### Adding a Regional Event
1. Edit `regional-events.json` and find the correct region (north→south order)
2. Add event to the region's events array:
```json
{
  "name": "🔄 Event Name",
  "url": "https://example.com",
  "schedule": "Wednesdays, 7-10 PM",
  "venue": "Venue Name, City",
  "price": "$15-$20",
  "description": "Optional description with email, newsletter, phone",
  "tags": ["dance", "weekly"]
}
```
3. Validate: `npm run validate-data`
4. Build: `npm run build:regional`
5. Verify: `npm run verify-calendar`
6. Test: `npm test`

**IMPORTANT**: Never edit regional-calendar.html directly - always edit regional-events.json and rebuild

### Quarterly Maintenance
1. Run `npm run check-stale-dates` to find events needing updates
2. Visit event URLs and update dates in regional-events.json
3. Run `npm run validate-links` to check for broken links
4. Review and prune inactive events
5. Search for new events in underrepresented regions
6. Rebuild: `npm run validate-data && npm run build:regional && npm test`

## Quality Standards
- **Required fields**: name, url, schedule, venue, price, tags
- **Tag structure**: Exactly 1 event type + 1 frequency (e.g., ["dance", "weekly"])
- **Emoji indicators**: 🔄 for weekly/monthly, 🎪 for retreats/festivals
- **Reliable**: Established organizations, clear schedules
- **Transformational**: Focus on healing, connection, consciousness
- **Accessible**: Pricing info, location details, contact methods
- **Community resources**: Prefer email/newsletter over social media

## Geographic Regions (North to South)
**Oregon (3)**:
1. Portland, OR
2. Eugene & Central Oregon
3. Rogue Valley, OR (Ashland/Medford/Grants Pass)

**California (7)**:
4. Humboldt County, CA
5. Redding & Shasta County, CA
6. Mt. Shasta, CA
7. Chico & Northern Sacramento Valley, CA
8. Sonoma, Mendocino & Lake Counties, CA
9. San Francisco Bay Area, CA
10. Santa Cruz, CA

## Current Status (2026-01-17)
- **Local events**: 3 active events with dynamic date calculation
  - Somatic Lab Loft Sessions (Select Sundays)
  - Munch (Every Tuesday)
  - Relating Games (Every Other Saturday)
- **Regional calendar**: 36 events across 10 regions, all tests passing
- **Data quality**: Automated validation in place
- **Maintenance**: Quarterly workflow documented
- **Tests**: All passing (print constraint + date calculations)
- **Documentation**: Complete and up-to-date

## Search Strategies
Use these terms when researching new events:
- "[city] ecstatic dance OR 5rhythms OR conscious dance"
- "[city] authentic relating OR circling"
- "[city] contact improvisation"
- "[city] tantra OR sacred sexuality"
- "[city] breathwork OR somatic"
- "[city] polyamory OR ethical non-monogamy community"
- "transformational festivals [region]"

## Avoiding Stale Events
Before adding any new event to the regional calendar:
1. **Verify the event is currently active** - Check that it doesn't show "ended", "cancelled", or past dates only
2. **Check the venue's current schedule** - Confirm the event appears on the venue's website or calendar
3. **Look for recent activity** - Prefer events with dates in the current or upcoming months
4. **Avoid event aggregator pages** - These often show outdated listings; verify on the primary source
5. **Check multiple sources** - If one source shows the event ended, don't add it even if another mentions it
6. **When in doubt, skip it** - Better to miss a real event than add a stale one that confuses users
