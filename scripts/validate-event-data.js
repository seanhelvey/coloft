#!/usr/bin/env node

/**
 * Validates regional event data quality
 * Ensures all events have required fields and correct formatting
 */

const fs = require('fs');
const path = require('path');

// Valid tags based on current taxonomy
const VALID_EVENT_TYPES = ['dance', 'connection', 'retreat', 'breathwork', 'consciousness', 'ritual', 'festival', 'music'];
const VALID_FREQUENCIES = ['weekly', 'monthly', 'annual', 'seasonal'];
const VALID_TAGS = [...VALID_EVENT_TYPES, ...VALID_FREQUENCIES];

// Required fields for all events
const REQUIRED_FIELDS = ['name', 'url', 'schedule', 'venue', 'price', 'tags'];

let hasErrors = false;

function error(regionName, eventName, message) {
  console.error(`❌ [${regionName}] ${eventName}: ${message}`);
  hasErrors = true;
}

function warning(regionName, eventName, message) {
  console.warn(`⚠️  [${regionName}] ${eventName}: ${message}`);
}

function validateEvent(event, regionName) {
  const eventName = event.name || '(unnamed event)';

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!event[field]) {
      error(regionName, eventName, `Missing required field: ${field}`);
    }
  }

  // Validate URL format
  if (event.url) {
    try {
      new URL(event.url);
      if (event.url.includes('facebook.com') || event.url.includes('instagram.com')) {
        warning(regionName, eventName, 'Social media URL detected (prefer official websites)');
      }
    } catch (e) {
      error(regionName, eventName, `Invalid URL: ${event.url}`);
    }
  }

  // Validate tags
  if (event.tags) {
    if (!Array.isArray(event.tags)) {
      error(regionName, eventName, 'Tags must be an array');
    } else {
      // Check for duplicates
      const uniqueTags = [...new Set(event.tags)];
      if (uniqueTags.length !== event.tags.length) {
        error(regionName, eventName, `Duplicate tags found: ${JSON.stringify(event.tags)}`);
      }

      // Check for invalid tags
      for (const tag of event.tags) {
        if (!VALID_TAGS.includes(tag)) {
          error(regionName, eventName, `Invalid tag: "${tag}". Valid tags: ${VALID_TAGS.join(', ')}`);
        }
      }

      // Check tag structure (should have event type + frequency)
      const hasEventType = event.tags.some(tag => VALID_EVENT_TYPES.includes(tag));
      const hasFrequency = event.tags.some(tag => VALID_FREQUENCIES.includes(tag));

      if (!hasEventType) {
        warning(regionName, eventName, 'No event type tag (dance, connection, retreat, etc.)');
      }
      if (!hasFrequency) {
        warning(regionName, eventName, 'No frequency tag (weekly, monthly, annual, seasonal)');
      }
    }
  }

  // Validate emoji indicators
  if (event.name) {
    const isRecurring = event.tags && (event.tags.includes('weekly') || event.tags.includes('monthly'));
    const isWorkshop = event.tags && (event.tags.includes('retreat') || event.tags.includes('festival'));

    if (isRecurring && !event.name.includes('🔄')) {
      warning(regionName, eventName, 'Recurring event missing 🔄 emoji');
    }
    if (isWorkshop && !event.name.includes('🎪')) {
      warning(regionName, eventName, 'Workshop/retreat/festival missing 🎪 emoji');
    }
  }

  // Validate schedule format
  if (event.schedule) {
    const hasTime = /\d{1,2}(:\d{2})?\s*(AM|PM|am|pm)/.test(event.schedule);
    if (!hasTime && !event.tags?.includes('annual') && !event.tags?.includes('seasonal')) {
      warning(regionName, eventName, 'Schedule missing time information');
    }
  }

  // Check for community resources
  if (event.description) {
    if (event.description.includes('facebook.com') || event.description.includes('instagram.com')) {
      warning(regionName, eventName, 'Social media links in description (prefer email/newsletter/phone)');
    }
  }
}

function validateRegionalEvents() {
  const dataPath = path.join(__dirname, '..', 'regional-events.json');

  console.log('🔍 Validating regional event data...\n');

  let data;
  try {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (e) {
    console.error(`❌ Failed to parse regional-events.json: ${e.message}`);
    process.exit(1);
  }

  if (!data.regions || !Array.isArray(data.regions)) {
    console.error('❌ JSON must contain a "regions" array');
    process.exit(1);
  }

  let totalEvents = 0;
  for (const region of data.regions) {
    const regionName = region.name || '(unnamed region)';

    if (!region.events || !Array.isArray(region.events)) {
      error(regionName, '', 'Region must have an "events" array');
      continue;
    }

    if (region.events.length === 0) {
      warning(regionName, '', 'Empty region (no events)');
    }

    for (const event of region.events) {
      validateEvent(event, regionName);
      totalEvents++;
    }
  }

  console.log(`\n✅ Validation complete: ${totalEvents} events across ${data.regions.length} regions`);

  if (hasErrors) {
    console.error('\n❌ Validation failed with errors');
    process.exit(1);
  } else {
    console.log('✅ All validation checks passed');
  }
}

validateRegionalEvents();
