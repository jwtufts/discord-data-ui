import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';

const fetchHasRole = async (roleName: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/me/has-role?roleName=${encodeURIComponent(roleName)}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to check role: ${response.statusText}`);
  }

  return response.json().then((data) => data.hasRole);
};

export const useHasRole = (roleName: string) => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['hasRole', roleName],
    queryFn: () => fetchHasRole(roleName),
    enabled: !!user && !!roleName,
    staleTime: 60 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
