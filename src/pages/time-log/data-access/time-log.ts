import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase-client";

const getTimeLogEntries = async () => {
  const timelogEntriesResponse = await supabase.from("time-log").select("*");

  return timelogEntriesResponse.data ?? [];
};

export const useGetTimeLogEntries = () =>
  useQuery({
    queryKey: ["time-log-entries"],
    queryFn: getTimeLogEntries,
    retry: false,
  });

// export const useGetTimeLogEntries = () =>
// useMutation({
// mutationKey: ["mutation__sign-in"],
// mutationFn: getTimeLogEntries,
// retry: false,
// });
