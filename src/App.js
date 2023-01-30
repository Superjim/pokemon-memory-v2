import React, { useState, useEffect } from "react";
import Checkbox from "./components/Checkbox";
import gen1 from "./images/gen1.jpg";
import "./App.css";

function App() {
  //difficulty state
  const [userDifficulty, setUserDifficulty] = useState(10);
  const [maxDifficulty, setMaxDifficulty] = useState(151);
  const [rangeDifficulty, setRangeDifficulty] = useState([[1, 151]]);

  //checkbox state, for adding to range
  const [generation1, setGeneration1] = useState(true);
  const [generation2, setGeneration2] = useState(false);
  const [generation3, setGeneration3] = useState(false);
  const [generation4, setGeneration4] = useState(false);
  const [generation5, setGeneration5] = useState(false);
  const [generation6, setGeneration6] = useState(false);
  const [generation7, setGeneration7] = useState(false);
  const [generation8, setGeneration8] = useState(false);

  //useEffect to change difficulty
  useEffect(() => {
    function sumMaxDifficulty() {
      const ranges = [];
      let total = 0;
      if (generation1) {
        ranges.push([1, 151]);
        total += 151;
      }
      if (generation2) {
        ranges.push([152, 251]);
        total += 251 - 151;
      }
      if (generation3) {
        ranges.push([252, 386]);
        total += 386 - 251;
      }
      if (generation4) {
        ranges.push([387, 493]);
        total += 493 - 386;
      }
      if (generation5) {
        ranges.push([494, 649]);
        total += 649 - 493;
      }
      if (generation6) {
        ranges.push([650, 721]);
        total += 721 - 649;
      }
      if (generation7) {
        ranges.push([722, 809]);
        total += 809 - 721;
      }
      if (generation8) {
        ranges.push([810, 905]);
        total += 905 - 809;
      }
      return { total, ranges };
    }

    function getRandomNumbers() {
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
      setRandomArray(numbers);
    }
    getRandomNumbers();
    const total = sumMaxDifficulty();

    if (userDifficulty > total.total) {
      setUserDifficulty(total.total);
      setMaxDifficulty(total.total);
    } else {
      setMaxDifficulty(total.total);
    }
    setRangeDifficulty(total.ranges);
  }, [
    generation1,
    generation2,
    generation3,
    generation4,
    generation5,
    generation6,
    generation7,
    generation8,
    userDifficulty,
  ]);

  //game data states
  const [randomArray, setRandomArray] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);

  function getPokemonData() {
    const pokemonArray = [];
    for (let i = 0; i < randomArray.length; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomArray[i]}`)
        .then((res) => res.json())
        .then((data) => {
          const pokemon = data;
          const name = pokemon.name;
          const index = pokemon.id;
          const image = pokemon.sprites.front_default;
          const type = pokemon.types[0].type.name;
          pokemonArray.push({ index, name, image, type });
          if (pokemonArray.length === randomArray.length) {
            setGameData(pokemonArray);
          }
        });
    }
  }

  function shufflePokemon() {
    const shuffled = gameData.sort(() => 0.5 - Math.random());
    setGameData(shuffled);
  }

  return (
    <div className="App">
      <div className="checkbox-container">
        <Checkbox
          label="Generation 1"
          id="generation1"
          range="(1 - 151)"
          image={gen1}
          checked={generation1}
          onChange={() => setGeneration1(!generation1)}
        />
        <Checkbox
          label="Generation 2"
          id="generation2"
          range="(152 - 251)"
          image="gen2"
          checked={generation2}
          onChange={() => setGeneration2(!generation2)}
        />
        <Checkbox
          label="Generation 3"
          id="generation3"
          range="(252 - 386)"
          image="gen3"
          checked={generation3}
          onChange={() => setGeneration3(!generation3)}
        />
        <Checkbox
          label="Generation 4"
          id="generation4"
          range="(387 - 493)"
          image="gen4"
          checked={generation4}
          onChange={() => setGeneration4(!generation4)}
        />
        <Checkbox
          label="Generation 5"
          id="generation5"
          range="(494 - 649)"
          image="gen5"
          checked={generation5}
          onChange={() => setGeneration5(!generation5)}
        />
        <Checkbox
          label="Generation 6"
          id="generation6"
          range="(650 - 721)"
          image="gen6"
          checked={generation6}
          onChange={() => setGeneration6(!generation6)}
        />
        <Checkbox
          label="Generation 7"
          id="generation7"
          range="(722 - 809)"
          image="gen7"
          checked={generation7}
          onChange={() => setGeneration7(!generation7)}
        />
        <Checkbox
          label="Generation 8"
          id="generation8"
          range="(810 - 905)"
          image="gen8"
          checked={generation8}
          onChange={() => setGeneration8(!generation8)}
        />
      </div>
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

      <button onClick={getPokemonData}>Click me</button>

      <button onClick={shufflePokemon}>Shuffle</button>

      {loading ? <h1>Loading...</h1> : null}
      <div className="pokemon-container">
        {gameData.map((pokemon) => (
          <div key={pokemon.id}>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt={pokemon.name}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
