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

  return (
    <>
      <CheckboxContainer
        setRangeDifficulty={setRangeDifficulty}
        setMaxDifficulty={setMaxDifficulty}
      />
      <input
        name="difficultyInput"
        id="difficultyInput"
        type="range"
        min="2"
        max={maxDifficulty}
        value={userDifficulty}
        onChange={(e) => setUserDifficulty(+e.target.value)}
      ></input>
      {userDifficulty}
      <button onClick={createRandomArray}>Send difficulty data</button>
    </>
  );
}

export default DifficultyContainer;
