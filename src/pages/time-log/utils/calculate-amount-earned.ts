import { differenceInMinutes, parse, addDays } from "date-fns";

// Function to calculate the total elapsed time between start and end times
export const calculateAmountEarned = (
  hourlyRate: number,
  startTime: string,
  endTime: string
) => {
  // Parse the start and end times into date objects
  const startDate = parse(startTime, "HH:mm:ss", new Date());
  let endDate = parse(endTime, "HH:mm:ss", new Date());

  // Adjust endDate to the next day if it is earlier than startDate
  if (endDate < startDate) {
    endDate = addDays(endDate, 1);
  }

  // Calculate the difference in minutes
  const differenceInMins = differenceInMinutes(endDate, startDate);

  // Convert minutes to hours and minutes
  const hours = Math.floor(differenceInMins / 60);
  const minutes = differenceInMins % 60;

  const amountEarned = hours * hourlyRate + (minutes / 60) * hourlyRate;

  console.log("hourlyRate", hourlyRate);
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log("differenceInMins", differenceInMins);

  return amountEarned.toFixed(2);
};
