import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  function switchTheme() {
    const currentTheme = theme === "light" ? "dark" : "light";
    setTheme(() => currentTheme);
    localStorage.setItem("theme", currentTheme);
    document.body.setAttribute("theme", currentTheme)
  }

  useEffect(() => {
    document.body.setAttribute("theme", theme) 
  }, [])

	return (
		<div onClick={switchTheme} className="theme-button">
      <FontAwesomeIcon icon={theme === "light" ? "sun": "moon"} />
    </div>
	)
}

export default ThemeSwitcher;