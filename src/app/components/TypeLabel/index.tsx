import React from 'react'
import getPokemonIcon,{ PokemonType } from '../TypeIcon'

type Props = {}

const TypeLabel = (props: Props) => {
    const type = getPokemonIcon(PokemonType.Ice)
  return (
    <div>{type.name} {type?.icon} {type?.color}</div>
  )
}

export default TypeLabel