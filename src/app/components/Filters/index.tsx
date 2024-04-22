import React, { useContext } from "react"
import styles from "./styles.module.scss"
import { StoreContext } from "@/context/Store"
import getPokemonIcon, { getPokemonLabelType } from "../TypeIcon"
import {
  addFilterPokemonType,
  removeFilterPokemonType,
} from "@/app/controller/pokemonController"

export const FiltersByType = () => {
  const { state, dispatch } = useContext(StoreContext)

  const handleFilter = (type: string) => {
    if (state.pokemon_filtered_by_type.types.indexOf(type) !== -1) {
      removeFilterPokemonType(type, state, dispatch)
    } else {
      addFilterPokemonType(type, state, dispatch)
    }
  }

  const types = state.types.data.map((type, index) => {
    if (type.name !== "shadow" && type.name !== "unknown") {
      const name = getPokemonLabelType(type.name.toLowerCase())
      const iconType = getPokemonIcon(name).icon
      return (
        <div
          key={`filtersbyType-${name}-${index}`}
          title={type.name}
          onClick={() => handleFilter(type.name)}
          className={`${styles.filtersByType__icon} ${
            state.pokemon_filtered_by_type.types.indexOf(type.name) !== -1
              ? styles.filtersByType__selected
              : ""
          }`}
        >
          {iconType}
        </div>
      )
    }
  })
  return <div className={styles.filtersByType}>{types}</div>
}
