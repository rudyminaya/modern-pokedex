import { ReactNode } from "react"

export type EntrieType ={
    name:string,
    icon?:ReactNode
    url:string
}

export type FetchDataTypes ={
    name:string,
    url:string
}
export type Cached<T> = {
    timestamp: number
    data: T
  }

export type State = {
    pokemon_all: Cached<PokemonIndex[]>
    pokemon_page:PokemonPage
    favorites: number[]
    regions: Cached<PokemonRegion[]>
    types: Cached<PokemonType[]>
    error?:Error
  }

  export type PokemonType = {
    name: string
    url: string
  }
  export type PokemonIndex = {
    name: string
    url: string
  }
  export type PokemonRegion = {
    name: string
    url: string
  }
  export type PokemonPage = {
    next:string | null
    previous:string | null
    results:PokemonIndex[]
  }