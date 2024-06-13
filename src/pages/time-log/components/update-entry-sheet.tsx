import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { timeLogSchema, type TimeLog } from "../schema";
import { Input } from "@/components/ui/input";
import { useUpdateTimeLogEntry } from "../data-access/time-log";
import { useGetFamilies } from "../data-access/family";
import { useEffectOnce } from "react-use";
import { toast } from "sonner";

interface UpdateEntrySheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  timeLogEntry: TimeLog;
}

export function UpdateEntrySheet({
  timeLogEntry,
  ...props
}: UpdateEntrySheetProps) {
  const [isUpdatePending] = React.useTransition();
  const [isAddingNewFamily, setIsAddingNewFamily] = React.useState(false);
  const [newFamily, setNewFamily] = React.useState("");

  const form = useForm<TimeLog>({
    resolver: zodResolver(timeLogSchema),
    defaultValues: timeLogEntry,
  });

  const updateTimeLogEntry = useUpdateTimeLogEntry();
  const families = useGetFamilies();

  useEffectOnce(() => {
    families.refetch();
  });

  const onSubmit = async (input: TimeLog) => {
    const { error } = await updateTimeLogEntry.mutateAsync(input);

    if (error) {
      toast.error("Failed to update time log entry 😔. Please let Josh know!");
      return;
    }

    form.reset();
    props.onOpenChange?.(false);
    toast("Time log entry updated successfully! 🎉");
  };

  return (
    <Sheet
      {...props}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          setIsAddingNewFamily(false);
          setNewFamily("");
        }
        props.onOpenChange?.(open);
      }}
    >
      <SheetContent className="flex flex-col gap-6 sm:max-w-md overflow-y-scroll max-h-screen">
        <SheetHeader className="text-left">
          <SheetTitle>Update time log entry</SheetTitle>
          <SheetDescription>
            Update the time log details and save the changes.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormDescription>
                    The date when the time log entry was created.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>(€) Hourly rate</FormLabel>
                  <FormDescription>
                    The anticipated hourly rate for this time log entry, in
                    euros. Don't worry if you are not sure, you can adjust this
                    value later.
                  </FormDescription>
                  <Input {...field} type="number" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start time</FormLabel>
                  <FormDescription>
                    The time when the time log entry started.
                  </FormDescription>
                  <Input {...field} type="time" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End time</FormLabel>
                  <FormDescription>
                    The time when the time log entry ended.
                  </FormDescription>
                  <Input {...field} type="time" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="family"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family</FormLabel>
                  <FormDescription>
                    The family for which the time log entry was created. If the
                    family is not listed, you can add a new family.
                  </FormDescription>
                  <Select
                    onValueChange={(value) => {
                      console.log(`value`, value);
                      if (value === "new") {
                        setIsAddingNewFamily(true);
                      } else {
                        field.onChange(value);
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a family" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {families.data?.data?.map((family) => (
                          <SelectItem
                            key={family.id}
                            value={family.surname}
                            className="capitalize"
                          >
                            {family.surname}
                          </SelectItem>
                        ))}
                        <SelectItem value="new" className="capitalize">
                          Add new family
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isAddingNewFamily && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setIsAddingNewFamily(false);
                          form.reset({ family: "" });
                        }}
                      >
                        <CrossCircledIcon />
                      </Button>
                      <Input
                        placeholder="Enter new family name"
                        value={newFamily}
                        onChange={(event) => {
                          setNewFamily(event.target.value);
                          field.onChange({
                            target: { value: event.target.value },
                          });
                        }}
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormDescription>
                    Any additional notes or comments about the time log entry.
                  </FormDescription>
                  <Textarea {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
