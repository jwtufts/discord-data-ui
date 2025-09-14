import { DateTime } from 'luxon';
import type { Message } from '../types';

export const groupMessagesByDay = (messages: Message[] | undefined) => {
  if (!messages) return [];

  const counts: Record<string, number> = {};

  messages.forEach(msg => {
    if (msg.createdAt) {
      const day = DateTime.fromISO(msg.createdAt).startOf('day').toISODate();

      if (day) counts[day] = (counts[day] ?? 0) + 1;
    }
  });

  return Object.entries(counts)
    .map(([date, count]) => [new Date(date).getTime(), count])
    .sort((a, b) => a[0] - b[0]);
};
