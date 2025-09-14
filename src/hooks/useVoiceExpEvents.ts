import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import type { ExpEvent } from '../types';

const fetchVoiceExpEvents = async (userId: string | null, reason: string | null, from: string | null, to: string): Promise<ExpEvent[]> => {
  if (!userId) return [];

  const params = new URLSearchParams({ userId, to });
  if (from) params.append('from', from);

  const response = await fetch(`${API_BASE_URL}/api/v1/exp/byUserId?${params.toString()}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to grab voice minutes: ${response.statusText}`);
  }

  return response.json();
};

export const useVoiceExpEvents = (userId: string | null, reason: string | null, from: string | null, to: string) => {
  return useQuery({
    queryKey: ['voiceExpEventsByUserId', userId, reason, from],
    queryFn: () => fetchVoiceExpEvents(userId, reason, from, to),
    enabled: !!userId && !!to,
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
