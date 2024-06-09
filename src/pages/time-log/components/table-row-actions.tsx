import { Row } from "@tanstack/react-table";

import { Button } from "@/components/button";
import { TimeLog, timeLogSchema } from "../schema";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { EditTimeEntryForm } from "./edit-time-entry-form";
import { useToast } from "@/components/use-toast";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export const DataTableRowActions = <TData,>({
  row,
}: DataTableRowActionsProps<TData>) => {
  const { toast } = useToast();
  const entry = timeLogSchema.parse(row.original);

  const handleOnSubmitEdit = async (data: TimeLog) => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(entry);

    if (!hasChanges) {
      console.log("No changes detected.");
      toast({
        title: "No changes detected",
        description: "You haven't made any changes to the entry.",
      });
      return;
    }

    toast({
      title: "Changes detected",
      description: `Form data: ${JSON.stringify(data, null, 2)}`,
    });

    return;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil1Icon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit time log entry</SheetTitle>
          <SheetDescription>
            Make changes to your time log entry. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <EditTimeEntryForm onSubmit={handleOnSubmitEdit} currentData={entry} />
        <SheetFooter>
          <SheetClose asChild>
            <div className="grid gap-4 w-full mt-7">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" form="form__edit-time-log-entry">
                Save changes
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
