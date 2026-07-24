const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'regional-calendar.html'), 'utf8');

// Extract all region names in order
const regionPattern = /<div class="region-section"[^>]*>\s*<h2>([^<]+)<\/h2>/g;
const regions = [];
let match;

while ((match = regionPattern.exec(html)) !== null) {
    regions.push(match[1].trim());
}

console.log('📍 Region Order (North → South):\n');
console.log('🌲 OREGON:');
let californiaStarted = false;
let oregonCount = 0;
regions.forEach((region, index) => {
    if (region.includes('CA') && !californiaStarted) {
        console.log('\n🌊 CALIFORNIA:');
        californiaStarted = true;
        oregonCount = index;
    }
    const number = californiaStarted ? (index - oregonCount + 1) : (index + 1);
    console.log(`   ${number}. ${region}`);
});

console.log(`\n✅ Total: ${regions.length} regions`);
