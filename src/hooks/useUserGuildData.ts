import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';
import type { UserGuildMember } from '../types';

const fetchUserGuildMember = async (): Promise<UserGuildMember> => {
  const response = await fetch(`${API_BASE_URL}/me/member`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user guild member: ${response.statusText}`);
  }

  return response.json();
};

export const useUserGuildData = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['userGuildMember'],
    queryFn: fetchUserGuildMember,
    enabled: !!user,
    staleTime: 60 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
