import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import type { RankByUserExp } from '../types';

const fetchUserRank = async (userId: string | null): Promise<RankByUserExp> => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1/rank/byUserId?userId=${encodeURIComponent(userId)}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch UserExp: ${response.statusText}`);
  }

  return response.json();
};

export const useUserRank = (userId: string | null) => {
  return useQuery<RankByUserExp>({
    queryKey: ['userExpByUserId', userId],
    queryFn: () => fetchUserRank(userId),
    enabled: !!userId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 5 * 60 * 1000,     // 5 minutes
  });
};
