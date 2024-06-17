import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetTotalEarned } from '../../data-access/time-log';
import { LoaderCircleIcon } from 'lucide-react';

export const WeeklyHoursWorkedCard = () => {
  const timeLogData = useGetTotalEarned();
  const [totalAmountEarned, setTotalAmountEarned] = useState<
    number | undefined
  >();

  useEffect(() => {
    if (timeLogData.data?.data) {
      const amountEarnedArray = timeLogData.data.data?.map((entry) => {
        return entry.amount_earned_euros_cents;
      });

      const totalAmountEarned = amountEarnedArray?.reduce(
        (acc, curr) => acc + curr,
        0
      );

      setTotalAmountEarned(totalAmountEarned);
    }
  }, [timeLogData.data]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Hours worked this week
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M4 10h12" />
          <path d="M4 14h9" />
          <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalAmountEarned ? (
            `₣ ${(totalAmountEarned / 100).toFixed(2)}`
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
