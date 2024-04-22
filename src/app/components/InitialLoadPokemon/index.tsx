"use client";
import { loadPokemonAll } from "@/app/controller/pokemonController";
import { StoreContext } from "@/context/Store";

import { useContext, useEffect } from "react";

const InitialLoadPokemon = () => {
  const { dispatch } = useContext(StoreContext);
  useEffect(() => {
    loadPokemonAll(dispatch);
  }, []);
  return <></>;
};

export default InitialLoadPokemon;
