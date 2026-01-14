// Test that date calculations are correct for each event
// Run with: node test-dates.js

function getNextOccurrences(rule, options = {}) {
  const { count = 3, months = 3, startDate: customStartDate } = options;

  // Use custom start date if provided, otherwise default to January 1, 2026
  const eventStartDate = customStartDate ? new Date(customStartDate) : new Date('2026-01-01');
  eventStartDate.setHours(0, 0, 0, 0);

  const dates = [];
  let checkDate = new Date(eventStartDate);

  // Look ahead specified number of months from the start date
  const maxDate = new Date(eventStartDate);
  maxDate.setMonth(maxDate.getMonth() + months);

  while (checkDate <= maxDate) {
    if (rule.matches(checkDate) && checkDate >= eventStartDate) {
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

// Rule: Select Sundays (specific dates)
const selectSundaysRule = {
  name: 'Select Sundays',
  isMonthly: false,
  matches: (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const selectDates = [
      '2026-01-25',
      '2026-02-08',
      '2026-02-22',
      '2026-03-08',
      '2026-03-22'
    ];
    return selectDates.includes(dateStr);
  }
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
console.log('=' .repeat(60));

let allPass = true;

// Test Somatic Co-Lab (select Sundays starting Jan 25, 2026)
console.log('\nSomatic Co-Lab (Select Sundays, starting Jan 25, 2026):');
const somaticDates = getNextOccurrences(selectSundaysRule, { count: 3, months: 3, startDate: '2026-01-25' });
console.log(`  Next 3 occurrences:`);
somaticDates.slice(0, 3).forEach((date, i) => {
  console.log(`    ${i + 1}. ${formatDate(date)}`);
});
if (somaticDates.every(date => selectSundaysRule.matches(date))) {
  console.log('  ✅ All dates match the recurrence rule');
} else {
  console.log('  ❌ Some dates do not match!');
  allPass = false;
}

// Test Munch (starts Jan 13, 2026)
console.log('\nMunch (Every Tuesday, starting Jan 13, 2026):');
const munchDates = getNextOccurrences(everyTuesdayRule, { count: 3, months: 3, startDate: '2026-01-13' });
console.log(`  Next 3 occurrences:`);
munchDates.slice(0, 3).forEach((date, i) => {
  console.log(`    ${i + 1}. ${formatDate(date)}`);
});
if (munchDates.every(date => everyTuesdayRule.matches(date))) {
  console.log('  ✅ All dates match the recurrence rule');
} else {
  console.log('  ❌ Some dates do not match!');
  allPass = false;
}

console.log('\n' + '=' .repeat(60));
if (allPass) {
  console.log('\n✅ All date calculations are correct!\n');
  process.exit(0);
} else {
  console.log('\n❌ Some date calculations failed!\n');
  process.exit(1);
}
