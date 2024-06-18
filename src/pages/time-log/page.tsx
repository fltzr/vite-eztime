import { useEffectOnce } from 'react-use';

import { useAppHeaderStore } from '@/store/use-app-header-store';

import { columns } from './components/time-log-columns';
import { useGetTimeLogEntries } from './data-access/time-log';
import { DataTable } from './components/data-table/data-table';
import { CreateEntrySheet } from './components/create-entry-sheet';
import { TotalAmountEarnedCard } from './components/cards/total-amount-earned';
import { TotalHoursWorkedCard } from './components/cards/total-hours-worked';
import { calculateMetrics } from './utils/calculate-metrics';
import { WeeklyAmountEarnedCard } from './components/cards/weekly-amount-earned';
import { WeeklyHoursWorkedCard } from './components/cards/weekly-hours-worked';

export const TimeLogPage = () => {
  const { data = [], isPending } = useGetTimeLogEntries();
  const processedData = data.map((entry) => ({
    id: entry.id,
    user_id: entry.user_id,
    family: entry.family,
    date: entry.date,
    userId: entry.user_id,
    startTime: entry.start_time,
    endTime: entry.end_time,
    hourlyRate: entry.hourly_rate_euros_cents / 100,
    amountEarned: (entry.amount_earned_euros_cents ?? 0) / 100,
    notes: entry.notes ?? '',
  }));

  const { setRightContent, clearHeader } = useAppHeaderStore();

  useEffectOnce(() => {
    setRightContent(<CreateEntrySheet />);

    return () => {
      clearHeader();
    };
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  const { currentWeekEarnings, percentChange, currentWeekHours } =
    calculateMetrics(processedData);

  return (
    <div className="mx-28 my-16 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <TotalAmountEarnedCard />
        <TotalHoursWorkedCard />
        <WeeklyAmountEarnedCard
          isPending={isPending}
          currentWeekEarnings={currentWeekEarnings}
          percentChange={percentChange}
        />
        <WeeklyHoursWorkedCard
          isPending={isPending}
          currentWeekHours={currentWeekHours}
        />
      </div>
      <DataTable columns={columns} data={processedData} />
    </div>
  );
};

export const Component = TimeLogPage;
