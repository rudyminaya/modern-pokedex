"use client"
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "@/context/Store"
import Search from "./components/Search"
import { PokemonDetail } from "@/types"
import ListingCards from "./components/ListingCards"

export default function Home() {
  const { dispatch } = useContext(StoreContext)
  const [pokemonData, setPokemonData] = useState<PokemonDetail[]>([])

  useEffect(() => {
    dispatch({
      type: "LOAD_POKEMON_ALL",
    })
    dispatch({
      type: "LOAD_POKEMON_PAGINATED",
    })
  }, [])

  return (
    <>
      <Search pokemonData={(values) => setPokemonData(values)} />
      <ListingCards listingData={pokemonData} />
    </>
  )
}
