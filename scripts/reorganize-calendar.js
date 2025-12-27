const fs = require('fs');

const html = fs.readFileSync('/home/sean/Code/coloft/regional-calendar.html', 'utf8');

// Extract all region sections
const regionPattern = /<div class="region-section">\s*<h2>([^<]+)<\/h2>([\s\S]*?)(?=<div class="region-section">|<p style="margin-top: 2rem|<div style="background: #059669)/g;

const regions = [];
let match;
while ((match = regionPattern.exec(html)) !== null) {
    regions.push({
        name: match[1].trim(),
        content: match[0]
    });
}

console.log('Found regions:', regions.map(r => r.name));

// Define the correct order (North to South)
const oregonOrder = [
    'Portland, OR',
    'Hood River, OR',
    'Corvallis, OR',
    'Eugene, OR',
    'Sisters, OR',
    'Bend, OR',
    'Breitenbush Hot Springs, OR',
    'Rogue Valley, OR (Ashland/Medford/Grants Pass)',
    'Takilma/Williams, OR'
];

const californiaOrder = [
    'Humboldt County, CA',
    'Trinity County, CA',
    'Mt. Shasta, CA',
    'Butte County, CA',
    'Nevada County, CA (Nevada City/Grass Valley)',
    'Sonoma County, CA',
    'Mendocino County, CA',
    'West Marin, CA (Point Reyes/Bolinas/Stinson Beach)',
    'San Francisco Bay Area, CA',
    'Santa Cruz, CA',
    'Harbin Hot Springs, CA'
];

// Helper to find region by name
function findRegion(name) {
    return regions.find(r => r.name === name);
}

// Build reorganized content
let oregonContent = oregonOrder.map(name => {
    const region = findRegion(name);
    return region ? region.content : '';
}).filter(c => c).join('\n\n        ');

let californiaContent = californiaOrder.map(name => {
    const region = findRegion(name);
    return region ? region.content : '';
}).filter(c => c).join('\n\n        ');

console.log('Oregon regions found:', oregonOrder.filter(name => findRegion(name)).length);
console.log('California regions found:', californiaOrder.filter(name => findRegion(name)).length);

// Save the organized content for inspection
fs.writeFileSync('/home/sean/Code/coloft/oregon-content.html', oregonContent);
fs.writeFileSync('/home/sean/Code/coloft/california-content.html', californiaContent);

console.log('Content extracted and organized!');
