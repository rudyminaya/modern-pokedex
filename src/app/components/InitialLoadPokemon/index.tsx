'use client';
import { StoreContext } from "@/context/Store"
import { useContext, useEffect } from "react"

const InitialLoadPokemon = () => {
  const { dispatch } = useContext(StoreContext)
  useEffect(() => {
    dispatch({
      type: "LOAD_POKEMON_ALL",
    })
  }, [])
  return <></>
}

export default InitialLoadPokemon
