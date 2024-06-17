import { useEffect, useState } from "react";
import { BadgeSwissFrancIcon, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTotalEarned } from "../../data-access/time-log";

export const TotalAmountEarnedCard = () => {
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
        <CardTitle className="text-sm font-medium">Total earned</CardTitle>
        <BadgeSwissFrancIcon />
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
