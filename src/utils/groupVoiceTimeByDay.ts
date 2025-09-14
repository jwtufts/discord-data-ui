import { DateTime } from 'luxon';
import type { ExpEvent } from '../types';

export const groupVoiceTimeByDay = (events: ExpEvent[] | undefined): [number, number][] => {
  if (!events) return [];

  const counts: Record<string, number> = {};

  events.forEach(ev => {
    if (ev.timestamp && ev.timeInVoice) {
      const day = DateTime.fromISO(ev.timestamp).startOf('day').toISODate();
      if (day) counts[day] = (counts[day] ?? 0) + ev.timeInVoice;
    }
  });

  return Object.entries(counts)
    .map(([date, totalTime]): [number, number] => [new Date(date).getTime(), Number((totalTime / 60).toFixed(2))])
    .sort((a, b) => a[0] - b[0]);
};
