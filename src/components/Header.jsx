import React from "react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

function Header({ score, highScore, gameState, auth, firebase, user }) {
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
