import { type ColumnDef } from "@tanstack/react-table";
import { TimeLog } from "../schema";
import { DataTableRowActions } from "./table-row-actions";

export const timeLogColumns: ColumnDef<TimeLog>[] = [
  {
    accessorKey: "id",
    header: "ID",
    maxSize: 50,
  },
  {
    accessorKey: "date",
    header: "Date",
    maxSize: 100,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    size: 100,
    maxSize: 100,
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    maxSize: 50,
  },
];
