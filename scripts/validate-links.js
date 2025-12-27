#!/usr/bin/env node

/**
 * Validates all external links in regional-calendar.html
 * Checks HTTP status codes and reports broken/redirected links
 *
 * Usage: node scripts/validate-links.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CALENDAR_FILE = path.join(__dirname, '../regional-calendar.html');
const TIMEOUT_MS = 10000; // 10 second timeout per request

// Extract all URLs from href attributes
function extractUrls(html) {
  const urlPattern = /href="(https?:\/\/[^"]+)"/g;
  const urls = new Set();
  let match;

  while ((match = urlPattern.exec(html)) !== null) {
    urls.add(match[1]);
  }

  return Array.from(urls).sort();
}

// Check URL with HEAD request (faster than GET)
function checkUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      method: 'HEAD',
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      timeout: TIMEOUT_MS,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkValidator/1.0)'
      }
    };

    const req = client.request(options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        location: res.headers.location,
        ok: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 0,
        error: err.message,
        ok: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        error: 'Request timeout',
        ok: false
      });
    });

    req.end();
  });
}

// Main validation
async function validateLinks() {
  console.log('🔍 Reading regional-calendar.html...\n');

  const html = fs.readFileSync(CALENDAR_FILE, 'utf8');
  const urls = extractUrls(html);

  console.log(`Found ${urls.length} unique URLs to check\n`);
  console.log('⏳ Validating links (this may take a minute)...\n');

  const results = [];

  // Check URLs sequentially to avoid overwhelming servers
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] Checking: ${url.substring(0, 60)}...`);

    const result = await checkUrl(url);
    results.push(result);

    if (result.ok) {
      console.log(' ✅');
    } else if (result.status >= 300 && result.status < 400) {
      console.log(` ⚠️  ${result.status} (redirect)`);
    } else {
      console.log(` ❌ ${result.error || result.status}`);
    }

    // Small delay to be respectful to servers
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 VALIDATION SUMMARY\n');

  const ok = results.filter(r => r.ok);
  const redirects = results.filter(r => r.status >= 300 && r.status < 400);
  const broken = results.filter(r => !r.ok);

  console.log(`✅ Working: ${ok.length}`);
  console.log(`⚠️  Redirects: ${redirects.length}`);
  console.log(`❌ Broken: ${broken.length}`);

  if (redirects.length > 0) {
    console.log('\n📍 REDIRECTS (may need updating):');
    redirects.forEach(r => {
      console.log(`  ${r.status} ${r.url}`);
      if (r.location) {
        console.log(`    → ${r.location}`);
      }
    });
  }

  if (broken.length > 0) {
    console.log('\n💥 BROKEN LINKS (need attention):');
    broken.forEach(r => {
      console.log(`  ❌ ${r.url}`);
      console.log(`     ${r.error || `HTTP ${r.status}`}`);
    });
  }

  console.log('\n' + '='.repeat(80));

  // Exit with error if broken links found
  if (broken.length > 0) {
    console.log('\n⚠️  Some links are broken. Please review and update.');
    process.exit(1);
  } else {
    console.log('\n✨ All links are valid!');
    process.exit(0);
  }
}

// Run validation
validateLinks().catch(err => {
  console.error('\n❌ Validation failed:', err);
  process.exit(1);
});
