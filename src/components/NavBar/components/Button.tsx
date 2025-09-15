import React, { type ComponentType } from 'react';
import styles from './Button.module.css';
import type { IconProps } from '@tabler/icons-react';

interface ButtonProps {
  text?: string;
  icon?: ComponentType<IconProps>;
  onClick?: () => void;
  onHover?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
  isChannel?: boolean;
}

export const Button = ({
  text,
  onClick,
  onHover,
  onMouseLeave,
  isActive = false,
  icon: Icon,
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
      {Icon && (
        <div className={styles.icon}>
          <Icon size={18} stroke={1.5} />
        </div>
      )}
      <span className={styles.text}>{text}</span>
    </button>
  );
};
