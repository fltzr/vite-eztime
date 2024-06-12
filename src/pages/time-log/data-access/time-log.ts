import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase-client";
import type { CreateTimeLog, UpdateTimeLog } from "../schema";

const transformUpdateTimeLog = (entry: UpdateTimeLog) => {
  const { id, hourlyRate, startTime, endTime, ...rest } = entry;

  // Convert startTime and endTime to start_time and end_time
  const transformedData: { [key: string]: unknown } = { ...rest };

  if (hourlyRate) {
    transformedData.hourly_rate_euros_cents = hourlyRate * 100;
  }

  if (startTime) {
    transformedData.start_time = startTime;
  }
  if (endTime) {
    transformedData.end_time = endTime;
  }

  // Remove keys with undefined or empty string values
  Object.keys(transformedData).forEach(
    (key) =>
      (transformedData[key] === undefined || transformedData[key] === "") &&
      delete transformedData[key]
  );

  return { id, ...transformedData };
};

const getTimeLogEntries = async () => {
  const timelogEntriesResponse = await supabase.from("time_log").select("*");

  return timelogEntriesResponse.data ?? [];
};

const createTimeLogEntry = async (entry: CreateTimeLog) => {
  const { hourlyRate, startTime, endTime, ...entryData } = entry;
  const dbEntry = {
    ...entryData,
    hourly_rate_euros_cents: hourlyRate * 100,
    start_time: startTime,
    end_time: endTime,
  };

  const response = await supabase.from("time_log").insert(dbEntry);

  return response;
};

const updateTimeLogEntry = async (entry: UpdateTimeLog) => {
  const { id, ...updatedData } = transformUpdateTimeLog(entry);
  const response = await supabase
    .from("time_log")
    .update(updatedData)
    .eq("id", id);

  return response;
};

const deleteTimeLogEntry = async (id: number) => {
  const { error } = await supabase.from("time_log").delete().eq("id", id);

  return error;
};

export const useGetTimeLogEntries = () =>
  useQuery({
    queryKey: ["time-log-entries"],
    queryFn: getTimeLogEntries,
    retry: false,
  });

export const useCreateTimeLogEntry = () =>
  useMutation({
    mutationFn: createTimeLogEntry,
    retry: false,
  });

export const useUpdateTimeLogEntry = () =>
  useMutation({
    mutationFn: updateTimeLogEntry,
    retry: false,
  });

export const useDeleteTimeLogEntry = () =>
  useMutation({
    mutationFn: deleteTimeLogEntry,
    retry: false,
  });
