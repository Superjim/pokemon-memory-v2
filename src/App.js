import React, { useState, useEffect } from "react";
import DifficultyContainer from "./components/DifficultyContainer";
import "./App.css";

function App() {
  //game data states
  const [gameData, setGameData] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameover, setGameover] = useState(false);

  function shufflePokemon() {
    const shuffled = gameState.sort(() => 0.5 - Math.random());
    setGameState(shuffled);
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
        <div className="pokemon-container">
          {gameState.map((pokemon) => (
            <div className="pokemon-card" key={pokemon.id}>
              <p>{pokemon.name}</p>
              <img src={pokemon.image} alt={pokemon.name}></img>
            </div>
          ))}
        </div>
        <button onClick={shufflePokemon}>Click</button>
      </div>
    );
  }
}

export default App;
