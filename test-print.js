/**
 * Print page fit test for Coloft website
 * Run with: node test-print.js
 *
 * Uses puppeteer-core to render the page and check if print view fits on 1 page
 * Requires Chrome/Chromium to be installed on system
 */

const puppeteer = require('puppeteer-core');
const path = require('path');

function findChrome() {
  const paths = [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ];

  for (const p of paths) {
    try {
      require('fs').accessSync(p);
      return p;
    } catch {}
  }

  throw new Error('Chrome/Chromium not found. Install it or use full puppeteer package.');
}

async function testPrintFit() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: findChrome()
    });
    const page = await browser.newPage();

    // Load the local HTML file
    const htmlPath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    // Generate PDF with Letter size, portrait
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    // Get number of pages by checking PDF
    const pdfData = pdf.toString('utf-8');
    const pageCount = (pdfData.match(/\/Type\s*\/Page[^s]/g) || []).length;

    console.log(`📄 Print test results:`);
    console.log(`   Pages: ${pageCount}`);
    console.log(`   Status: ${pageCount === 1 ? '✅ PASS' : '❌ FAIL'}`);

    if (pageCount > 1) {
      console.log(`\n⚠️  Content overflows to ${pageCount} pages!`);
      console.log(`   Constraint violated: MUST fit on 1 page`);
      process.exit(1);
    }

    console.log(`\n✅ Print view fits on one page!`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('puppeteer')) {
      console.log('\n💡 Install puppeteer: npm install --save-dev puppeteer');
    }
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

testPrintFit();
