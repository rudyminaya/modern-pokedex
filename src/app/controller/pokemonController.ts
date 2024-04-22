import { Action } from "@/context/actionTypes"
import * as PokemonService from "@/services/pokemonService"
import * as CacheService from "@/services/cacheService"
import { Chain, State } from "@/types"
import { Dispatch } from "react"
import { PokemonIndex } from "@/types/state"

export const loadPokemonAll = async (dispatch: Dispatch<Action>) => {
  const cachedResult = await CacheService.getAllPokemon()
  if (cachedResult.timestamp > 0) {
    dispatch({
      type: "SET_POKEMON_ALL",
      payload: cachedResult,
    })
  } else {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    })
    const result = await PokemonService.getAllPokemons()
    await CacheService.saveAllPokemon(result)
    dispatch({
      type: "SET_LOADING",
      payload: false,
    })
    dispatch({
      type: "SET_POKEMON_ALL",
      payload: {
        timestamp: Date.now(),
        data: result,
      },
    })
  }
}

export const loadRegionAll = async (dispatch: Dispatch<Action>) => {
  const cachedRegions = await CacheService.getAllRegions()
  if (cachedRegions.timestamp > 0) {
    dispatch({
      type: "SET_REGIONS",
      payload: cachedRegions,
    })
  } else {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    })
    const result = await PokemonService.getAllRegions()
    await CacheService.saveAllRegions(result)
    dispatch({
      type: "SET_LOADING",
      payload: false,
    })
    dispatch({
      type: "SET_REGIONS",
      payload: { timestamp: Date.now(), data: result },
    })
  }
}

export const loadTypesAll = async (dispatch: Dispatch<Action>) => {
  const cachedTypes = await CacheService.getAllTypes()
  if (cachedTypes.timestamp > 0) {
    dispatch({
      type: "SET_TYPES",
      payload: cachedTypes,
    })
  } else {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    })
    const result = await PokemonService.getAllTypes()
    await CacheService.saveAllTypes(result)
    dispatch({
      type: "SET_LOADING",
      payload: false,
    })
    dispatch({
      type: "SET_TYPES",
      payload: { timestamp: Date.now(), data: result },
    })
  }
}

export const loadPokemonFromId = async (
  id: number,
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  })

  const result = await PokemonService.getPokemonFromID(id)
  const speciesResult = await PokemonService.getPokemonSpecie(id)
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
  const uniqueArrAdvantageAgainstTypes = Array.from(uniqueAdvantageAgainstTypes)
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

  dispatch({
    type: "SET_LOADING",
    payload: false,
  })

  dispatch({
    type: "SET_POKEMON_DETAIL",
    payload: {
      detail: result,
      specie: speciesResult,
      evolutionChain: evolutionChainData,
      type: getTypesPokemon,
      advantageAgainstTypes: uniqueArrAdvantageAgainstTypes,
      locations: dataLocations,
    },
  })
}

export const loadPokemonPaginated = async (
  state: State,
  dispatch: Dispatch<Action>,
  forceUrl: string | undefined = undefined
) => {
  dispatch({
    type: "SET_POKEMON_PAGINATION",
    payload: {
      loading: true,
      page: state.pokemon_pagination.page,
    },
  })

  const result = await PokemonService.getPokemonsPaginated(20, 0, forceUrl)
  const newData = await Promise.all(
    result.results.map(async (item: any) => {
      const pokemon = await PokemonService.getPokemon(item.url)
      return pokemon
    })
  )

  dispatch({
    type: "SET_POKEMON_PAGINATION",
    payload: {
      loading: false,
      page: {
        next: result.next,
        previous: result.previous,
        results: newData,
      },
    },
  })
}

export const searchPokemonByName = async (
  name: string,
  allPokemon: PokemonIndex[],
  dispatch: Dispatch<Action>
) => {
  if (name.length === 0) {
    dispatch({
      type: "SET_POKEMON_SEARCH_RESULTS",
      payload: {
        searching: false,
        loading: false,
        results: [],
      },
    })
    return
  }

  dispatch({
    type: "SET_POKEMON_SEARCH_RESULTS",
    payload: {
      searching: true,
      loading: true,
      results: [],
    },
  })
  const valueTransformed = name.toLowerCase()

  const matchedPokemons = allPokemon.filter((p: any) =>
    p.name.includes(valueTransformed)
  )

  const results = await Promise.all(
    matchedPokemons.map(async (item: any) =>
      PokemonService.getPokemon(item.url)
    )
  )

  dispatch({
    type: "SET_POKEMON_SEARCH_RESULTS",
    payload: {
      searching: true,
      loading: false,
      results,
    },
  })
}
