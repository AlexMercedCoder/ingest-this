import { useState, useEffect } from "react";
import styles from "../styles/Header.module.css"; // Reuse header styles or create new

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Dark Mode">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
