import { Cached, PokemonIndex,PokemonRegion } from "@/types"

const enum StorageKey {
  POKEMON_ALL = "POKEMON_ALL",
  FAVORITES = "FAVORITES",
  REGIONS = "REGIONS",
  TYPES = "TYPES",
}

const isStillValid = (timestamp: number) => {
  return Date.now() - timestamp < 86400000
}

const saveAllPokemon = async (pokemon: PokemonIndex[]) => {
  const timeStamp = Date.now()
  const data = JSON.stringify({ timeStamp, data: pokemon })
  localStorage.setItem(StorageKey.POKEMON_ALL, data)
}

const getAllPokemon = async (): Promise<Cached<PokemonIndex[]>> => {
  const data = localStorage.getItem(StorageKey.POKEMON_ALL)
  if (!data) return { timestamp: 0, data: [] }
  const savedData = JSON.parse(data) as Cached<PokemonIndex[]>
  if (!isStillValid(savedData.timestamp)){
    localStorage.removeItem(StorageKey.POKEMON_ALL)
    return { timestamp: 0, data: [] }
  }
  return savedData
}

const getAllRegions = async (): Promise<Cached<PokemonRegion[]>> => {
    const data = localStorage.getItem(StorageKey.REGIONS)
    if (!data) return { timestamp: 0, data: [] }
    const savedData = JSON.parse(data) as Cached<PokemonRegion[]>
    if (!isStillValid(savedData.timestamp)){
      localStorage.removeItem(StorageKey.REGIONS)
      return { timestamp: 0, data: [] }
    }
    return savedData
}

const saveAllRegions = async (regions: PokemonRegion[]) => {
    const timeStamp = Date.now()
    const data = JSON.stringify({ timeStamp, data: regions })
    localStorage.setItem(StorageKey.REGIONS, data)
}

const getAllTypes = async (): Promise<Cached<PokemonIndex[]>> => {
    const data = localStorage.getItem(StorageKey.TYPES)
    if (!data) return { timestamp: 0, data: [] }
    const savedData = JSON.parse(data) as Cached<PokemonIndex[]>
    if (!isStillValid(savedData.timestamp)){
      localStorage.removeItem(StorageKey.TYPES)
      return { timestamp: 0, data: [] }
    }
    return savedData
}

const saveAllTypes = async (types: PokemonIndex[]) => {
    const timeStamp = Date.now()
    const data = JSON.stringify({ timeStamp, data: types })
    localStorage.setItem(StorageKey.TYPES, data)
}

export { saveAllPokemon, getAllPokemon, saveAllRegions, getAllRegions, saveAllTypes, getAllTypes}
