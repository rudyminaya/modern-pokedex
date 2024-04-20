'use client'
import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react"

type IProps={
    children:ReactNode
}

type Cached<T> = {
  timestamp: number
  data: T
}
type PokemonType = {
  name: string
  id: number
}
type PokemonIndex = {
  name: string
  id: number
}
type PokemonRegion = {
  name: string
  id: number
}
type State = {
  pokemon_all: Cached<PokemonIndex[]>
  favorites: number[]
  regions: Cached<PokemonRegion[]>
  types: Cached<PokemonType[]>
}

const enum StorageType {
  LOCALSTORAGE,
  SESSIONSTORAGE,
}
const enum StorageKey {
  POKEMON_ALL = "POKEMON_ALL",
  FAVORITES = "FAVORITES",
  REGIONS = "REGIONS",
  TYPES = "TYPES",
}

type StoreDataType<T> = T extends StorageKey.FAVORITES
  ? number[]
  : T extends StorageKey.POKEMON_ALL
  ? PokemonIndex[]
  : T extends StorageKey.REGIONS
  ? PokemonRegion[]
  : T extends StorageKey.TYPES
  ? PokemonType[]
  : never

type Action =
  | { type: "SET_POKEMON_ALL"; payload: PokemonIndex[] }
  | { type: "ADD_FAVORITE"; payload: number }
  | { type: "REMOVE_FAVORITE"; payload: number }
  | { type: "SET_REGIONS"; payload: PokemonRegion[] }
  | { type: "SET_TYPES"; payload: PokemonType[] }
  | { type: "SET_POKEMON"; payload: PokemonIndex[] }
  | { type: "LOAD_POKEMON_ALL" }
  | { type: "LOAD_REGIONS" }
  | { type: "LOAD_TYPES" }
  | { type: "LOAD_FAVORITES" }

function loadFromLocalStorage<T>(key: StorageKey) {
  const item = localStorage.getItem(key)
  return item ? (JSON.parse(item) as T) : null
}
loadFromLocalStorage(StorageKey.FAVORITES)

const InitialState: State = {
  pokemon_all: loadFromLocalStorage(StorageKey.POKEMON_ALL) || {
    timestamp: 0,
    data: [],
  },
  favorites: loadFromLocalStorage(StorageKey.FAVORITES) || [],
  regions: loadFromLocalStorage(StorageKey.REGIONS) || {
    timestamp: 0,
    data: [],
  },
  types: loadFromLocalStorage(StorageKey.TYPES) || { timestamp: 0, data: [] },
}

const StoreContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: InitialState,
  dispatch: () => null,
})

function reducer(state: State, action: Action): State {
  let newState = state
  switch (action.type) {
    case "SET_POKEMON_ALL":
      newState = {
        ...state,
        pokemon_all: { timestamp: Date.now(), data: action.payload },
      }
      break
    case "ADD_FAVORITE":
      newState = { ...state, favorites: [...state.favorites, action.payload] }
      break
    case "REMOVE_FAVORITE":
      newState = {
        ...state,
        favorites: state.favorites.filter((fav) => fav !== action.payload),
      }
      break
    case "SET_REGIONS":
      newState = {
        ...state,
        regions: { timestamp: Date.now(), data: action.payload },
      }
      break
    case "SET_TYPES":
      newState = {
        ...state,
        types: { timestamp: Date.now(), data: action.payload },
      }
      break
    case "SET_POKEMON":
      newState = {
        ...state,
        pokemon_all: { timestamp: Date.now(), data: action.payload },
      }
      break
    case "LOAD_POKEMON_ALL":
      newState = {
        ...state,
        pokemon_all: {
          timestamp: Date.now(),
          data: loadFromLocalStorage(StorageKey.POKEMON_ALL) || [],
        },
      }
      break
    case "LOAD_REGIONS":
      newState = {
        ...state,
        regions: {
          timestamp: Date.now(),
          data: loadFromLocalStorage(StorageKey.REGIONS) || [],
        },
      }
      break
    case "LOAD_TYPES":
      newState = {
        ...state,
        types: {
          timestamp: Date.now(),
          data: loadFromLocalStorage(StorageKey.TYPES) || [],
        },
      }
      break
    case "LOAD_FAVORITES":
      newState = {
        ...state,
        favorites: loadFromLocalStorage(StorageKey.FAVORITES) || [],
      }
      break
    default:
      break
  }
  return newState
}

export const StoreProvider = (props:IProps) => {

    const [state, dispatch] = useReducer(reducer, InitialState)

    const contextValue = useMemo(() => ({ state, dispatch }), [state])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}