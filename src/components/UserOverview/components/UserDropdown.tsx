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

  const dropdownData = useMemo(() => {
    if (isLoading || error) {
      return [{ value: 'none', label: 'No Users Available' }];
    }

    if (isAdmin) {
      return allActiveUsers?.map((user: Author) => ({
        value: user.userId ?? '',
        label: user.globalName ?? user.userName ?? "Unknown",
      })) ?? [{ value: 'none', label: 'No Users Available' }];
    }

    if (userGuildMember?.user?.id) {
      return [{
        value: userGuildMember.user.id,
        label: userGuildMember.nick ?? userGuildMember.user.global_name ?? userGuildMember.user.username ?? "Unknown",
      }];
    }

    return [{ value: 'none', label: 'No Users Available' }];
  }, [allActiveUsers, error, isAdmin, isLoading, userGuildMember]);

  const onUserSelect = useCallback((value: string | null) => {
    setSelectedUser(value);
  }, [setSelectedUser]);

  return (
    <div className={styles.dropdownWrapper}>
      <Select
        placeholder="Select a user"
        data={dropdownData}
        value={selectedUser ?? null}
        onChange={onUserSelect}
        disabled={isLoading || !!error}
      />
    </div>
  );
};
