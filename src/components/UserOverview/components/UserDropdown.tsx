import { Select } from '@mantine/core';
import styles from './userDropdown.module.css';
import { useHasRole } from '../../../hooks/useHasRole';
import { useUserGuildData } from '../../../hooks/useUserGuildData';
import { useCallback, useMemo } from 'react';
import { useAllActiveUsers } from '../../../hooks/useAllActiveUsers';
import { useUserOverviewStore } from '../../../hooks/useUserOverviewStore';
import type { Author } from '../../../types';
import { Actions, type TabNode } from 'flexlayout-react';

const noUsers = "No Users Available";

interface UserDropdownProps {
  node?: TabNode;
}

export const UserDropdown = ({ node }: UserDropdownProps) => {
  const { data: userGuildMember, isLoading, error } = useUserGuildData();
  const { data: isAdmin } = useHasRole('hoes mad');
  const { data: allActiveUsers } = useAllActiveUsers();
  const { selectedUser, setSelectedUser } = useUserOverviewStore((state) => ({ selectedUser: state.selectedUser, setSelectedUser: state.setSelectedUser }));

  const dropdownData = useMemo(() => {
    if (isLoading || error) {
      return [{ value: 'none', label: noUsers }];
    }

    if (isAdmin) {
      return allActiveUsers?.map((user: Author) => ({
        value: user.userId ?? '',
        label: user.globalName ?? user.userName ?? "Unknown",
      })) ?? [{ value: 'none', label: noUsers }];
    }

    if (userGuildMember?.user?.id) {
      return [{
        value: userGuildMember.user.id,
        label: userGuildMember.nick ?? userGuildMember.user.global_name ?? userGuildMember.user.username ?? "Unknown",
      }];
    }

    return [{ value: 'none', label: noUsers }];
  }, [allActiveUsers, error, isAdmin, isLoading, userGuildMember]);

  const onUserSelect = useCallback((value: string | null) => {
    setSelectedUser(value);
    const name = allActiveUsers?.filter((author) => author.userId === value).map((author) => author.nickName ?? author.globalName ?? author.userName)[0] ?? "Unknown User";
    if (node) {
      node.getModel().doAction(
        Actions.renameTab(node.getId(), name)
      );
    }
  }, [allActiveUsers, node, setSelectedUser]);

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
