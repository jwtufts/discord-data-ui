import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  onHover?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
  isChannel?: boolean;
}

export const Button = ({
  text,
  onClick,
  onHover,
  onMouseLeave,
  isActive = false,
  icon,
  isChannel = true,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.navbarButton} ${isActive ? styles.active : ''} ${isChannel ? styles.channel : ''}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      title={text}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <span className={styles.text}>{text}</span>
    </button>
  );
};
