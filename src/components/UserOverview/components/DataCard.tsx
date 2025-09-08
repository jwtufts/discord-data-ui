import styles from './dataCard.module.css';

interface DataCardProps {
  title: string;
  data: string | number;
}

export const DataCard = ({ title, data }: DataCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.data}>{data}</div>
    </div>
  );
};