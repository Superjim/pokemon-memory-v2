import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import Leaderboard from "./Leaderboard";
import PokemonCard from "./PokemonCard";

function Gameover({ firestore, auth, firebase }) {
  const { score, clicked, gameState, newGame, page, nextPage, prevPage } =
    useContext(GameContext);

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
            pokemon={clicked[clicked.length - 1]}
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
            {clicked.slice(0, -1).map((pokemon, index) => (
              <PokemonCard
                key={index}
                pokemon={pokemon}
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
              .map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  pokemon={pokemon}
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
        <Leaderboard firebase={firebase} firestore={firestore} auth={auth} />
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
            {gameState.map((pokemon, index) => (
              <PokemonCard
                key={index}
                pokemon={pokemon}
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
