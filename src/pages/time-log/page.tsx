import { timeLogColumns } from "./components/columns";
import { useGetTimeLogEntries } from "./data-access/time-log";
import { DataTable } from "./table";

export const TimeLogPage = () => {
  const { data = [] } = useGetTimeLogEntries();

  const processedData = data.map((entry) => ({
    ...entry,
    notes: entry.notes ?? "",
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={timeLogColumns} data={processedData} />
    </div>
  );
};

export const Component = TimeLogPage;
