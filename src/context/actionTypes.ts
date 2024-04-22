import { Cached, PokemonDetail } from "@/types"
import {
  FilterPokemonState,
  PokemonDetailState,
  PokemonIndex,
  PokemonPaginationState,
  PokemonRegion,
  PokemonSearchState,
} from "@/types/state"

export type Action =
  | { type: "ADD_FAVORITE"; payload: number }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "SET_POKEMON_PAGINATION"; payload: PokemonPaginationState }
  | { type: "SET_POKEMON_ALL"; payload: Cached<PokemonIndex[]> }
  | { type: "SET_REGIONS"; payload: Cached<PokemonRegion[]> }
  | { type: "SET_TYPES"; payload: Cached<PokemonIndex[]> }
  | { type: "LOAD_FAVORITES" }
  | { type: "SET_POKEMON_DETAIL"; payload: PokemonDetailState }
  | { type: "LOAD_POKEMON_TYPE"; payload: string }
  | {
      type: "SET_FILTER_POKEMON_BY_TYPE"
      payload: FilterPokemonState
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_POKEMON_SEARCH_RESULTS"; payload: PokemonSearchState }
  | { type: "STOP_FILTERING" }
  | { type: "STOP_SEARCH" }
