#!/usr/bin/env node

/**
 * Identifies events with specific dates that may need updating
 * Run quarterly to find annual festivals and seasonal retreats needing date updates
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'regional-events.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🔍 Checking for events with specific dates that may need quarterly updates...\n');

// Current year for comparison
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // 1-12

let annualEvents = [];
let seasonalEvents = [];
let specificDateEvents = [];

for (const region of data.regions) {
  for (const event of region.events) {
    const schedule = event.schedule || '';

    // Check if schedule contains a year
    const yearMatch = schedule.match(/\b(20\d{2})\b/);

    // Check for month names (indicates specific dates)
    const monthMatch = schedule.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i);

    if (event.tags.includes('annual') || event.tags.includes('festival')) {
      annualEvents.push({
        region: region.name,
        name: event.name,
        schedule: schedule,
        url: event.url,
        year: yearMatch ? yearMatch[1] : null,
        hasMonth: !!monthMatch
      });
    } else if (event.tags.includes('seasonal')) {
      seasonalEvents.push({
        region: region.name,
        name: event.name,
        schedule: schedule,
        url: event.url,
        year: yearMatch ? yearMatch[1] : null,
        hasMonth: !!monthMatch
      });
    } else if (monthMatch || yearMatch) {
      // Weekly/monthly events with specific dates (unusual, may need attention)
      specificDateEvents.push({
        region: region.name,
        name: event.name,
        schedule: schedule,
        url: event.url,
        year: yearMatch ? yearMatch[1] : null
      });
    }
  }
}

// Report annual events
if (annualEvents.length > 0) {
  console.log('📅 ANNUAL FESTIVALS (update dates every January):');
  console.log('─'.repeat(70));
  for (const event of annualEvents) {
    const status = event.year && parseInt(event.year) < currentYear ? '⚠️  OUTDATED' :
                   event.year && parseInt(event.year) === currentYear ? '✅ CURRENT' :
                   event.year && parseInt(event.year) > currentYear ? '📌 FUTURE' :
                   '⚠️  NO YEAR';

    console.log(`${status} [${event.region}]`);
    console.log(`   ${event.name}`);
    console.log(`   Schedule: ${event.schedule}`);
    console.log(`   Check: ${event.url}\n`);
  }
}

// Report seasonal events
if (seasonalEvents.length > 0) {
  console.log('\n🍂 SEASONAL RETREATS (update dates quarterly):');
  console.log('─'.repeat(70));
  for (const event of seasonalEvents) {
    const status = event.year && parseInt(event.year) < currentYear ? '⚠️  OUTDATED' :
                   event.year && parseInt(event.year) === currentYear ? '✅ CURRENT' :
                   event.year && parseInt(event.year) > currentYear ? '📌 FUTURE' :
                   '⚠️  NO YEAR';

    console.log(`${status} [${event.region}]`);
    console.log(`   ${event.name}`);
    console.log(`   Schedule: ${event.schedule}`);
    console.log(`   Check: ${event.url}\n`);
  }
}

// Report unusual specific dates
if (specificDateEvents.length > 0) {
  console.log('\n⚠️  RECURRING EVENTS WITH SPECIFIC DATES (review - may need pattern instead):');
  console.log('─'.repeat(70));
  for (const event of specificDateEvents) {
    console.log(`[${event.region}] ${event.name}`);
    console.log(`   Schedule: ${event.schedule}`);
    console.log(`   Consider using pattern like "Sundays" instead of specific dates\n`);
  }
}

// Summary
const totalNeedingUpdates = annualEvents.length + seasonalEvents.length;
console.log('\n' + '═'.repeat(70));
console.log(`📊 SUMMARY: ${totalNeedingUpdates} events need quarterly date updates`);
console.log(`   • ${annualEvents.length} annual festivals`);
console.log(`   • ${seasonalEvents.length} seasonal retreats`);
if (specificDateEvents.length > 0) {
  console.log(`   • ${specificDateEvents.length} recurring events with specific dates (review)`);
}

console.log('\n💡 TIP: Update dates 3-6 months before events when organizers announce dates');
console.log('📅 Next quarterly check: Jan 1, Apr 1, Jul 1, Oct 1');
console.log('═'.repeat(70));
