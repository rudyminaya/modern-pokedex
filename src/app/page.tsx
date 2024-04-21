"use client"
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "@/context/Store"
import Search from "./components/Search"
import { PokemonIndex } from "@/types"

export default function Home() {
  const { dispatch } = useContext(StoreContext)
  const [pokemonData, setPokemonData] = useState<PokemonIndex[]>([])

  useEffect(() => {
    dispatch({
      type: "LOAD_POKEMON_ALL",
    })
    dispatch({
      type: "LOAD_POKEMON_PAGINATED",
    })
  }, [])

  useEffect(()=>{
    console.log('data : ', pokemonData)
  },[pokemonData])

  return <Search pokemonData={(values) => setPokemonData(values)} />
}
