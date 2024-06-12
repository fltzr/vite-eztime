import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { type TimeLog } from "../schema";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table/data-table-row-actions";
import { differenceInMinutes, parse } from "date-fns";

// Function to calculate the total elapsed time between start and end times
const getAmountEarned = (
  hourlyRate: number,
  startTime: string,
  endTime: string
) => {
  // Parse the start and end times into date objects
  const startDate = parse(startTime, "HH:mm:ss", new Date());
  const endDate = parse(endTime, "HH:mm:ss", new Date());

  // Calculate the difference in minutes
  const differenceInMins = differenceInMinutes(endDate, startDate);

  // Convert minutes to hours and minutes
  let hours = Math.floor(differenceInMins / 60);
  const minutes = differenceInMins % 60;

  // We are assuming that if the minutes are greater than 30, the amount earned is for an additional hour
  if (minutes > 30) {
    hours += 1;
  }

  return hours * hourlyRate;
};

export const columns: ColumnDef<TimeLog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("date")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "family",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Family" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("family")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "hourlyRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hourly rate" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            € {row.getValue("hourlyRate")}
          </span>
        </div>
      );
    },
    maxSize: 125,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("startTime")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End time" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("endTime")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amountEarned",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount earned" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            €{" "}
            {getAmountEarned(
              row.getValue("hourlyRate"),
              row.getValue("startTime"),
              row.getValue("endTime")
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("notes")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
