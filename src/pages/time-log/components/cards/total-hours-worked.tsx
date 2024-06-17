import { useEffect, useState } from 'react';
import { Clock9Icon, LoaderCircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetTimeLogEntries } from '../../data-access/time-log';
import { calculateDuration } from '../../utils/calculate-amount-earned';

export const TotalHoursWorkedCard = () => {
  const timeLogData = useGetTimeLogEntries();
  const [totalHoursWorked, setTotalHoursWorked] = useState<
    number | undefined
  >();

  useEffect(() => {
    if (timeLogData?.data) {
      const hoursWorkedArray = timeLogData.data?.map((entry) => {
        return calculateDuration(entry.start_time, entry.end_time);
      });

      console.log('hoursWorkedArray', hoursWorkedArray);

      const hours = hoursWorkedArray?.reduce((acc, curr) => acc + curr, 0);

      setTotalHoursWorked(hours);
    }
  }, [timeLogData?.data]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total hours worked
        </CardTitle>
        <Clock9Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalHoursWorked ? (
            `${totalHoursWorked.toFixed(2)} hours`
          ) : (
            <div className="flex justify-start py-2">
              <LoaderCircleIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
