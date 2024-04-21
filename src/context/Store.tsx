"use client"
import { State } from "@/types"
import { Dispatch, ReactNode, createContext, useMemo } from "react"
import { Action } from "./actionTypes"
import useAsyncReducer from "@/app/hooks/reducer"
import * as PokemonService from "@/services/pokemonService"
import * as CacheService from "@/services/cacheServices"

type IProps = {
  children: ReactNode
}

const enum StorageType {
  LOCALSTORAGE,
  SESSIONSTORAGE,
}

const InitialState: State = {
  pokemon_all: {
    timestamp: 0,
    data: [],
  },
  pokemon_detail: undefined,
  pokemon_type: undefined,
  pokemon_page: { next: null, previous: null, results: [] },
  favorites: [],
  regions: {
    timestamp: 0,
    data: [],
  },
  types: { timestamp: 0, data: [] },
}

export const StoreContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: InitialState,
  dispatch: () => null,
})

async function reducer(state: State, action: Action): Promise<State> {
  let newState = state
  switch (action.type) {
    case "ADD_FAVORITE":
      newState = { ...state, favorites: [...state.favorites, action.payload] }
      break
    case "REMOVE_FAVORITE":
      newState = {
        ...state,
        favorites: state.favorites.filter((fav) => fav !== action.payload),
      }
      break
    case "LOAD_POKEMON_ALL": {
      const cachedResult = await CacheService.getAllPokemon()
      if (cachedResult.timestamp > 0) {
        newState = {
          ...state,
          pokemon_all: cachedResult,
        }
        break
      } else {
        const result = await PokemonService.getAllPokemons()
        await CacheService.saveAllPokemon(result)
        newState = {
          ...state,
          pokemon_all: { timestamp: Date.now(), data: result },
        }
        break
      }
    }
    case "LOAD_REGIONS": {
      const cachedRegions = await CacheService.getAllRegions()
      if (cachedRegions.timestamp > 0) {
        newState = {
          ...state,
          regions: cachedRegions,
        }
        break
      } else {
        const result = await PokemonService.getAllRegions()
        await CacheService.saveAllRegions(result)
        newState = {
          ...state,
          regions: { timestamp: Date.now(), data: result },
        }
        break
      }
    }
    case "LOAD_TYPES": {
      const cachedTypes = await CacheService.getAllTypes()
      if (cachedTypes.timestamp > 0) {
        newState = {
          ...state,
          types: cachedTypes,
        }
        break
      } else {
        const result = await PokemonService.getAllTypes()
        await CacheService.saveAllTypes(result)
        newState = {
          ...state,
          types: { timestamp: Date.now(), data: result },
        }
        break
      }
    }
    case "LOAD_FAVORITES": {
      newState = {
        ...state,
        favorites: [],
      }
      break
    }
    case "LOAD_POKEMON_DETAIL_FROM_URL": {
      const result = await PokemonService.getPokemon(action.payload.url)
      newState = {
        ...state,
        pokemon_detail: result,
      }
      break
    }
    case "LOAD_POKEMON_DETAIL_FROM_ID": {
      const result = await PokemonService.getPokemonFromID(action.payload.id)
      newState = {
        ...state,
        pokemon_detail: result,
      }
      break
    }
    default:
      break
  }
  return newState
}

export const StoreProvider = (props: IProps) => {
  const [state, dispatch] = useAsyncReducer(reducer, InitialState)

  //const actions = createActions(dispatch)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
