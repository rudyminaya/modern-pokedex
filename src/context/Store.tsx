"use client"
import { Chain, State } from "@/types"
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
  pokemon_specie: undefined,
  pokemon_evolution_chain: undefined,
  pokemon_location: undefined,
  pokemon_type: undefined,
  advantage_against_types: undefined,
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
  console.log('state del store', state, action)
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
      console.log('cached Result', cachedResult)
      if (cachedResult.timestamp > 0) {
        console.log('dentro del cached if')
        newState = {
          ...state,
          pokemon_all: cachedResult,
        }
        break
      } else {
        console.log('en el else del cached  ')
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
      const speciesResult = await PokemonService.getPokemonSpecie(
        action.payload.id
      )
      const evolutionChainURL = speciesResult.evolution_chain.url
      const evolutionChain = await PokemonService.getEvolutionChain(
        evolutionChainURL
      )
      const evolutionChainNames: string[] = []

      const getNamesRecursive = (chain: Chain) => {
        evolutionChainNames.push(chain.species.name)
        if (chain.evolves_to.length > 0) {
          chain.evolves_to.forEach((evolution) => {
            getNamesRecursive(evolution)
          })
        }
      }
      getNamesRecursive(evolutionChain.chain)
      const evolutionChainData = await Promise.all(
        evolutionChainNames.map(async (name) => {
          const data = await PokemonService.getPokemonFromName(name)
          return data
        })
      )

      const getTypesPokemon = await Promise.all(
        result.types.map((type) => {
          return PokemonService.getTypePokemon(type.type.name)
        })
      )

      const advantageAgainstTypes = getTypesPokemon
        .map((type) => {
          return type.damage_relations.double_damage_to.map((type) => {
            return type.name
          })
        })
        .reduce((acc, val) => {
          return acc.concat(val)
        })

      const uniqueAdvantageAgainstTypes = new Set(advantageAgainstTypes)
      const uniqueArrAdvantageAgainstTypes = Array.from(
        uniqueAdvantageAgainstTypes
      )
      const findLocations = await PokemonService.getPokemonLocations(
        result.location_area_encounters
      )
      const dataLocations =
        findLocations.flatMap((location) => {
          return location.version_details.map((d) => {
            return {
              version: d.version.name,
              location: location.location_area.name,
            }
          })
        }) ?? []

      newState = {
        ...state,
        pokemon_detail: result,
        pokemon_specie: speciesResult,
        pokemon_evolution_chain: evolutionChainData,
        pokemon_type: getTypesPokemon,
        advantage_against_types: uniqueArrAdvantageAgainstTypes,
        pokemon_location: dataLocations,
      }
      break
    }

    default:
      break
  }
  console.log('state values : ', newState, action)
  return newState
}

export const StoreProvider = (props: IProps) => {
  const [state, dispatch] = useAsyncReducer(reducer, InitialState)
  
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}
