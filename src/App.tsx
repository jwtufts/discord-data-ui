import { useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { useAuthStore } from "./store/useAuthStore";
import { API_BASE_URL } from "./config/api";
import { Header } from "./components/Header/Header";
import styles from './app.module.css';

function App() {
  useEffect(() => {
    fetch(`${API_BASE_URL}/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((userData) => useAuthStore.getState().setUser(userData))
      .catch(() => useAuthStore.getState().setUser(null));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.navWrapper}>
        <NavBar />
      </div>
      <Header />
    </div>
  );
}

export default App;
