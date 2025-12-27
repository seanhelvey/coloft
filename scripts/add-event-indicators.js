const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('/home/sean/Code/coloft/regional-calendar.html', 'utf8');

// Add emoji indicators to ALL event titles that don't have them
const lines = html.split('\n');
const updatedLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check if this is an h3 link without an emoji
    const h3Match = line.match(/<h3><a href="([^"]+)" target="_blank">([^<]+)<\/a><\/h3>/);

    if (h3Match && !h3Match[2].includes('🔄') && !h3Match[2].includes('🎪')) {
        const url = h3Match[1];
        const title = h3Match[2];

        // Look at next few lines for context to determine event type
        const context = lines.slice(i, Math.min(i + 5, lines.length)).join('\n');

        let emoji = '🔄'; // default to recurring

        // Check for workshop/retreat patterns
        if (/retreats throughout 2025|Sep \d+-\d+|Oct \d+-\d+|Workshop|Festival|Camp Northwest|4-day|6-day/i.test(context)) {
            emoji = '🎪';
        }
        // Strong indicators of recurring events
        else if (/Sundays|Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays|Weekly|First Sunday|Regular classes|Ongoing/i.test(context)) {
            emoji = '🔄';
        }

        line = line.replace(
            `<h3><a href="${url}" target="_blank">${title}</a></h3>`,
            `<h3><a href="${url}" target="_blank">${emoji} ${title}</a></h3>`
        );
    }

    updatedLines.push(line);
}

// Write the updated HTML
fs.writeFileSync('/home/sean/Code/coloft/regional-calendar.html', updatedLines.join('\n'), 'utf8');

console.log('Event indicators added successfully!');
