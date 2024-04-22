import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputSearch from "../InputSearch";
import { PokeBallIcon } from "../CustomIcons";
import { StoreContext } from "@/context/Store";
import { searchPokemonByName } from "@/app/controller/pokemonController";

const Search = () => {
  const { dispatch, state } = useContext(StoreContext);
  
  const findPokemon = async (value: string) => {    
    searchPokemonByName(value, state.pokemon_all.data, dispatch);
  };

  return (
    <main className={styles.search}>
      <div className={styles.search__container}>
        <div className={styles.search__header}>
          <PokeBallIcon /> <span>Pokedex</span>
        </div>
        <div className={styles.search__content}>
          <h1>Find your favorite pokemon</h1>
          <InputSearch onSubmit={(pokemonName) => findPokemon(pokemonName)} />
        </div>
      </div>
    </main>
  );
};

export default Search;
