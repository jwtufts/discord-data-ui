import { IconUser } from '@tabler/icons-react'
import styles from './userOverview.module.css'
import { UserDropdown } from './components/UserDropdown'
import { DataCard } from './components/DataCard'
import { useMessagesByUser } from '../../hooks/useMessagesByUser'
import { useUserOverviewStore } from '../../hooks/useUserOverviewStore'
import { DateTime } from 'luxon';

export const UserOverview = () => {
  const { selectedUser } = useUserOverviewStore((state) => ({ selectedUser: state.selectedUser }));
  const { data: weeklyMessages } = useMessagesByUser(selectedUser, DateTime.now().startOf('week').startOf('day').toISO(), DateTime.now().toISO())

  return (
    <div>
      <div className={styles.userSelectorWrapper}>
        <span className={styles.title}><IconUser size={14} /><span>User: </span></span>
        <UserDropdown />
      </div>
      <div className={styles.userDataWrapper}>
        <div className={styles.dataCards}>
          <DataCard title="Messages this Week" data={weeklyMessages?.length ?? ''} />
          <DataCard title="Voice Min this Week" data={5} />
          <DataCard title="Messages this Month" data={5} />
          <DataCard title="Voice Min this Month" data={5} />
          <DataCard title="Current Rank" data={5} />
          <DataCard title="Weekly Rank" data={2} />
          <DataCard title="Monthly Rank" data={8} />
          <DataCard title="Yearly Rank" data={11} />
        </div>
      </div>
    </div>
  )
}