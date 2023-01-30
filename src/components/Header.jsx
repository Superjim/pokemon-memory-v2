import React from "react";

function Header({ score, highScore, gameState }) {
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
    </div>
  );
}

export default Header;
