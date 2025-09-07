import { useContext } from "react";
import { UserStoreContext, type UserOverviewState } from "../store/useUserOverviewContext";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export function useUserOverviewStore<T>(selector: (state: UserOverviewState) => T): T {
  const store = useContext(UserStoreContext);

  if (!store) {
    throw new Error("useUserStore must be used within a UserStoreProvider");
  }

  return useStoreWithEqualityFn(store, selector, shallow);
}