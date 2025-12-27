const fs = require('fs');

// Read the regional events data
const data = JSON.parse(fs.readFileSync('/home/sean/Code/coloft/regional-events.json', 'utf8'));

// Helper function to generate region section HTML
function generateRegionHTML(region) {
    const events = region.events.map(event => {
        const description = event.description
            ? `\n                <p class="event-meta" style="margin-top: 0.3rem; font-size: 0.8rem;">${event.description}</p>`
            : '';

        const tags = event.tags || [];
        // Add region tag to each event
        const allTags = [...tags, `region-${region.id}`];
        const tagAttributes = allTags.map(t => `data-tag-${t}="true"`).join(' ');

        return `            <div class="event-item" ${tagAttributes}>
                <h3><a href="${event.url}" target="_blank">${event.name}</a></h3>
                <p class="event-meta"><strong>When:</strong> ${event.schedule} | <strong>Where:</strong> ${event.venue} | <span class="event-price">${event.price}</span></p>${description}
            </div>`;
    }).join('\n');

    return `
<div class="region-section" id="${region.id}">
            <h2>${region.name}</h2>
${events}
        </div>`;
}

// Separate regions by state
const oregonRegions = data.regions.filter(r => r.state === 'oregon');
const californiaRegions = data.regions.filter(r => r.state === 'california');

// Generate all region sections
const oregonSections = oregonRegions.map(generateRegionHTML).join('\n\n');
const californiaSections = californiaRegions.map(generateRegionHTML).join('\n\n');

// Complete HTML template
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regional Community Calendar - Coloft</title>
    <link rel="stylesheet" href="styles/styles.css">
    <style>
        body {
            --page-primary: #7C3AED;
            --page-secondary: #E8926C;
        }
        .calendar-hero {
            background: linear-gradient(135deg, var(--page-primary) 0%, var(--page-secondary) 100%);
            color: white;
            padding: 2rem 1.5rem;
            text-align: center;
        }
        .calendar-hero h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            font-weight: 800;
        }
        .calendar-hero .tagline {
            font-size: 1.1rem;
            font-weight: 600;
            color: white;
        }
        .calendar-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 1.5rem 1rem;
        }
        .region-section {
            margin-bottom: 1.5rem;
        }
        .region-section h2 {
            color: var(--page-primary);
            font-size: 1.3rem;
            margin-bottom: 0.75rem;
            border-bottom: 2px solid var(--page-primary);
            padding-bottom: 0.25rem;
        }
        .event-item {
            background: white;
            border-left: 4px solid var(--page-secondary);
            padding: 0.75rem;
            margin-bottom: 0.75rem;
            border-radius: 4px;
        }
        .event-item h3 {
            color: var(--text-dark);
            font-size: 1rem;
            margin-bottom: 0.3rem;
        }
        .event-item h3 a {
            color: var(--text-dark);
            text-decoration: none;
        }
        .event-item h3 a:hover {
            color: var(--page-primary);
            text-decoration: underline;
        }
        .event-meta {
            font-size: 0.85rem;
            color: var(--text-dark);
            margin: 0.2rem 0;
        }
        .event-meta strong {
            color: var(--page-primary);
        }
        .event-price {
            font-size: 0.8rem;
            color: #666;
            font-style: italic;
        }
        .back-link {
            display: inline-block;
            margin: 1.5rem 0;
            color: var(--page-primary);
            text-decoration: none;
            font-weight: 700;
        }
        .back-link:hover {
            text-decoration: underline;
        }
        .nav-bar {
            background: white;
            border-bottom: 3px solid var(--page-primary);
            padding: 1rem;
            text-align: center;
        }
        .nav-bar a {
            color: var(--page-primary);
            text-decoration: none;
            font-weight: 700;
        }
        .nav-bar a:hover {
            text-decoration: underline;
        }
        .filter-container {
            background: white;
            border: 2px solid var(--page-primary);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
        }
        .filter-container h3 {
            color: var(--page-primary);
            margin: 0 0 0.75rem 0;
            font-size: 1.1rem;
        }
        .filter-group {
            margin-bottom: 0.75rem;
        }
        .filter-group label {
            font-weight: 600;
            color: var(--text-dark);
            display: block;
            margin-bottom: 0.25rem;
            font-size: 0.9rem;
        }
        .filter-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .filter-tag {
            padding: 0.4rem 0.8rem;
            border: 2px solid var(--page-secondary);
            border-radius: 20px;
            background: white;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.2s;
        }
        .filter-tag:hover {
            background: #fef3ee;
        }
        .filter-tag.active {
            background: var(--page-secondary);
            color: white;
        }
        .filter-controls {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.75rem;
        }
        .filter-controls button {
            padding: 0.4rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.2s;
        }
        .filter-controls .clear-btn {
            background: #e0e0e0;
            color: #333;
        }
        .filter-controls .clear-btn:hover {
            background: #d0d0d0;
        }
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--page-primary);
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 1000;
            font-size: 1.5rem;
            text-decoration: none;
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            background: var(--page-secondary);
            transform: translateY(-3px);
        }
        .event-item.hidden {
            display: none;
        }
        .region-section.all-hidden {
            display: none;
        }
        @media (max-width: 768px) {
            .calendar-hero h1 {
                font-size: 1.5rem;
            }
            .calendar-hero .tagline {
                font-size: 0.95rem;
            }
            .calendar-content {
                padding: 1rem 0.75rem;
            }
            .region-section h2 {
                font-size: 1.1rem;
            }
            .event-item {
                padding: 0.6rem;
            }
            .event-meta {
                font-size: 0.8rem;
            }
            /* Make visual map stack on mobile */
            .calendar-content > div[style*="grid-template-columns: 1fr 1fr"] {
                display: block !important;
            }
            .calendar-content > div[style*="grid-template-columns: 1fr 1fr"] > div {
                margin-bottom: 1rem;
            }
        }
        @media print {
            * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .nav-bar {
                display: none;
            }
            .calendar-hero {
                padding: 0.5rem;
            }
            .calendar-hero h1 {
                font-size: 1.3rem;
                margin-bottom: 0.25rem;
            }
            .calendar-hero .tagline {
                font-size: 0.9rem;
            }
            .calendar-content {
                padding: 0.3rem;
            }
            .region-section {
                margin-bottom: 0.6rem;
            }
            .region-section h2 {
                font-size: 0.95rem;
                margin-bottom: 0.3rem;
                padding-bottom: 0.1rem;
            }
            .event-item {
                padding: 0.35rem 0.5rem;
                margin-bottom: 0.35rem;
                page-break-inside: avoid;
            }
            .event-item h3 {
                font-size: 0.85rem;
                margin-bottom: 0.15rem;
            }
            .event-meta {
                font-size: 0.7rem;
                margin: 0.1rem 0;
            }
            .event-price {
                font-size: 0.65rem;
            }
            .calendar-content > p {
                font-size: 0.7rem;
                padding: 0.5rem;
                margin-top: 0.75rem;
            }
            .back-link {
                display: none;
            }
        }
    </style>
