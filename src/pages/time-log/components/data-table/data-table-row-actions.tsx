import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { timeLogSchema } from "../../schema";
import { useState } from "react";
import { UpdateEntrySheet } from "../update-entry-sheet";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateEntrySheet, setShowUpdateEntrySheet] = useState(false);

  const entry = timeLogSchema.parse(row.original);

  const handleOnDelete = () => {
    console.log("Delete entry", entry);
  };

  return (
    <>
      <UpdateEntrySheet
        open={showUpdateEntrySheet}
        onOpenChange={setShowUpdateEntrySheet}
        timeLogEntry={entry}
      />
      <Dialog
        open={showDeleteModal}
        onOpenChange={(state) => setShowDeleteModal(state)}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onSelect={() => setShowUpdateEntrySheet(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => setShowDeleteModal(true)}>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogHeader>Delete Entry</DialogHeader>
            <DialogClose />
          </DialogHeader>
          <DialogContent>
            <DialogDescription>
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </DialogDescription>
          </DialogContent>
          <DialogFooter>
            <Button variant="destructive" onClick={handleOnDelete}>
              Delete
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
