import { Cached, PokemonIndex, PokemonRegion } from "@/types";
import { PokemonDetailState } from "@/types/state";

export type Action =
  | { type: "ADD_FAVORITE"; payload: number }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "LOAD_POKEMON_PAGINATED" }
  | { type: "LOAD_POKEMON_PREVIOUS" }
  | { type: "LOAD_POKEMON_NEXT" }
  | { type: "SET_POKEMON_ALL"; payload: Cached<PokemonIndex[]> }
  | { type: "SET_REGIONS"; payload: Cached<PokemonRegion[]> }
  | { type: "SET_TYPES"; payload: Cached<PokemonIndex[]> }
  | { type: "LOAD_FAVORITES" }
  | { type: "SET_POKEMON_DETAIL"; payload: PokemonDetailState }
  | { type: "LOAD_POKEMON_TYPE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };
