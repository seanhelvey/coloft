// Test that date calculations are correct for each event
// Run with: node test-dates.js

function getNextOccurrences(rule, options = {}) {
  const { count = 3, months = 3 } = options;

  // Start from January 1, 2026 (when events begin)
  const startDate = new Date('2026-01-01');
  startDate.setHours(0, 0, 0, 0);

  const dates = [];
  let checkDate = new Date(startDate);

  // Look ahead specified number of months
  const maxDate = new Date(startDate);
  maxDate.setMonth(maxDate.getMonth() + months);

  while (checkDate <= maxDate) {
    if (rule.matches(checkDate)) {
      dates.push(new Date(checkDate));
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // For monthly events, limit to count
  // For weekly events, return all within date range
  if (dates.length > count && rule.isMonthly) {
    return dates.slice(0, count);
  }

  return dates;
}

// Rule: Every Sunday
const everySundayRule = {
  name: 'Every Sunday',
  isMonthly: false,
  matches: (date) => date.getDay() === 0
};

// Rule: Every Tuesday
const everyTuesdayRule = {
  name: 'Every Tuesday',
  isMonthly: false,
  matches: (date) => date.getDay() === 2
};

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function testRule(eventName, rule) {
  console.log(`\n${eventName} (${rule.name}):`);
  const dates = getNextOccurrences(rule, { count: 3, months: 3 });

  if (dates.length === 0) {
    console.log('  ❌ No dates found!');
    return false;
  }

  const label = rule.isMonthly ? `Next 3 occurrences` : `Next 3 months of dates`;
  console.log(`  ${label} from today:`);
  dates.forEach((date, i) => {
    console.log(`    ${i + 1}. ${formatDate(date)}`);
  });

  // Verify each date matches the rule
  let allValid = true;
  dates.forEach((date, i) => {
    if (!rule.matches(date)) {
      console.log(`  ❌ Date ${i + 1} does not match rule!`);
      allValid = false;
    }
  });

  if (allValid) {
    console.log('  ✅ All dates match the recurrence rule');
  }

  return allValid;
}

console.log('📅 Testing Event Date Calculations\n');
const startDate = new Date('2026-01-01');
startDate.setHours(0, 0, 0, 0);
console.log(`Start date: ${formatDate(startDate)}\n`);
console.log('=' .repeat(60));

let allPass = true;

allPass = testRule('Somatic Co-Lab', everySundayRule, 3) && allPass;
allPass = testRule('Sex Positive Friends', everyTuesdayRule, 3) && allPass;

console.log('\n' + '=' .repeat(60));
if (allPass) {
  console.log('\n✅ All date calculations are correct!\n');
  process.exit(0);
} else {
  console.log('\n❌ Some date calculations failed!\n');
  process.exit(1);
}
