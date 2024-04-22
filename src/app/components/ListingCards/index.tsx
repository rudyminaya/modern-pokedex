import React from "react"
import styles from "./styles.module.scss"
import ItemCard from "../ItemCard"
import { PokemonDetail } from "@/types"

type Props = {
  listingData: PokemonDetail[]
}

const ListingCards = (props: Props) => {
  return (
    <div className={styles.listingCards}>
      {props.listingData.length ? (
        props.listingData.map((item, index) => {
          const imagen =
            item?.sprites?.other?.showdown?.front_default ??
            item.sprites.other?.["official-artwork"].front_default ??
            "/assets/pokemon-unknown.png"
          return (
            <ItemCard
              key={`listing-${item.name}-${index}`}
              id={item.id}
              img={imagen}
              name={item.name}
            />
          )
        })
      ) : (
        <p>No se encontraron Resultados</p>
      )}
    </div>
  )
}

export default ListingCards
