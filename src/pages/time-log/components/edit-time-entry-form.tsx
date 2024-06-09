import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { TimeLog, timeLogSchema } from "../schema";
import { Textarea } from "@/components/textarea";

type EditTimeEntryFormProps = {
  onSubmit: (data: TimeLog) => Promise<void>;
  currentData: TimeLog;
};

export const EditTimeEntryForm = ({
  onSubmit,
  currentData,
}: EditTimeEntryFormProps) => {
  const form = useForm<TimeLog>({
    resolver: zodResolver(timeLogSchema),
    defaultValues: currentData,
  });

  return (
    <Form {...form}>
      <form
        id="form__edit-time-log-entry"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input className="pr-9" type="date" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input className="pr-9" type="number" {...field} />
                  </div>
                </FormControl>
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
                <FormControl>
                  <div className="relative w-full">
                    <Textarea className="pr-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
