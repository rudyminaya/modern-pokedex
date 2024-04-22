import { Cached, PokemonIndex,PokemonRegion } from "@/types"

const enum StorageKey {
  POKEMON_ALL = "POKEMON_ALL",
  FAVORITES = "FAVORITES",
  REGIONS = "REGIONS",
  TYPES = "TYPES",
}

const isStillValid = (timestamp: number) => {
  const dateValidate = Date.now() - timestamp < 86400000
  console.log('date values : ', {
    dateValidate,
    timestamp,
    now: Date.now()
  })
  return dateValidate
}

const saveAllPokemon = async (pokemon: PokemonIndex[]) => {
  const timestamp = Date.now()
  const data = JSON.stringify({ timestamp, data: pokemon })
  localStorage.setItem(StorageKey.POKEMON_ALL, data)
}

const getAllPokemon = async (): Promise<Cached<PokemonIndex[]>> => {
  const data = localStorage.getItem(StorageKey.POKEMON_ALL)
  console.log('1...')
  if (!data) return { timestamp: 0, data: [] }
  console.log('2...')
  const savedData = JSON.parse(data) as Cached<PokemonIndex[]>
  console.log('3...')
  if (!isStillValid(savedData.timestamp)){
    console.log('4...')
    localStorage.removeItem(StorageKey.POKEMON_ALL)
    return { timestamp: 0, data: [] }
  }
  console.log('5...')
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
    const timestamp = Date.now()
    const data = JSON.stringify({ timestamp, data: regions })
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
    const timestamp = Date.now()
    const data = JSON.stringify({ timestamp, data: types })
    localStorage.setItem(StorageKey.TYPES, data)
}

export { saveAllPokemon, getAllPokemon, saveAllRegions, getAllRegions, saveAllTypes, getAllTypes}
