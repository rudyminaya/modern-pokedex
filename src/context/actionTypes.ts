export type Action =  
  | { type: "ADD_FAVORITE"; payload: number }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "LOAD_POKEMON_PAGINATED"}
  | { type: "LOAD_POKEMON_PREVIOUS" }
  | { type: "LOAD_POKEMON_NEXT" }
  | { type: "LOAD_POKEMON_ALL" }
  | { type: "LOAD_REGIONS" }
  | { type: "LOAD_TYPES" }
  | { type: "LOAD_FAVORITES" }