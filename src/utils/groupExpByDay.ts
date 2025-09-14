import { DateTime } from 'luxon';
import type { ExpEvent } from '../types';

export const groupExpByDay = (events: ExpEvent[] | undefined, unboosted: boolean): number[][] => {
  if (!events) return [];

  const totals: Record<string, number> = {};

  events.forEach(ev => {
    let exp: number | null | undefined;
    if (unboosted) {
      exp = ev.unboosted;
    } else {
      exp = ev.exp;
    }
    if (ev.timestamp && exp != null) {
      const day = DateTime.fromISO(ev.timestamp).startOf('day').toISODate();

      if (day) {
        totals[day] = (totals[day] ?? 0) + exp;
      }
    }
  });

  return Object.entries(totals)
    .map(([date, totalExp]) => [new Date(date).getTime(), totalExp])
    .sort((a, b) => a[0] - b[0]);
};
