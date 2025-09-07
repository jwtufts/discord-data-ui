import { createContext, useState, type ReactNode } from 'react';
import { createStore, type StoreApi } from 'zustand';

export interface UserOverviewState {
  selectedUser: string | null;
  setSelectedUser: (user: string | null) => void;
}

const UserStoreContext = createContext<StoreApi<UserOverviewState> | null>(null);

interface UserStoreProviderProps {
  initialUser: string | null;
  children: ReactNode;
}

export const UserStoreProvider = ({ children, initialUser }: UserStoreProviderProps) => {
  const [store] = useState(() =>
    createStore<UserOverviewState>((set) => ({
      selectedUser: initialUser,
      setSelectedUser: (user) => set({ selectedUser: user }),
    })))

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  )
}

export { UserStoreContext };


