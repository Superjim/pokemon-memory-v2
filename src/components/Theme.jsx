import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";

function Theme() {
  const { theme, setTheme, updateCSSVariables } = useContext(GameContext);

  useEffect(() => {
    updateCSSVariables(theme);
  }, [theme]);

  return (
    <div className="theme-container">
      <h4>Choose Theme:</h4>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="gyrados">Mr. Mime</option>
        <option value="syther">Syther</option>
        <option value="pikachu">Pikachu</option>
        <option value="arbok">Arbok</option>
        <option value="pidgey">Pidgey</option>
        <option value="venasaur">Venasaur</option>
        <option value="clefairy">Clefairy</option>
        <option value="parasect">Parasect</option>
        <option value="venomoth">Venomoth</option>
        <option value="onyx">Onyx</option>
        <option value="jynx">Jynx</option>
        <option value="mew">Mew</option>
      </select>
    </div>
  );
}

export default Theme;
