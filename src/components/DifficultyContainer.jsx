import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import CheckboxContainer from "./CheckboxContainer";

function DifficultyContainer() {
  const { setGameData, generation, setGeneration } = useContext(GameContext);
  const [maxDifficulty, setMaxDifficulty] = useState(151);
  const [rangeDifficulty, setRangeDifficulty] = useState([[1, 151]]);
  const [userDifficulty, setUserDifficulty] = useState(9);
  const [customInput, setCustomInput] = useState(false);

  useEffect(() => {
    if (userDifficulty > maxDifficulty) setUserDifficulty(maxDifficulty);
  }, [userDifficulty, maxDifficulty, setUserDifficulty]);

  function createRandomArray(difficulty) {
    //for each range, add all the possible numbers to an array
    let numbers = [];
    rangeDifficulty.forEach((range) => {
      for (let i = range[0]; i <= range[1]; i++) {
        numbers.push(i);
      }
    });
    //randomise the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    //splice the array with difficulty
    numbers = numbers.splice(0, difficulty);

    //save to state
    setGameData(numbers);
  }

  return (
    <div className="difficulty-container">
      <CheckboxContainer
        setRangeDifficulty={setRangeDifficulty}
        setMaxDifficulty={setMaxDifficulty}
        generation={generation}
        setGeneration={setGeneration}
      />
      {generation === "None" ? (
        <h3>Please select atleast one generation</h3>
      ) : (
        <h3>Leaderboard Category: {generation}</h3>
      )}
      <h3>Difficulty: {userDifficulty} Pokemon</h3>
      <div className="button-container-diff">
        <button
          style={{ color: "black", backgroundColor: "green", fontWeight: 600 }}
          onClick={() => createRandomArray(9)}
        >
          Easy
        </button>
        <button
          style={{ color: "black", backgroundColor: "orange", fontWeight: 600 }}
          onClick={() => createRandomArray(18)}
        >
          Medium
        </button>
        <button
          style={{ color: "black", backgroundColor: "red", fontWeight: 600 }}
          onClick={() => createRandomArray(27)}
        >
          Hard
        </button>
        <button
          className={customInput ? "selected" : ""}
          style={{ backgroundColor: "grey", fontWeight: 600 }}
          onClick={() => setCustomInput(true)}
        >
          Custom
        </button>
      </div>
      {customInput && (
        <div className="custom-input-container">
          <label>
            Choose the amount of Pokemon with the slider below
            <input
              name="difficultyInput"
              id="difficultyInput"
              type="range"
              min="2"
              max={maxDifficulty}
              value={userDifficulty}
              onChange={(e) => setUserDifficulty(+e.target.value)}
            ></input>
          </label>
        </div>
      )}
      <p>
        Get points by clicking on a Pokemon, but don't click on one more than
        once!
      </p>
      {customInput && (
        <div>
          {userDifficulty < 2 ? (
            <button disabled>
              Please select at least difficulty level 2 to start the game
            </button>
          ) : (
            <button onClick={() => createRandomArray(userDifficulty)}>
              Start Game!
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DifficultyContainer;
