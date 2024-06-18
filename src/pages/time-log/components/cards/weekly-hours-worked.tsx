import { HourglassIcon, LoaderCircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type WeeklyHoursWorkedCardProps = {
  isPending: boolean;
  currentWeekHours: number;
};

export const WeeklyHoursWorkedCard = ({
  isPending,
  currentWeekHours,
}: WeeklyHoursWorkedCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-muted-foreground">
        <CardTitle className="text-sm font-medium">
          Hours worked this week
        </CardTitle>
        <HourglassIcon className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {!isPending ? (
            <>{`${currentWeekHours.toFixed(2)} hours`}</>
          ) : (
            <div className="flex justify-start py-2">
              <LoaderCircleIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
};
