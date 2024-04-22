import {
  Paginated,
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

export type PokemonSearchState = {
  searching: boolean;
  loading: boolean;
  results: PokemonDetail[];
};

export type PokemonPaginationState = {
  loading: boolean;
  page: Paginated<PokemonDetail[]>;
};

export type PokemonType = {
  name: string;
  url: string;
};
export type PokemonIndex = {
  name: string;
  url: string;
};
export type PokemonRegion = {
  name: string;
  url: string;
};
export type PokemonPage = {
  next: string | null;
  previous: string | null;
  results: PokemonDetail[];
};
