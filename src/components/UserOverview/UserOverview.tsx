import { IconUser } from '@tabler/icons-react'
import styles from './userOverview.module.css'
import { UserDropdown } from './components/UserDropdown'
import { UserStoreProvider } from '../../store/useUserOverviewContext'

export const UserOverview = () => {
  return (
    <UserStoreProvider initialUser={null}>
      <div>
        <div className={styles.userSelectorWrapper}>
          <span className={styles.title}><IconUser size={14} /><span>User: </span></span>
          <UserDropdown />
        </div>
        <div className={styles.userDataWrapper}>
          <div className={styles.dataCards}>
            hi
          </div>
        </div>
      </div>
    </UserStoreProvider>
  )
}