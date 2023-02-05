import React, { useEffect, useContext } from "react";
import DifficultyContainer from "./components/DifficultyContainer";
import PokemonCard from "./components/PokemonCard";
import Header from "./components/Header";
import Gameover from "./components/Gameover";
import Score from "./components/Score";
import "./App.css";

import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

import { GameContext } from "./contexts/GameContext";

firebase.initializeApp({
  apiKey: "AIzaSyBJjGN135MmiuGmJpqw4IpwHM4UWYPS-yo",
  authDomain: "pokemon-game-4c3db.firebaseapp.com",
  projectId: "pokemon-game-4c3db",
  storageBucket: "pokemon-game-4c3db.appspot.com",
  messagingSenderId: "927059662112",
  appId: "1:927059662112:web:0e08557be437ac8dd6b345",
});

function App() {
  //firebase
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [user] = useAuthState(auth);

  //gameData
  const {
    gameData,
    gameState,
    setGameState,
    loading,
    setLoading,
    gameover,
    handleCheck,
  } = useContext(GameContext);

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
        <Header firebase={firebase} auth={auth} user={user} />
        <DifficultyContainer />
      </div>
    );
  }
  if (!loading && !gameover) {
    return (
      <div className="App">
        <Header firebase={firebase} auth={auth} user={user} />
        <div className="container-wrapper">
          <div className="pokemon-container box-shadow">
            {gameState.map((pokemon, index) => (
              <PokemonCard
                key={index}
                pokemon={pokemon}
                handleCheck={handleCheck}
              />
            ))}
          </div>
          <Score />
        </div>
      </div>
    );
  }
  if (gameover) {
    return (
      <div className="App">
        <Header firebase={firebase} auth={auth} user={user} />
        <Gameover
          firestore={firestore}
          auth={auth}
          firebase={firebase}
          user={user}
        />
      </div>
    );
  }
}

export default App;
