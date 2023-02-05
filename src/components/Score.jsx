import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

function Score() {
  const { score, highScore, gameState } = useContext(GameContext);

  return (
    <>
      <div className="score-container">
        <h3>
          Score: {score} / {gameState && gameState.length}
        </h3>

        <h3>High Score: {highScore}</h3>
      </div>
      <p>
        Get points by clicking on a Pokemon, but don't click on the same one
        more than once!
      </p>
    </>
  );
}

export default Score;
