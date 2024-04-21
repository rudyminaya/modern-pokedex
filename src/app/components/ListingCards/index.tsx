import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import ItemCard from "../ItemCard"
import { getPokemon, getPokemonsPaginated } from "@/services/pokemonService"
import { PokemonDetail } from "@/types"

type Props = {
  listingData: PokemonDetail[]
}

const ListingCards = (props: Props) => {
  const [listingData, setListingData] = useState<PokemonDetail[]>([])
  const initialListingData = async () => {
    const data = await getPokemonsPaginated(20, 0)
    const newData = await Promise.all(
      data.results.map(async (item: any) => {
        const pokemon = await getPokemon(item.url)
        return pokemon
      })
    )
    setListingData(newData)
  }

  useEffect(() => {
    if (props.listingData?.length) {
      setListingData(props.listingData)
    } else {
      initialListingData()
    }
  }, [props.listingData])
  return (
    <div className={styles.listingCards}>
      {listingData.length ? (
        listingData.map((item, index) => {
          return (
            <ItemCard
              key={`listing-${item.name}-${index}`}
              id={item.id}
              img={item?.sprites.front_default ?? item?.sprites?.other?.['official-artwork']?.front_default}
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
