import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import type { Message } from '../types';

const fetchMessages = async (userId: string | null, from: string, to: string): Promise<Message[]> => {
  if (!userId) return [];

  const response = await fetch(`${API_BASE_URL}/api/v1/messages/search/byUserId?userId=${encodeURIComponent(userId)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to check role: ${response.statusText}`);
  }

  return response.json();
};

export const useMessagesByUser = (userId: string | null, from: string, to: string) => {
  return useQuery({
    queryKey: ['messagesByUserId', userId, from],
    queryFn: () => fetchMessages(userId, from, to),
    enabled: !!userId && !!from && !!to,
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
