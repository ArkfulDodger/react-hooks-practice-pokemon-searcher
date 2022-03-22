import React from "react";
import PokemonCard from "./PokemonCard";
import { Card } from "semantic-ui-react";

function PokemonCollection({ pokedex, updatePokemonHp, deletePokemon }) {
  const mappedPokemon = pokedex.map(pokemon => {
    return <PokemonCard key={pokemon.id} pokemon={pokemon} updatePokemonHp={updatePokemonHp} deletePokemon={deletePokemon} />
  })

  return (
    <Card.Group itemsPerRow={6}>
      {mappedPokemon}
    </Card.Group>
  );
}

export default PokemonCollection;
