import React, { useState, useEffect } from "react";
import DifficultyContainer from "./components/DifficultyContainer";
import PokemonCard from "./components/PokemonCard";
import Header from "./components/Header";
import Gameover from "./components/Gameover";
import Leaderboard from "./components/Leaderboard";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import "./App.css";

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

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

  //game data states
  const [gameData, setGameData] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [clicked, setClicked] = useState([]);

  //score states
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  //game render states
  const [loading, setLoading] = useState(true);
  const [gameover, setGameover] = useState(false);
  const [page, setPage] = useState(1);

  function shufflePokemon() {
    const shuffled = [...gameState];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setGameState(shuffled);
  }

  function handleCheck(pokemon) {
    //lose condition: if user clicks same pokemon twice
    if (clicked.includes(pokemon)) {
      setClicked([...clicked, pokemon]);
      if (score > highScore) setHighScore(score);
      setGameover(true);
    } else {
      setClicked([...clicked, pokemon]);
      shufflePokemon();
      setScore(score + 1);

      // win condition
      if (clicked.length === gameData.length - 1 && gameData.length !== 0) {
        setGameover(true);
        setPage(5);
        if (score + 1 > highScore) setHighScore(score + 1);
      }
    }
  }

  function newGame() {
    setLoading(true);
    setScore(0);
    setGameover(false);
    setClicked([]);
    setPage(1);
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
        {user ? (
          <SignOut auth={auth} />
        ) : (
          <SignIn firebase={firebase} auth={auth} />
        )}
        <Header score={score} highScore={highScore} gameState={gameState} />

        <DifficultyContainer setGameData={setGameData} />
      </div>
    );
  }
  if (!loading && !gameover) {
    return (
      <div className="App">
        <Header
          score={score}
          highScore={highScore}
          gameState={gameState}
          gameover={gameover}
        />
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
        <Header score={score} highScore={highScore} gameState={gameState} />
        <Gameover
          score={score}
          clicked={clicked}
          gameState={gameState}
          newGame={newGame}
          page={page}
          setPage={setPage}
        />
      </div>
    );
  }
}

export default App;
