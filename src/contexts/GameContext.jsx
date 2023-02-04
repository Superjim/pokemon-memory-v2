import React, { useState, createContext } from "react";

const GameContext = createContext();

const GameProvider = (props) => {
  // Game flow states
  const [loading, setLoading] = useState(true);
  const [gameover, setGameover] = useState(false);
  const [page, setPage] = useState(1);

  // nav
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);
  const newGame = () => {
    setLoading(true);
    resetScore();
    setGameover(false);
    setClicked([]);
    setPage(1);
  };

  // game states
  const [gameData, setGameData] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [generation, setGeneration] = useState("Generation 1");

  const shufflePokemon = () => {
    const shuffled = [...gameState];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setGameState(shuffled);
  };

  const handleCheck = (pokemon) => {
    if (clicked.includes(pokemon)) {
      setClicked([...clicked, pokemon]);
      if (score > highScore) setHighScore(score);
      setGameover(true);
    } else {
      setClicked([...clicked, pokemon]);
      shufflePokemon();
      incrementScore();
      // checking for a win condition
      if (clicked.length === gameData.length - 1 && gameData.length !== 0) {
        setGameover(true);
        setPage(5);
        if (score + 1 > highScore) setHighScore(score + 1);
      }
    }
  };

  // score states and functions
  const [score, setScore] = useState(0);
  const incrementScore = () => setScore(score + 1);
  const resetScore = () => setScore(0);

  const [highScore, setHighScore] = useState(0);

  return (
    <GameContext.Provider
      value={{
        gameData,
        setGameData,
        gameState,
        setGameState,
        clicked,
        setClicked,
        generation,
        setGeneration,
        shufflePokemon,
        score,
        incrementScore,
        resetScore,
        highScore,
        setHighScore,
        loading,
        setLoading,
        handleCheck,
        gameover,
        page,
        newGame,
        nextPage,
        prevPage,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
