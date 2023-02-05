import React, { useState, createContext } from "react";

const GameContext = createContext();

const GameProvider = (props) => {
  //colour themes
  const [theme, setTheme] = useState("gyrados");

  const themes = {
    //primary - main color
    //secondary - light/dark main color
    //other - light contrast colour
    //text - contrast main color
    gyrados: {
      "--primary": "#104a73",
      "--secondary": "#cdcdd5",
      "--other": "#ffcdcd",
      "--text": "#ffffff",
    },
    syther: {
      "--primary": "#8bcd73",
      "--secondary": "#fff6d5",
      "--other": "#e6d5ac",
      "--text": "black",
    },
    pikachu: {
      "--primary": "#de9400",
      "--secondary": "#f6e652",
      "--other": "#e65a41",
      "--text": "#292929",
    },
    arbok: {
      "--primary": "#52397b",
      "--secondary": "#eee652",
      "--other": "#c5a4ee",
      "--text": "white",
    },
    pidgey: {
      "--primary": "#412918",
      "--secondary": "#e6bd62",
      "--other": "#bd2920",
      "--text": "white",
    },
    venasaur: {
      "--primary": "#105241",
      "--secondary": "#5a9c39",
      "--other": "#ff7b73",
      "--text": "black",
    },
    clefairy: {
      "--primary": "#ffacac",
      "--secondary": "#9c5252",
      "--other": "#949494",
      "--text": "black",
    },
    parasect: {
      "--primary": "#621000",
      "--secondary": "#bd3141",
      "--other": "#de6a31",
      "--text": "white",
    },
    venomoth: {
      "--primary": "#624a73",
      "--secondary": "#9c8bbd",
      "--other": "#a4837b",
      "--text": "white",
    },
    onyx: {
      "--primary": "#524a4a",
      "--secondary": "#bdb4b4",
      "--other": "#ded5d5",
      "--text": "white",
    },
    jynx: {
      "--primary": "#bd3162",
      "--secondary": "#ff7373",
      "--other": "#ffe652",
      "--text": "white",
    },
    mew: {
      "--primary": "#5a2952",
      "--secondary": "#ee83b4",
      "--other": "#83acf6",
      "--text": "black",
    },
  };

  const updateCSSVariables = (theme) => {
    Object.entries(themes[theme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

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
        theme,
        setTheme,
        updateCSSVariables,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
