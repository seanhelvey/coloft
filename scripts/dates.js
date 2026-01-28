// ============================================================================
// EVENT SCHEDULE CONFIGURATION
// ============================================================================
// Update these rules to change when events occur
// After changing, just refresh the page - no rebuild needed!

const EVENT_SCHEDULES = {
  'somatic-lab': {
    name: 'Somatic Lab Loft Sessions',
    rule: 'select-sundays',     // Select Sundays at 6:00 PM
    isMonthly: false,
    startDate: '2026-01-25'     // First event on January 25, 2026
  },
  'munch': {
    name: 'Munch',
    rule: 'every-tuesday',      // Every Tuesday at 5:30 PM
    isMonthly: false,
    startDate: '2026-01-13'     // Start on January 13, 2026
  },
  'relating-games': {
    name: 'Relating Games',
    rule: 'every-other-saturday', // Every other Saturday at 3:00 PM
    isMonthly: false,
    startDate: '2026-01-24'     // First event on January 24, 2026
  }
};

// ============================================================================
// DATE CALCULATION ENGINE (don't modify below unless you know what you're doing)
// ============================================================================

function getNextOccurrences(rule, options = {}) {
  const { count = 3, months = 3, startDate: customStartDate } = options;

  // Always start from today to get current upcoming dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Event start date is the earliest date to consider (don't show dates before event started)
  const eventStartDate = customStartDate ? new Date(customStartDate) : new Date('2026-01-01');
  eventStartDate.setHours(0, 0, 0, 0);

  // Start checking from whichever is later: today or event start date
  const checkStartDate = today > eventStartDate ? today : eventStartDate;

  const dates = [];
  let checkDate = new Date(checkStartDate);

  // Look ahead specified number of months from check start date
  const maxDate = new Date(checkStartDate);
  maxDate.setMonth(maxDate.getMonth() + months);

  while (checkDate <= maxDate && dates.length < count) {
    if (rule.matches(checkDate)) {
      dates.push(new Date(checkDate));
    }
    checkDate.setDate(checkDate.getDate() + 1);
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

function updateEventDates(eventId, rule, startDate = null) {
  const dates = getNextOccurrences(rule, { count: 3, months: 3, startDate });

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

// Rule: Select Sundays (specific dates)
const selectSundaysRule = {
  isMonthly: false,
  matches: (date) => {
    // Convert date to YYYY-MM-DD format for comparison
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // List of select Sunday dates (update this list as needed)
    const selectDates = [
      '2026-01-25',
      '2026-02-08',
      '2026-02-22',
      '2026-03-08',
      '2026-03-22'
      // Add more dates as they are scheduled
    ];

    return selectDates.includes(dateStr);
  }
};

// Rule: Every Tuesday
const everyTuesdayRule = {
  isMonthly: false,
  matches: (date) => date.getDay() === 2
};

// Rule: Every other Saturday (biweekly from Jan 24, 2026)
const everyOtherSaturdayRule = {
  isMonthly: false,
  matches: (date) => {
    if (date.getDay() !== 6) return false; // Not Saturday
    // Calculate weeks since the anchor date (Jan 24, 2026)
    const anchor = new Date(2026, 0, 24); // Jan 24, 2026
    const diffDays = Math.round((date - anchor) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays % 14 === 0;
  }
};

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('somatic-lab')) {
    updateEventDates('somatic-lab', selectSundaysRule, '2026-01-25');
  } else if (path.includes('munch')) {
    updateEventDates('munch', everyTuesdayRule, '2026-01-13');
  } else if (path.includes('relating-games')) {
    updateEventDates('relating-games', everyOtherSaturdayRule, '2026-01-24');
  } else if (path.includes('index.html') || path.endsWith('/') || path === '') {
    // Update all active events on index page
    updateEventDates('somatic-lab', selectSundaysRule, '2026-01-25');
    updateEventDates('munch', everyTuesdayRule, '2026-01-13');
    updateEventDates('relating-games', everyOtherSaturdayRule, '2026-01-24');
  }
});
