import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faDesktop } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/components/ThemeSwitcher.scss";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (theme: string) => {
    const htmlTag = document.documentElement;
    htmlTag.classList.remove("theme-light", "theme-dark");
    if (theme !== "system") {
      htmlTag.classList.add(`theme-${theme}`);
    }
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const handleThemeChange = (theme: string) => {
    applyTheme(theme);
    setIsDropdownOpen(false); // Close the dropdown when an item is clicked
  };

  const getThemeText = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
      default:
        return "System";
    }
  };

  return (
    <div
      className={`navbar-item has-dropdown theme-dropdown is-hoverable ${
        isDropdownOpen ? "is-active" : ""
      }`}
    >
      <a
        className={`navbar-link ${theme === "light" ? "has-text-white" : ""}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FontAwesomeIcon
          icon={
            theme === "dark" ? faMoon : theme === "light" ? faSun : faDesktop
          }
          className="mr-2"
        />
        {getThemeText()}
      </a>

      <div className="navbar-dropdown">
        <a className="navbar-item" onClick={() => handleThemeChange("light")}>
          <FontAwesomeIcon icon={faSun} className="mr-2" />
          Light
        </a>
        <a className="navbar-item" onClick={() => handleThemeChange("dark")}>
          <FontAwesomeIcon icon={faMoon} className="mr-2" />
          Dark
        </a>
        <a className="navbar-item" onClick={() => handleThemeChange("system")}>
          <FontAwesomeIcon icon={faDesktop} className="mr-2" />
          System
        </a>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
