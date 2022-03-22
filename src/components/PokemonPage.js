import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";
// import { useEffect, useState } from "react/cjs/react.production.min";

function PokemonPage() {
  const [pokedex, setPokedex] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/pokemon`)
      .then( res => res.json())
      .then( data => setPokedex(data))
      .catch( error => console.log(error.message));
  }, [])

  const filteredPokedex = pokedex.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()));

  function addToPokedex(pokemonData) {
    fetch(`http://localhost:3001/pokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(pokemonData)
    })
      .then( res => res.json())
      .then( newPokemon => setPokedex([...pokedex, newPokemon]))
      .catch( error => console.log(error.message));
  }

  function updatePokemonHp(pokemon) {
    fetch(`http://localhost:3001/pokemon/${pokemon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        hp: pokemon.hp
      })
    })
      .then( res => res.json())
      .then( updatedPokemon => {
        const updatedPokedex = pokedex.map(pokemon => {
          return pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon;
        })
        setPokedex(updatedPokedex);
      })
      .catch( error => console.log(error.message));
  }

  function deletePokemon(deletedPokemon) {
    fetch(`http://localhost:3001/pokemon/${deletedPokemon.id}`, {
      method: "DELETE"
    })
      .then( res => {
        if (res.ok) {
          const updatedPokedex = pokedex.filter(pokemon => deletedPokemon.id !== pokemon.id);
          setPokedex(updatedPokedex);
        } else {
          alert('something went wrong!')
        }
      })
      .catch( error => alert('something went wrong!'));
  }

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm addToPokedex={addToPokedex} />
      <br />
      <Search setSearchInput={setSearchInput} searchInput={searchInput} />
      <br />
      <PokemonCollection pokedex={filteredPokedex} updatePokemonHp={updatePokemonHp} deletePokemon={deletePokemon} />
    </Container>
  );
}

export default PokemonPage;
