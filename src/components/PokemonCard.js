import React, { useState } from "react";
import { Card } from "semantic-ui-react";

function PokemonCard({ pokemon, updatePokemonHp, deletePokemon }) {
  const [isFront, setIsFront] = useState(true);

  function handleCardClick() {
    setIsFront((isFront) => !isFront);
  }

  function onDamageClick(e) {
    e.stopPropagation();
    const damagedPokemon = {...pokemon, hp: (pokemon.hp - 10)};
    if (damagedPokemon.hp <= 0) {
      deletePokemon(damagedPokemon);
    } else {
      updatePokemonHp(damagedPokemon);
    }
  }

  function onPotionClick(e) {
    e.stopPropagation();
    const healedPokemon = {...pokemon, hp: (pokemon.hp + 20)};
    updatePokemonHp(healedPokemon);
  }

  return (
    <Card onClick={handleCardClick}>
      <div>
        <div className="image">
          <img src={isFront ? pokemon.sprites.front : pokemon.sprites.back} alt="oh no!" />
        </div>
        <div className="content">
          <div className="header">{pokemon.name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {pokemon.hp}
          </span>
        </div>
        <button onClick={onDamageClick}>Damage</button>
        <button onClick={onPotionClick}>Give Potion</button>
      </div>
    </Card>
  );
}

export default PokemonCard;
