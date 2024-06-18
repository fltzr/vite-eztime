import { BadgeSwissFrancIcon, LoaderCircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type WeeklyAmountEarnedCardProps = {
  isPending: boolean;
  currentWeekEarnings: number;
  percentChange: number;
};

export const WeeklyAmountEarnedCard = ({
  isPending,
  currentWeekEarnings,
  percentChange,
}: WeeklyAmountEarnedCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-muted-foreground">
        <CardTitle className="text-sm font-medium">Earned this week</CardTitle>
        <BadgeSwissFrancIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {!isPending ? (
            <>
              {`₣ ${(currentWeekEarnings / 100).toFixed(2)}`}
              {percentChange > 0 ? (
                <p className="text-xs text-muted-foreground">
                  {percentChange > 0 ? '+' : ''}
                  {percentChange.toFixed(1)}% from last week
                </p>
              ) : (
                <> </>
              )}
            </>
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
