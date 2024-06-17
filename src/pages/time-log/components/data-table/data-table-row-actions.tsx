import { DotsHorizontalIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { timeLogSchema } from '../../schema';
import { useState } from 'react';
import { UpdateEntrySheet } from '../update-entry-sheet';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteTimeLogEntry } from '../../data-access/time-log';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateEntrySheet, setShowUpdateEntrySheet] = useState(false);
  const deleteTimeLogEntry = useDeleteTimeLogEntry();

  const entry = timeLogSchema.parse(row.original);

  const handleOnDelete = async () => {
    console.log('Delete entry', entry);

    try {
      await deleteTimeLogEntry.mutateAsync(entry.id);

      console.log('Entry deleted successfully!');
      toast.info('Entry deleted successfully!');
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(`Failed to delete entry! Please try again!\n${error}`);
    }
  };

  return (
    <>
      <UpdateEntrySheet
        open={showUpdateEntrySheet}
        onOpenChange={(state) => {
          setShowUpdateEntrySheet(state);
        }}
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
            <DropdownMenuItem
              onSelect={() => {
                setShowUpdateEntrySheet(true);
                queryClient.refetchQueries({ queryKey: ['families'] });
              }}
            >
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
          <DialogDescription>
            Are you sure you want to delete this entry? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              disabled={deleteTimeLogEntry.isPending}
              variant="destructive"
              onClick={handleOnDelete}
            >
              {deleteTimeLogEntry.isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Deleting
                </>
              ) : (
                <>Delete</>
              )}
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
