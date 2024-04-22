import {
    PokemonDetail,
    PokemonSingleLocation,
    PokemonSpecieType,
    PokemonTypeDetail,
  } from ".";
  
  export type PokemonDetailState = {
    detail: PokemonDetail;
    specie: PokemonSpecieType;
    evolutionChain: PokemonDetail[];
    type: PokemonTypeDetail[];
    advantageAgainstTypes: string[];
    locations: PokemonSingleLocation[];
  };
  