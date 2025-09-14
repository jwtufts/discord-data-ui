import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import type { Message } from '../types';

const fetchMessages = async (userId: string | null, from: string | null, to: string): Promise<Message[]> => {
  if (!userId) return [];

  const params = new URLSearchParams({ userId, to });
  if (from) params.append('from', from);

  const response = await fetch(`${API_BASE_URL}/api/v1/messages/search/byUserId?${params.toString()}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to grab messages: ${response.statusText}`);
  }

  return response.json();
};

export const useMessagesByUser = (userId: string | null, from: string | null, to: string) => {
  return useQuery({
    queryKey: ['messagesByUserId', userId, from],
    queryFn: () => fetchMessages(userId, from, to),
    enabled: !!userId && !!to,
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
