import React from "react";

function PokemonCard({ pokemon, handleCheck }) {
  const type = pokemon.type + " pokemon-card";

  const handleClick = () => {
    handleCheck(pokemon);
  };
  return (
    <div className={type} onClick={handleClick}>
      <img src={pokemon.image} alt={pokemon.name}></img>
      <p>{pokemon.name}</p>
    </div>
  );
}

export default PokemonCard;
