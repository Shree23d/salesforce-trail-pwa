/**
 * Streak & GitHub Heatmap Utility Engine
 * Calculates streaks, daily counts, and rolling weekly contribution grids.
 */

// Formats a Date object or ISO timestamp to "YYYY-MM-DD" in local time
export function toLocalDateString(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates streak metrics from an array of completed quiz attempts.
 * @param {Array} attempts - List of quiz attempts with `created_at` timestamps
 */
export function calculateStreakStats(attempts = []) {
  if (!Array.isArray(attempts) || attempts.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      todayCount: 0,
      totalQuizzes: 0,
      activeDatesMap: {},
      isPracticedToday: false,
    };
  }

  // 1. Build a map of { "YYYY-MM-DD": count }
  const activeDatesMap = {};
  attempts.forEach((item) => {
    if (!item.created_at) return;
    const dateKey = toLocalDateString(item.created_at);
    if (!dateKey) return;
    activeDatesMap[dateKey] = (activeDatesMap[dateKey] || 0) + 1;
  });

  const today = new Date();
  const todayKey = toLocalDateString(today);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toLocalDateString(yesterday);

  const todayCount = activeDatesMap[todayKey] || 0;
  const isPracticedToday = todayCount > 0;

  // 2. Calculate Current Streak
  // Start from today (if practiced) or yesterday (if today hasn't been practiced yet)
  let currentStreak = 0;
  let checkDate = new Date();

  if (!isPracticedToday) {
    // Check if streak was active as of yesterday
    if (activeDatesMap[yesterdayKey] > 0) {
      checkDate = yesterday;
    } else {
      // Streak broken
      checkDate = null;
    }
  }

  if (checkDate) {
    const cursor = new Date(checkDate);
    while (true) {
      const key = toLocalDateString(cursor);
      if (activeDatesMap[key] && activeDatesMap[key] > 0) {
        currentStreak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // 3. Calculate Longest Streak
  const uniqueDatesSorted = Object.keys(activeDatesMap).sort(); // Ascending dates
  let longestStreak = 0;
  let tempStreak = 0;
  let previousDate = null;

  uniqueDatesSorted.forEach((dateStr) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const currentDate = new Date(y, m - 1, d);

    if (!previousDate) {
      tempStreak = 1;
    } else {
      const diffMs = currentDate.getTime() - previousDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak += 1;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    previousDate = currentDate;
  });

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    todayCount,
    totalQuizzes: attempts.length,
    activeDatesMap,
    isPracticedToday,
  };
}

/**
 * Generates a rolling N-week matrix for the GitHub-style Heatmap.
 * Formatted as weeks array, each with 7 day cells (Sun=0 through Sat=6).
 * @param {Object} activeDatesMap - { "YYYY-MM-DD": count }
 * @param {number} numWeeks - Default 10 weeks (fits mobile width cleanly)
 */
export function generateHeatmapWeeks(activeDatesMap = {}, numWeeks = 10) {
  const weeks = [];
  const today = new Date();

  // Find the end date: end of current week (Saturday)
  const endDate = new Date(today);
  const dayOfWeek = endDate.getDay(); // 0 is Sunday, 6 is Saturday
  endDate.setDate(endDate.getDate() + (6 - dayOfWeek));

  // Find start date: numWeeks * 7 days before end of week
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (numWeeks * 7 - 1));

  let currentCursor = new Date(startDate);

  for (let w = 0; w < numWeeks; w++) {
    const daysInWeek = [];
    for (let d = 0; d < 7; d++) {
      const dateKey = toLocalDateString(currentCursor);
      const isFuture = currentCursor > today;
      const count = isFuture ? 0 : activeDatesMap[dateKey] || 0;

      let level = 0;
      if (!isFuture) {
        if (count >= 4) level = 3;
        else if (count >= 2) level = 2;
        else if (count >= 1) level = 1;
      }

      // Short month + day label (e.g. "Sep 16")
      const label = currentCursor.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      daysInWeek.push({
        dateKey,
        label,
        count,
        level,
        isFuture,
        isToday: dateKey === toLocalDateString(today),
      });

      currentCursor.setDate(currentCursor.getDate() + 1);
    }
    weeks.push(daysInWeek);
  }

  return weeks;
}
