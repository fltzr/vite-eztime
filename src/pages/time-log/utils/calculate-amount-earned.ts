import { type Duration, DateTime } from "luxon";

export const calculateDuration = (startTime: string, endTime: string) => {
  let duration: Duration;

  const start = DateTime.fromFormat(startTime, "HH:mm:ss");
  const end = DateTime.fromFormat(endTime, "HH:mm:ss");

  if (end < start) {
    const nextDayEnd = end.plus({ days: 1 });
    duration = nextDayEnd.diff(start, "hours");
  } else {
    duration = end.diff(start, "hours");
  }

  return duration.as("hours");
};

export const calculateEarnings = (
  startTime: string,
  endTime: string,
  hourlyRate: number
) => {
  const timeWorked = calculateDuration(startTime, endTime);

  return (timeWorked * hourlyRate).toFixed(2);
};