</head>
<body>
    <nav class="nav-bar">
        <a href="index.html">← Back to Coloft Events</a>
    </nav>

    <div class="calendar-hero">
        <h1>Regional Community Calendar</h1>
        <p class="tagline">Transformational events across Oregon & Northern California—dance, connection practices, retreats & festivals</p>
    </div>

    <div class="calendar-content">

        <div style="background: linear-gradient(135deg, #E8926C 0%, #7C3AED 100%); color: white; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">How to Use This Calendar</h3>
            <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;">
                <strong>🔄 Weekly/Monthly</strong> = Recurring events • <strong>🎪 Workshop/Retreat</strong> = One-time or seasonal events<br>
                Regions organized <strong>North to South</strong> for easy trip planning. Click event links to verify schedules before traveling.
            </p>
        </div>

        <div class="filter-container">
            <h3>🔍 Filter Events</h3>

            <div class="filter-group">
                <label>📍 Regions:</label>
                <div class="filter-tags">
                    <span class="filter-tag" data-filter="region-portland-or">Portland</span>
                    <span class="filter-tag" data-filter="region-eugene-central-oregon">Eugene & Central OR</span>
                    <span class="filter-tag" data-filter="region-rogue-valley-or-ashlandmedfordgrants-pass">Rogue Valley</span>
                    <span class="filter-tag" data-filter="region-humboldt-county-ca">Humboldt</span>
                    <span class="filter-tag" data-filter="region-mt-shasta-ca">Shasta</span>
                    <span class="filter-tag" data-filter="region-sonoma-mendocino-lake-counties-ca">Sonoma/Mendo/Lake</span>
                    <span class="filter-tag" data-filter="region-san-francisco-bay-area-ca">Bay Area</span>
                    <span class="filter-tag" data-filter="region-santa-cruz-ca">Santa Cruz</span>
                </div>
            </div>

            <div class="filter-group">
                <label>Event Type:</label>
                <div class="filter-tags">
                    <span class="filter-tag" data-filter="dance">Dance</span>
                    <span class="filter-tag" data-filter="connection">Connection</span>
                    <span class="filter-tag" data-filter="retreat">Retreat</span>
                    <span class="filter-tag" data-filter="breathwork">Breathwork</span>
                    <span class="filter-tag" data-filter="festival">Festival</span>
                    <span class="filter-tag" data-filter="music">Music</span>
                    <span class="filter-tag" data-filter="consciousness">Consciousness</span>
                    <span class="filter-tag" data-filter="ritual">Ritual</span>
                </div>
            </div>

            <div class="filter-group">
                <label>Frequency:</label>
                <div class="filter-tags">
                    <span class="filter-tag" data-filter="weekly">Weekly</span>
                    <span class="filter-tag" data-filter="monthly">Monthly</span>
                    <span class="filter-tag" data-filter="annual">Annual</span>
                    <span class="filter-tag" data-filter="seasonal">Seasonal</span>
                </div>
            </div>

            <div class="filter-controls">
                <button class="clear-btn" onclick="clearFilters()">Clear All Filters</button>
            </div>
        </div>

        <div style="background: #059669; color: white; padding: 0.75rem 1rem; margin: 2rem 0 1rem 0; border-radius: 6px; font-weight: 800; font-size: 1.2rem; text-align: center;">
            🌲 OREGON
        </div>

