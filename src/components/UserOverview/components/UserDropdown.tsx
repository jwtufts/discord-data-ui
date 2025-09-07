import { Select } from '@mantine/core';
import styles from './userDropdown.module.css';
import { useHasRole } from '../../../hooks/useHasRole';
import { useUserGuildData } from '../../../hooks/useUserGuildData';
import { useCallback, useMemo } from 'react';
import { useAllActiveUsers } from '../../../hooks/useAllActiveUsers';
import { useUserOverviewStore } from '../../../hooks/useUserOverviewStore';
import type { Author } from '../../../types';

const noUsers = ["No Users Available"];

export const UserDropdown = () => {
  const { data: userGuildMember, isLoading, error } = useUserGuildData();
  const { data: isAdmin } = useHasRole('hoes mad');
  const { data: allActiveUsers } = useAllActiveUsers();
  const { selectedUser, setSelectedUser } = useUserOverviewStore((state) => ({ selectedUser: state.selectedUser, setSelectedUser: state.setSelectedUser }));

  const allUserNames: string[] = useMemo(() => {
    return allActiveUsers ? allActiveUsers
      .map((user: Author) => user.globalName ?? user.userName)
      .filter((name) => name !== undefined) : [];
  }, [allActiveUsers]);

  const dropdownData: string[] = useMemo(() => {
    if (isLoading || error) return noUsers;

    if (isAdmin) {
      return allUserNames ?? noUsers;
    } else {
      return userGuildMember?.nick ? [userGuildMember.nick] : noUsers;
    }
  }, [allUserNames, error, isAdmin, isLoading, userGuildMember?.nick]);

  const onUserSelect = useCallback((value: string | null) => {
    setSelectedUser(value);
  }, [setSelectedUser]);

  return (
    <div className={styles.dropdownWrapper}>
      <Select
        placeholder="Select a user"
        data={dropdownData}
        value={selectedUser}
        onChange={onUserSelect}
      />
    </div>
  );
};
