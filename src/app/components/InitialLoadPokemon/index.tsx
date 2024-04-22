"use client";
import { loadPokemonAll, loadTypesAll } from "@/app/controller/pokemonController";
import { StoreContext } from "@/context/Store";

import { useContext, useEffect } from "react";

const InitialLoadPokemon = () => {
  const { dispatch } = useContext(StoreContext);
  useEffect(() => {
    loadPokemonAll(dispatch);
    loadTypesAll(dispatch)
  }, []);
  return <></>;
};

export default InitialLoadPokemon;
