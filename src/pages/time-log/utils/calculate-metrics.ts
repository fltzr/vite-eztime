import { DateTime, Interval } from 'luxon';
import { TimeLog } from '../schema';

export const calculateMetrics = (entries: TimeLog[]) => {
  const currentDate = DateTime.now();

  const currentWeekStart = currentDate.startOf('week');
  const currentWeekEnd = currentDate.endOf('week');
  const previousWeekStart = currentWeekStart.minus({ weeks: 1 });
  const previousWeekEnd = currentWeekEnd.minus({ weeks: 1 });

  const isCurrentWeek = (date: DateTime) =>
    date >= currentWeekStart && date <= currentWeekEnd;
  const isPreviousWeek = (date: DateTime) =>
    date >= previousWeekStart && date <= previousWeekEnd;

  let currentWeekEarnings = 0;
  let currentWeekHours = 0;
  let previousWeekEarnings = 0;

  entries.forEach((entry) => {
    const entryDate = DateTime.fromISO(entry.date);
    const startTime = DateTime.fromISO(`${entry.date}T${entry.startTime}`);
    const endTime = DateTime.fromISO(`${entry.date}T${entry.endTime}`);

    // Assumption is made that if the end time is earlier than the start time,
    // then the time goes into the following day.
    if (endTime < startTime) {
      endTime.plus({ days: 1 });
    }

    if (isCurrentWeek(entryDate)) {
      const interval = Interval.fromDateTimes(startTime, endTime);
      const hoursWorked = interval.length('hours');

      currentWeekEarnings += entry.amountEarned ?? 0;
      currentWeekHours += hoursWorked;
    } else if (isPreviousWeek(entryDate)) {
      previousWeekEarnings += entry.amountEarned ?? 0;
    }
  });
  const percentChange =
    previousWeekEarnings > 0
      ? ((currentWeekEarnings - previousWeekEarnings) / previousWeekEarnings) *
        100
      : 0;

  console.log(`currentWeekEarnings: ${currentWeekEarnings}`);
  console.log(`currentWeekHours: ${currentWeekHours}`);
  console.log(`percentChange: ${percentChange}`);

  return {
    currentWeekEarnings: currentWeekEarnings * 100,
    currentWeekHours,
    percentChange,
  };
};
