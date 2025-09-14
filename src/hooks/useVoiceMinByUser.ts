import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';

const fetchVoiceMin = async (userId: string | null, from: string, to: string): Promise<number> => {
  if (!userId) return 0;

  const response = await fetch(`${API_BASE_URL}/api/v1/voice/minutes/byUserId?userId=${encodeURIComponent(userId)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, {
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

export const useVoiceMinByUser = (userId: string | null, from: string, to: string) => {
  return useQuery({
    queryKey: ['voiceMinByUserId', userId, from],
    queryFn: () => fetchVoiceMin(userId, from, to),
    enabled: !!userId && !!from && !!to,
    staleTime: 30 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
