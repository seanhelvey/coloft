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

  throw new Error('Chrome/Chromium not found');
}

async function testPage(browser, filename) {
  const page = await browser.newPage();

  const htmlPath = 'file://' + path.resolve(__dirname, '..', filename);
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({
    format: 'Letter',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  const pdfData = pdf.toString('utf-8');
  const pageCount = (pdfData.match(/\/Type\s*\/Page[^s]/g) || []).length;

  await page.close();
  return pageCount;
}

async function testAllPages() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: findChrome()
    });

    const pages = [
      'index.html',
      'events/somatic-colab.html',
      'events/coffee-connection.html',
      'events/sex-positive-friends.html',
      'events/brews-without-booze.html'
    ];

    console.log('📄 Testing all pages:\n');
    let allPass = true;

    for (const pageName of pages) {
      const pageCount = await testPage(browser, pageName);
      const status = pageCount === 1 ? '✅ PASS' : '❌ FAIL';
      console.log(`   ${pageName.padEnd(30)} ${pageCount} page(s) ${status}`);
      if (pageCount !== 1) allPass = false;
    }

    console.log('');
    if (allPass) {
      console.log('✅ All pages fit on one page!');
    } else {
      console.log('❌ Some pages overflow!');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

testAllPages();
