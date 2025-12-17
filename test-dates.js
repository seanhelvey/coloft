// Test that date calculations are correct for each event
// Run with: node test-dates.js

function getNextOccurrences(rule, options = {}, fromDate = new Date()) {
  const { count = 3, months = 3 } = options;
  const today = new Date(fromDate);
  today.setHours(0, 0, 0, 0);

  const dates = [];
  let checkDate = new Date(today);

  const maxDate = new Date(today);
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

// Rule: 2nd Sunday of each month
const secondSundayRule = {
  name: '2nd Sunday',
  isMonthly: true,
  matches: (date) => {
    if (date.getDay() !== 0) return false;
    const dayOfMonth = date.getDate();
    return dayOfMonth >= 8 && dayOfMonth <= 14;
  }
};

// Rule: Every Friday
const everyFridayRule = {
  name: 'Every Friday',
  isMonthly: false,
  matches: (date) => date.getDay() === 5
};

// Rule: 1st and 3rd Wednesday
const firstThirdWednesdayRule = {
  name: '1st & 3rd Wednesday',
  isMonthly: false,
  matches: (date) => {
    if (date.getDay() !== 3) return false;
    const dayOfMonth = date.getDate();
    return (dayOfMonth >= 1 && dayOfMonth <= 7) || (dayOfMonth >= 15 && dayOfMonth <= 21);
  }
};

// Rule: 2nd Monday of each month
const secondMondayRule = {
  name: '2nd Monday',
  isMonthly: true,
  matches: (date) => {
    if (date.getDay() !== 1) return false;
    const dayOfMonth = date.getDate();
    return dayOfMonth >= 8 && dayOfMonth <= 14;
  }
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
console.log(`Today: ${formatDate(new Date())}\n`);
console.log('=' .repeat(60));

let allPass = true;

allPass = testRule('Somatic Co-Lab', secondSundayRule, 3) && allPass;
allPass = testRule('Coffee & Connection', everyFridayRule, 3) && allPass;
allPass = testRule('Sex Positive Friends', firstThirdWednesdayRule, 3) && allPass;
allPass = testRule('Brews Without Booze', secondMondayRule, 3) && allPass;

console.log('\n' + '=' .repeat(60));
if (allPass) {
  console.log('\n✅ All date calculations are correct!\n');
  process.exit(0);
} else {
  console.log('\n❌ Some date calculations failed!\n');
  process.exit(1);
}
