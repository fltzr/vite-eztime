import { useEffectOnce } from "react-use";
import { useAppHeaderStore } from "../../store/use-app-header-store";
import { columns } from "./components/time-log-columns";
import { useGetTimeLogEntries } from "./data-access/time-log";
import { DataTable } from "./components/data-table/data-table";
import { CreateEntrySheet } from "./components/create-entry-sheet";

export const TimeLogPage = () => {
  const { data = [] } = useGetTimeLogEntries();
  const processedData = data.map((entry) => ({
    id: entry.id,
    user_id: entry.user_id,
    family: entry.family,
    date: entry.date,
    userId: entry.user_id,
    startTime: entry.start_time,
    endTime: entry.end_time,
    notes: entry.notes ?? "",
  }));

  const { setRightContent, clearHeader } = useAppHeaderStore();

  useEffectOnce(() => {
    setRightContent(<CreateEntrySheet />);

    return () => {
      clearHeader();
    };
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={processedData} />
    </div>
  );
};

export const Component = TimeLogPage;
