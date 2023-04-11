import React from "react";
import { Pokemon } from "../contexts/GameContext";

type PokemonCardProps = {
  pokemon: Pokemon;
  handleCheck: (pokemon: Pokemon) => void;
};

function PokemonCard({ pokemon, handleCheck }: PokemonCardProps) {
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
