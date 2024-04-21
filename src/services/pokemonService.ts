import { PokemonDetail, PokemonTypeDetail } from "@/types"

const urlBase = "https://pokeapi.co/api/v2"

type PokemonResultType = {
  name: string
  url: string
}
type Paginated<T> = {
  results: T[]
  next: string | null
  previous: string | null
}

const getAllPokemons = async (
  nextURL: string | null = null
): Promise<PokemonResultType[]> => {
  const response = await fetch(nextURL ?? `${urlBase}/pokemon?limit=1000`)
  const data = await response.json()
  const results = data.results
  const next = data.next as string | null
  if (next) {
    const nextData = await getAllPokemons(next)
    return [...results, ...nextData]
  }
  return results
  //validar tipado con Joi
}

const getPokemon = async (url: string): Promise<PokemonDetail> => {
  const response = await fetch(url)
  return response.json()
}

const getPokemonFromID = async (id: number): Promise<PokemonDetail> => {
  const response = await fetch(`${urlBase}/pokemon/${id}`)
  return response.json()

}

const getTypePokemon = async (id: string): Promise<PokemonTypeDetail> => {
  const response = await fetch(`${urlBase}/type/${id}`)
  return response.json()
}

const getPokemonsPaginated = async (
  limit: number,
  offset: number
): Promise<Paginated<PokemonResultType>> => {
  const result = await fetch(
    `${urlBase}/pokemon?limit=${limit}&offset=${offset}`
  )
  return result.json()
}

const getAllTypes = async (
  nextURL: string | null = null
): Promise<PokemonResultType[]> => {
  const response = await fetch(nextURL ?? `${urlBase}/type`)
  const data = await response.json()
  const results = data.results
  const next = data.next as string | null
  if (next) {
    const nextData = await getAllTypes(next)
    return [...results, ...nextData]
  }
  return results
}

const getAllRegions = async (
  nextURL: string | null = null
): Promise<PokemonResultType[]> => {
  const response = await fetch(nextURL ?? `${urlBase}/region`)
  const data = await response.json()
  const results = data.results
  const next = data.next as string | null
  if (next) {
    const nextData = await getAllRegions(next)
    return [...results, ...nextData]
  }
  return results
}
export { getAllPokemons, getPokemonsPaginated, getAllTypes, getAllRegions, getPokemon, getTypePokemon,getPokemonFromID}
