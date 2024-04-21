import { ReactNode } from "react"

export type EntrieType = {
  name: string
  icon?: ReactNode
  url: string
}

export type FetchDataTypes = {
  name: string
  url: string
}
export type Cached<T> = {
  timestamp: number
  data: T
}

export type State = {
  pokemon_all: Cached<PokemonIndex[]>
  pokemon_page: PokemonPage
  pokemon_detail:PokemonDetail | undefined
  pokemon_type: PokemonTypeDetail | undefined
  favorites: number[]
  regions: Cached<PokemonRegion[]>
  types: Cached<PokemonType[]>
  error?: Error
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
  next: string | null
  previous: string | null
  results: PokemonIndex[]
}
//se define la estructura de los datos que se obtienen de la api
export type PokemonDetail = {
  abilities: Ability[]
  base_experience: number
  cries: Cries
  forms: Species[]
  game_indices: GameIndex[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  past_abilities: any[]
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export type Ability = {
  ability: Species
  is_hidden: boolean
  slot: number
}

export type Species = {
  name: string
  url: string
}

export type Cries = {
  latest: string
  legacy: string
}

export type GameIndex = {
  game_index: number
  version: Species
}

export type HeldItem = {
  item: Species
  version_details: VersionDetail[]
}

export type VersionDetail = {
  rarity: number
  version: Species
}

export type Move = {
  move: Species
  version_group_details: VersionGroupDetail[]
}

export type VersionGroupDetail = {
  level_learned_at: number
  move_learn_method: Species
  version_group: Species
}

export type GenerationV = {
  "black-white": Sprites
}

export type GenerationIv = {
  "diamond-pearl": Sprites
  "heartgold-soulsilver": Sprites
  platinum: Sprites
}

export type Versions = {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-v": GenerationV
  "generation-vi": { [key: string]: Home }
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
}

export type Other = {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Sprites
}

export type Sprites = {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: null | string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
  other?: Other
  versions?: Versions
  animated?: Sprites
}

export type GenerationI = {
  "red-blue": RedBlue
  yellow: RedBlue
}

export type RedBlue = {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
}

export type GenerationIi = {
  crystal: Crystal
  gold: Gold
  silver: Gold
}

export type Crystal = {
  back_default: string
  back_shiny: string
  back_shiny_transparent: string
  back_transparent: string
  front_default: string
  front_shiny: string
  front_shiny_transparent: string
  front_transparent: string
}

export type Gold = {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent?: string
}

export type GenerationIii = {
  emerald: OfficialArtwork
  "firered-leafgreen": Gold
  "ruby-sapphire": Gold
}

export type OfficialArtwork = {
  front_default: string
  front_shiny: string
}

export type Home = {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export type GenerationVii = {
  icons: DreamWorld
  "ultra-sun-ultra-moon": Home
}

export type DreamWorld = {
  front_default: string
  front_female: null
}

export type GenerationViii = {
  icons: DreamWorld
}

export type Stat = {
  base_stat: number
  effort: number
  stat: Species
}

export type Type = {
  slot: number
  type: Species
}

export type PokemonTypeDetail = {
  damage_relations: DamageRelations
  game_indices: GameTypeIndex[]
  generation: Generation
  id: number
  move_damage_class: Generation
  moves: Generation[]
  name: string
  names: Name[]
  past_damage_relations: any[]
  pokemon: Pokemon[]
}

export type DamageRelations = {
  double_damage_from: Generation[]
  double_damage_to: Generation[]
  half_damage_from: Generation[]
  half_damage_to: Generation[]
  no_damage_from: any[]
  no_damage_to: any[]
}

export type Generation = {
  name: string
  url: string
}

export type GameTypeIndex = {
  game_index: number
  generation: Generation
}

export type Name = {
  language: Generation
  name: string
}

export type Pokemon = {
  pokemon: Generation
  slot: number
}
