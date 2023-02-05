import React from "react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";

function Header({ auth, firebase, user }) {
  const { theme, setTheme, updateCSSVariables } = useContext(GameContext);

  useEffect(() => {
    updateCSSVariables(theme);
  }, [theme]);

  return (
    <div className="header">
      <h1>Pokemon Memory Game</h1>
      <div>
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

      <div>
        {user ? (
          <SignOut auth={auth} />
        ) : (
          <SignIn firebase={firebase} auth={auth} />
        )}
      </div>
    </div>
  );
}

export default Header;
