import React from 'react';
import { Button } from './Button';
import { useAuthStore } from '../../../store/useAuthStore';
import { API_BASE_URL } from '../../../config/api';

export const AuthButton: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/discord/login`;
  };

  const handleLogout = () => {
    setUser(null);
    window.location.href = `${API_BASE_URL}/auth/logout`;
  };

  return (
    <Button
      text={user ? "Logout" : "Log In"}
      isActive={!!user}
      isChannel={false}
      onClick={user ? handleLogout : handleLogin}
    />
  );
};
