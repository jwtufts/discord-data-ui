import styles from './Header.module.css';
import { useUserGuildData } from '../../hooks/useUserGuildData';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title = "Dashboard" }: HeaderProps) => {
  const { data: userGuildMember, isLoading, error } = useUserGuildData();
  console.log(userGuildMember);
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {isLoading && <span>Loading...</span>}
      {error && <span>Error loading user data</span>}
      {userGuildMember && (
        <div className={styles.userInfo}>
          <span>Welcome, {userGuildMember.nick || 'User'}</span>
        </div>
      )}
    </header>
  );
};
