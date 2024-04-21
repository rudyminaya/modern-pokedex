export type Action =
  | { type: "ADD_FAVORITE"; payload: number }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "LOAD_POKEMON_PAGINATED" }
  | { type: "LOAD_POKEMON_PREVIOUS" }
  | { type: "LOAD_POKEMON_NEXT" }
  | { type: "LOAD_POKEMON_ALL" }
  | { type: "LOAD_REGIONS" }
  | { type: "LOAD_TYPES" }
  | { type: "LOAD_FAVORITES" }
  | { type: "LOAD_POKEMON_DETAIL_FROM_ID"; payload: { id: number } }
  | { type: "LOAD_POKEMON_DETAIL_FROM_URL"; payload: { url: string } }
  | { type: "LOAD_POKEMON_SPECIES"; payload: number }
  | { type: "LOAD_POKEMON_TYPE"; payload: string }
