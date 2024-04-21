import React, { useContext } from "react"
import styles from "./styles.module.scss"
import InputSearch from "../InputSearch"
import { PokeBallIcon } from "../CustomIcons"
import { StoreContext } from "@/context/Store"
import { PokemonIndex } from "@/types"

type Props = {
  pokemonData: (data: PokemonIndex[]) => void
}

const Search = (props: Props) => {
  const { state } = useContext(StoreContext)
  const {
    pokemon_all: { data },
  } = state

  const findPokemon = (value: string) => {
    const valueTransformed = value.toLowerCase()
    const result = data.filter((p: any) => p.name.includes(valueTransformed))    
    props.pokemonData(result)
  }
  return (
    <main className={styles.search}>
      <div className={styles.search__container}>
        <div className={styles.search__header}>
          <PokeBallIcon /> <span>Pokedex</span>
        </div>
        <div className={styles.search__content}>
          <h1>Find your favorite pokemon</h1>
          <InputSearch onSubmit={(pokemonName) => findPokemon(pokemonName)} />
        </div>
      </div>
    </main>
  )
}

export default Search
