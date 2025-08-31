import { useState } from "react";
import { Button } from "./components/Button";
import { AuthButton } from "./components/AuthButton";
import styles from "./navbar.module.css";

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string>("Home");

  const onTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.profileButton}>
        <AuthButton />
      </div>
      <div className={styles.tabButtons}>
        <Button text="Home" isActive={activeTab === "Home"} onClick={() => onTabClick("Home")} isChannel={true} />
        <Button text="Admin" isActive={activeTab === "Admin"} onClick={() => onTabClick("Admin")} />
      </div>
    </div>
  );
};