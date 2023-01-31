import React from "react";
import Leaderboard from "./Leaderboard";
import PokemonCard from "./PokemonCard";

function Gameover({
  score,
  clicked,
  gameState,
  newGame,
  page,
  setPage,
  firestore,
  auth,
}) {
  function nextPage() {
    setPage(page + 1);
  }

  function prevPage() {
    setPage(page - 1);
  }

  if (page === 1) {
    return (
      <div id="endgame-1" className="container-wrapper">
        <h2>
          Well done! You scored {score} out of {gameState.length} points.
        </h2>
        <h3>You clicked on {clicked[clicked.length - 1].name} twice.</h3>
        <div className="button-wrapper">
          <button disabled>Back</button>
          <PokemonCard
            key={`${clicked[clicked.length - 1].name}-${
              clicked[clicked.length - 1].index
            }`}
            pokemon={clicked[clicked.length - 1]}
            type={clicked[clicked.length - 1].type}
            handleCheck={nextPage}
          />
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    );
  }
  if (page === 2) {
    return (
      <div id="endgame-2" className="container-wrapper">
        <h3>The Pokemon you clicked on were:</h3>
        <div className="button-wrapper">
          <button onClick={prevPage}>Back</button>
          <div className="pokemon-container">
            {clicked.slice(0, -1).map((pokemon) => (
              <PokemonCard
                key={`${pokemon.name}-${pokemon.index}`}
                pokemon={pokemon}
                type={pokemon.type}
                handleCheck={nextPage}
              />
            ))}
          </div>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    );
  }
  if (page === 3) {
    return (
      <div id="endgame-3" className="container-wrapper">
        <h3>You forgot to pick:</h3>
        <div className="button-wrapper">
          <button onClick={prevPage}>Back</button>
          <div className="pokemon-container">
            {gameState
              .filter((x) => !clicked.includes(x))
              .map((pokemon) => (
                <PokemonCard
                  key={`${pokemon.name}-${pokemon.index}`}
                  pokemon={pokemon}
                  type={pokemon.type}
                  handleCheck={nextPage}
                />
              ))}
          </div>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    );
  }
  if (page === 4) {
    return (
      <div className="container-wrapper">
        <h3>Game Over!</h3>
        <Leaderboard
          firestore={firestore}
          auth={auth}
          score={score}
          gameState={gameState}
        />
        {/* <div className="pokemon-container">
          <PokemonCard
            key={`${clicked[clicked.length - 1].name}-${
              clicked[clicked.length - 1].index
            }`}
            pokemon={clicked[clicked.length - 1]}
            type={clicked[clicked.length - 1].type}
            handleCheck={newGame}
          />
        </div> */}
        <button onClick={newGame}>Play Again</button>
      </div>
    );
  }
  if (page === 5) {
    return (
      <div id="endgame-1" className="container-wrapper">
        <h2>
          Well done! You scored a maximum of {score} out of {gameState.length}{" "}
          points!
        </h2>
        <div className="button-wrapper">
          <button disabled>Back</button>
          <div className="pokemon-container">
            {gameState.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.name}-${pokemon.index}`}
                pokemon={pokemon}
                type={pokemon.type}
                handleCheck={prevPage}
              />
            ))}
          </div>
          <button onClick={prevPage}>Next</button>
        </div>
      </div>
    );
  }
}

export default Gameover;
