import React from "react"
import styles from "./styles.module.scss"
import { PokemonDetail } from "@/types"
import TypeLabel from "../../TypeLabel"
import { getPokemonLabelType } from "../../TypeIcon"

type Props = {
  data: PokemonDetail[]
}

const Evolution = (props: Props) => {
  return (
    <div className={styles.evolution}>
      <h3>Evolutions</h3>
      {props.data.map((pokemon: PokemonDetail, index: number) => {
        const imagen =
          pokemon?.sprites?.other?.showdown?.front_default ??
          pokemon.sprites.other?.["official-artwork"].front_default ??
          "/assets/pokemon-unknown.png"
        return (
          <div key={`evolution-${index}`} className={styles.evolution__item}>
            <img
              className={styles.evolution__item__image}
              src={imagen}
              alt={pokemon.name}
            />
            <div className={styles.evolution__item__types}>
              <p className={styles.evolution__item__name}>{pokemon.name}</p>
              {pokemon.types.map((type, i) => (
                <TypeLabel
                  key={`evolution-type-${i}`}
                  type={getPokemonLabelType(type.type.name)}
                />
              ))}
            </div>
            <p className={styles.arrowDown}>↓</p>
          </div>
        )
      })}
    </div>
  )
}

export default Evolution
