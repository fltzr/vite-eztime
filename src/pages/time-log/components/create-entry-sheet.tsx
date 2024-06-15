import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { type CreateTimeLog, createTimeLogSchema } from "../schema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateTimeLogEntry } from "../data-access/time-log";
import { supabase } from "@/utils/supabase-client";
import { useGetFamilies } from "../data-access/family";
import { calculateEarnings } from "../utils/calculate-amount-earned";

interface CreateEntrySheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {}

export function CreateEntrySheet({ ...props }: CreateEntrySheetProps) {
  const [isUpdatePending] = React.useTransition();
  const [isAddingNewFamily, setIsAddingNewFamily] = React.useState(false);
  const [newFamily, setNewFamily] = React.useState("");

  const families = useGetFamilies();

  const form = useForm<CreateTimeLog>({
    resolver: zodResolver(createTimeLogSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      hourlyRate: 0,
      startTime: "",
      endTime: "",
    },
  });

  const createTimeLog = useCreateTimeLogEntry();

  const handleOnSubmitEntry = async (input: CreateTimeLog) => {
    console.log(`input`, input);

    if (isAddingNewFamily) {
      const { error } = await supabase
        .from("family_surname")
        .insert([{ surname: newFamily }]);

      if (error) {
        toast.error("Failed to add new family 😔. Please try again later!");
        return;
      }

      input.family = newFamily;
    }

    const { error } = await createTimeLog.mutateAsync(input);

    if (error) {
      toast.error("Failed to update time log entry 😔. Please let Josh know!");
      return;
    }

    form.reset({
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "",
      endTime: "",
      family: "",
      notes: "",
    });

    toast.success("Time log entry added successfully! 🎉");
  };

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button onClick={() => families.refetch()}>Add time log entry</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md overflow-y-scroll max-h-screen">
        <SheetHeader className="text-left">
          <SheetTitle>Create time log entry</SheetTitle>
          <SheetDescription>
            Use the form below to create a new time log entry.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="form__create-time-log-entry"
            onSubmit={form.handleSubmit(handleOnSubmitEntry, (errors) => {
              toast.error(
                `Failed to create time log entry 😔. Please let Josh know!\nErrors: ${JSON.stringify(
                  errors,
                  null,
                  2
                )}`
              );
            })}
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
                      <SelectTrigger className="capitalize">
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
              <SheetDescription>
                The estimated amount earned for this time log entry is{" "}
                <span className="font-semibold">
                  €{" "}
                  {form.watch("hourlyRate") &&
                    form.watch("startTime") &&
                    form.watch("endTime") &&
                    calculateEarnings(
                      `${form.watch("startTime")}:00`,
                      `${form.watch("endTime")}:00`,
                      form.watch("hourlyRate")
                    )}
                </span>
              </SheetDescription>
              <SheetClose asChild>
                <div className="w-full grid gap-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset({
                        date: format(new Date(), "yyyy-MM-dd"),
                        startTime: "",
                        endTime: "",
                        family: "",
                        notes: "",
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isUpdatePending}
                    type="submit"
                    form="form__create-time-log-entry"
                  >
                    {isUpdatePending && (
                      <ReloadIcon
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Create
                  </Button>
                </div>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
