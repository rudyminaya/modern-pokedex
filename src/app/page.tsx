"use client";
import { useContext, useEffect, useMemo } from "react";
import { StoreContext } from "@/context/Store";
import Search from "./components/Search";

import ListingCards from "./components/ListingCards";
import { loadPokemonPaginated } from "./controller/pokemonController";
import Navigation from "./components/Navigation";

export default function Home() {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    loadPokemonPaginated(state, dispatch);
  }, []);

  const pokemonData = useMemo(() => {
    if (state.pokemon_search.searching) {
      return state.pokemon_search.results;
    }
    return state.pokemon_pagination.page.results;
  }, [state.pokemon_search, state.pokemon_pagination]);

  const goToPreviousPage = () => {
    if (state.pokemon_pagination.page.previous) {
      loadPokemonPaginated(
        state,
        dispatch,
        state.pokemon_pagination.page.previous,
      );
    }
  };
  const goToNextPage = () => {
    if (state.pokemon_pagination.page.next) {
      loadPokemonPaginated(state, dispatch, state.pokemon_pagination.page.next);
    }
  };

  return (
    <>
      <Search />
      {!state.pokemon_search.searching && (
        <Navigation
          prevDisabled={
            !state.pokemon_pagination.page.previous ||
            state.pokemon_pagination.loading
          }
          onPrev={goToPreviousPage}
          nextDisabled={
            !state.pokemon_pagination.page.next ||
            state.pokemon_pagination.loading
          }
          onNext={goToNextPage}
        />
      )}
      <ListingCards listingData={pokemonData} />
      {!state.pokemon_search.searching && (
        <Navigation
          prevDisabled={
            !state.pokemon_pagination.page.previous ||
            state.pokemon_pagination.loading
          }
          onPrev={goToPreviousPage}
          nextDisabled={
            !state.pokemon_pagination.page.next ||
            state.pokemon_pagination.loading
          }
          onNext={goToNextPage}
        />
      )}
    </>
  );
}
