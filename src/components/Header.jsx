import React from "react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

function Header({ auth, firebase, user }) {
  const { score, highScore, gameState } = useContext(GameContext);

  return (
    <div className="header">
      <h1>Pokemon Memory Game</h1>
      {score > 0 ? (
        <span>
          <h3>
            Score: {score} / {gameState.length}
          </h3>
        </span>
      ) : (
        <></>
      )}

      <span>
        <h3>High Score: {highScore}</h3>
      </span>
      <span>
        {user ? (
          <SignOut auth={auth} />
        ) : (
          <SignIn firebase={firebase} auth={auth} />
        )}
      </span>
    </div>
  );
}

export default Header;
