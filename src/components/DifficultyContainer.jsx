import React, { useState, useEffect } from "react";
import CheckboxContainer from "./CheckboxContainer";

function DifficultyContainer({ setGameData }) {
  const [maxDifficulty, setMaxDifficulty] = useState(151);
  const [rangeDifficulty, setRangeDifficulty] = useState([[1, 151]]);
  const [userDifficulty, setUserDifficulty] = useState(10);

  useEffect(() => {
    if (userDifficulty > maxDifficulty) setUserDifficulty(maxDifficulty);
  }, [userDifficulty, maxDifficulty, setUserDifficulty]);

  function createRandomArray() {
    //for each range, add all the possible numbers to an array
    let numbers = [];
    rangeDifficulty.forEach((range) => {
      for (let i = range[0]; i <= range[1]; i++) {
        numbers.push(i);
      }
    });
    //randomise the array
    numbers = numbers.sort(() => Math.random() - 0.5);

    //splice the array with difficulty
    numbers = numbers.splice(0, userDifficulty);

    //save to state
    setGameData(numbers);
  }

  const style = {
    background: `linear-gradient(to right, green, red ${
      100 - (userDifficulty / maxDifficulty) * 100
    }%)`,
  };

  return (
    <div className="difficulty-container">
      <CheckboxContainer
        setRangeDifficulty={setRangeDifficulty}
        setMaxDifficulty={setMaxDifficulty}
      />
      <h3>Difficulty: {userDifficulty} Pokemon</h3>
      <input
        name="difficultyInput"
        id="difficultyInput"
        type="range"
        min="2"
        max={maxDifficulty}
        value={userDifficulty}
        onChange={(e) => setUserDifficulty(+e.target.value)}
        style={style}
      ></input>
      <p>
        Get points by clicking on a Pokemon, but don't click on one more than
        once!
      </p>
      {rangeDifficulty.length === 0 ? (
        <h3>Please select atleast one generation of Pokemon</h3>
      ) : (
        ""
      )}
      {userDifficulty < 2 ? (
        <button disabled>
          Please select at least difficulty level 2 to start the game
        </button>
      ) : (
        <button onClick={createRandomArray}>Start Game!</button>
      )}
    </div>
  );
}

export default DifficultyContainer;
