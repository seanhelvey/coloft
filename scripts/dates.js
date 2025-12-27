// ============================================================================
// EVENT SCHEDULE CONFIGURATION
// ============================================================================
// Update these rules to change when events occur
// After changing, just refresh the page - no rebuild needed!

const EVENT_SCHEDULES = {
  'somatic-colab': {
    name: 'Somatic Co-Lab',
    rule: 'every-sunday',       // Every Sunday at 6:00 PM
    isMonthly: false
  },
  'sex-positive-friends': {
    name: 'Sex Positive Friends',
    rule: 'every-tuesday',      // Every Tuesday at 5:30 PM
    isMonthly: false
  }
};

// ============================================================================
// DATE CALCULATION ENGINE (don't modify below unless you know what you're doing)
// ============================================================================

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

// Rule: 2nd Sunday of each month
const secondSundayRule = {
  isMonthly: true,
  matches: (date) => {
    if (date.getDay() !== 0) return false; // Not Sunday
    const dayOfMonth = date.getDate();
    return dayOfMonth >= 8 && dayOfMonth <= 14; // 2nd week
  }
};

// Rule: Every Friday
const everyFridayRule = {
  isMonthly: false,
  matches: (date) => date.getDay() === 5
};

// Rule: 1st and 3rd Wednesday
const firstThirdWednesdayRule = {
  isMonthly: false,
  matches: (date) => {
    if (date.getDay() !== 3) return false; // Not Wednesday
    const dayOfMonth = date.getDate();
    return (dayOfMonth >= 1 && dayOfMonth <= 7) || // 1st week
           (dayOfMonth >= 15 && dayOfMonth <= 21); // 3rd week
  }
};

// Rule: 2nd Monday of each month
const secondMondayRule = {
  isMonthly: true,
  matches: (date) => {
    if (date.getDay() !== 1) return false; // Not Monday
    const dayOfMonth = date.getDate();
    return dayOfMonth >= 8 && dayOfMonth <= 14; // 2nd week
  }
};

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function updateEventDates(eventId, rule) {
  const dates = getNextOccurrences(rule, { count: 3, months: 3 });

  // Update "Next: " date on index page
  const nextElement = document.querySelector(`a[href*="${eventId}"] .event-next`);
  if (nextElement && dates.length > 0) {
    nextElement.textContent = `Next: ${formatDate(dates[0])}`;
  }

  // Update upcoming dates list on event detail page
  const dateList = document.querySelector('.date-list');
  if (dateList) {
    dateList.innerHTML = dates.map(date =>
      `<li>${formatDate(date)}</li>`
    ).join('');
  }
}

// Rule: Every Sunday
const everySundayRule = {
  isMonthly: false,
  matches: (date) => date.getDay() === 0
};

// Rule: Every Tuesday
const everyTuesdayRule = {
  isMonthly: false,
  matches: (date) => date.getDay() === 2
};

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('somatic-colab')) {
    updateEventDates('somatic-colab', everySundayRule);
  } else if (path.includes('sex-positive-friends')) {
    updateEventDates('sex-positive-friends', everyTuesdayRule);
  } else if (path.includes('index.html') || path.endsWith('/') || path === '') {
    // Update all active events on index page
    updateEventDates('somatic-colab', everySundayRule);
    updateEventDates('sex-positive-friends', everyTuesdayRule);
  }
});
