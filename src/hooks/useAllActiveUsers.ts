import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';
import type { Author } from '../types';

const fetchAllActiveUsers = async (): Promise<Author[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/guild/allActiveUsers`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch all active users: ${response.statusText}`);
  }

  return response.json();
};

export const useAllActiveUsers = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['allActiveUsers'],
    queryFn: fetchAllActiveUsers,
    enabled: !!user,
    staleTime: 60 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