${oregonSections}


        <div style="background: #DC6B4A; color: white; padding: 0.75rem 1rem; margin: 2rem 0 1rem 0; border-radius: 6px; font-weight: 800; font-size: 1.2rem; text-align: center;">
            🌊 CALIFORNIA
        </div>

${californiaSections}


        <p style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px; font-size: 0.9rem;">
            <strong>Note:</strong> All events and schedules are subject to change. Please click event links to verify current details, dates, and any updates before traveling. This calendar is maintained to help Humboldt County residents plan regional trips around multiple movement events.
        </p>

        <a href="index.html" class="back-link">← Back to Coloft Events</a>
    </div>

    <a href="#" class="back-to-top" id="backToTop">↑</a>

    <script>
        // Filter functionality
        const activeFilters = new Set();

        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const filter = this.dataset.filter;

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    activeFilters.delete(filter);
                } else {
                    this.classList.add('active');
                    activeFilters.add(filter);
                }

                applyFilters();
            });
        });

        function clearFilters() {
            activeFilters.clear();
            document.querySelectorAll('.filter-tag.active').forEach(tag => {
                tag.classList.remove('active');
            });
            applyFilters();
        }

        function applyFilters() {
            const events = document.querySelectorAll('.event-item');

            if (activeFilters.size === 0) {
                // No filters active - show all events
                events.forEach(event => event.classList.remove('hidden'));
                document.querySelectorAll('.region-section').forEach(section => {
                    section.classList.remove('all-hidden');
                });
                return;
            }

            // Group filters by category (region-, event type, frequency)
            const regionFilters = new Set();
            const typeFilters = new Set();
            const frequencyFilters = new Set();

            activeFilters.forEach(filter => {
                if (filter.startsWith('region-')) {
                    regionFilters.add(filter);
                } else if (['dance', 'connection', 'retreat', 'breathwork', 'consciousness', 'ritual', 'festival', 'music'].includes(filter)) {
                    typeFilters.add(filter);
                } else if (['weekly', 'monthly', 'annual', 'seasonal'].includes(filter)) {
                    frequencyFilters.add(filter);
                }
            });

            // Apply filters: OR within category, AND across categories
            events.forEach(event => {
                const eventTags = Array.from(event.attributes)
                    .filter(attr => attr.name.startsWith('data-tag-'))
                    .map(attr => attr.name.replace('data-tag-', ''));

                let matches = true;

                // Check region filters (OR logic - match ANY selected region)
                if (regionFilters.size > 0) {
                    const hasRegion = Array.from(regionFilters).some(filter =>
                        eventTags.includes(filter)
                    );
                    matches = matches && hasRegion;
                }

                // Check type filters (OR logic - match ANY selected type)
                if (typeFilters.size > 0) {
                    const hasType = Array.from(typeFilters).some(filter =>
                        eventTags.includes(filter)
                    );
                    matches = matches && hasType;
                }

                // Check frequency filters (OR logic - match ANY selected frequency)
                if (frequencyFilters.size > 0) {
                    const hasFrequency = Array.from(frequencyFilters).some(filter =>
                        eventTags.includes(filter)
                    );
                    matches = matches && hasFrequency;
                }

                if (matches) {
                    event.classList.remove('hidden');
                } else {
                    event.classList.add('hidden');
                }
            });

            // Hide regions with no visible events
            document.querySelectorAll('.region-section').forEach(section => {
                const visibleEvents = section.querySelectorAll('.event-item:not(.hidden)');
                if (visibleEvents.length === 0) {
                    section.classList.add('all-hidden');
                } else {
                    section.classList.remove('all-hidden');
                }
            });
        }

        // Back to top functionality
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    </script>
</body>
</html>
`;

// Write the generated HTML to the file
fs.writeFileSync('/home/sean/Code/coloft/regional-calendar.html', html, 'utf8');

console.log('✅ Successfully built regional-calendar.html from regional-events.json');
console.log(`📊 Generated ${data.regions.length} regions (${oregonRegions.length} OR, ${californiaRegions.length} CA)`);

// Count total events
const totalEvents = data.regions.reduce((sum, region) => sum + region.events.length, 0);
console.log(`🎉 Total events: ${totalEvents}`);
