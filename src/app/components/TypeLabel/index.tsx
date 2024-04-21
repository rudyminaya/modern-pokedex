import React from "react"
import getPokemonIcon, { PokemonType } from "../TypeIcon"
import styles from "./styles.module.scss"

type Props = {
    type: PokemonType
}

const TypeLabel = (props: Props) => {
  const type = getPokemonIcon(props.type)
  return (
    <div className={styles.typeLabel} style={{backgroundColor:type?.color}}>
      {type?.icon} {type.name}
    </div>
  )
}

export default TypeLabel
