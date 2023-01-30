import React, { useState, useEffect } from "react";
import DifficultyContainer from "./components/DifficultyContainer";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
  //game data states
  const [gameData, setGameData] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameover, setGameover] = useState(false);

  function shufflePokemon() {
    const shuffled = [...gameState];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setGameState(shuffled);
  }

  function handleCheck(pokemon) {
    //if user clicks same pokemon twice
    if (clicked.includes(pokemon)) {
      setClicked([...clicked, pokemon]);
      setGameover(true);
    } else {
      setClicked([...clicked, pokemon]);
      shufflePokemon();
      setScore(score + 1);
    }
  }

  useEffect(() => {
    function getPokemonData() {
      const pokemonArray = [];
      for (let i = 0; i < gameData.length; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${gameData[i]}`)
          .then((res) => res.json())
          .then((data) => {
            const pokemon = data;
            const name = pokemon.name;
            const index = pokemon.id;
            const image = pokemon.sprites.front_default;
            const type = pokemon.types[0].type.name;
            pokemonArray.push({ index, name, image, type });
            if (pokemonArray.length === gameData.length) {
              setGameState(pokemonArray);
              setLoading(false);
            }
          });
      }
    }

    getPokemonData();
  }, [gameData]);

  if (loading) {
    return (
      <div className="App">
        <DifficultyContainer setGameData={setGameData} />
      </div>
    );
  }
  if (!loading && !gameover) {
    return (
      <div className="App">
        <div className="score-card">
          <h3>Score: {score}</h3>
        </div>
        <div className="pokemon-container">
          {gameState.map((pokemon) => (
            <PokemonCard
              key={`${pokemon.name}-${pokemon.index}`}
              pokemon={pokemon}
              type={pokemon.type}
              handleCheck={handleCheck}
            />
          ))}
        </div>
      </div>
    );
  }
  if (gameover) {
    return (
      <div className="App">
        <p>You lose! Score: {score}. You clicked this one twice:</p>
        <PokemonCard
          key={`${clicked[clicked.length - 1].name}-${
            clicked[clicked.length - 1].index
          }`}
          pokemon={clicked[clicked.length - 1]}
          type={clicked[clicked.length - 1].type}
          handleCheck={handleCheck}
        />
        <p>You clicked on:</p>
        <div className="pokemon-container">
          {clicked.slice(0, -1).map((pokemon) => (
            <PokemonCard
              key={`${pokemon.name}-${pokemon.index}`}
              pokemon={pokemon}
              type={pokemon.type}
              handleCheck={handleCheck}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
