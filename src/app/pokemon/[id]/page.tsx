"use client"

import { PokeBallIcon } from "@/app/components/CustomIcons"
import { useContext, useEffect } from "react"
import styles from "./styles.module.scss"
import { StoreContext } from "@/context/Store"
import { useRouter } from "next/navigation"
import TypeLabel from "@/app/components/TypeLabel"
import getPokemonIcon, { getPokemonLabelType } from "@/app/components/TypeIcon"
import PokemonDetail from "@/app/components/PokemonDetail"

const PokemonSinglePage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { state, dispatch } = useContext(StoreContext)
  const router = useRouter()
  const limitPokemon = state?.pokemon_all.data?.length
  const pokemon = state?.pokemon_detail
  useEffect(() => {
    dispatch({
      type: "LOAD_POKEMON_DETAIL_FROM_ID",
      payload: {
        id: Number(id),
      },
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: "LOAD_POKEMON_TYPE",
      payload: pokemon?.types[0].type.name ?? "",
    })
  }, [pokemon])

  const nextPokemon = () => {
    const nextId = parseInt(id) + 1
    if (nextId <= limitPokemon) {
      router.push(`/pokemon/${nextId}`)
    }
  }
  const previousPokemon = () => {
    const previousId = parseInt(id) - 1
    if (previousId > 0) {
      router.push(`/pokemon/${previousId}`)
    }
  }
  const urlImage = pokemon?.sprites?.other?.["official-artwork"]?.front_default
  const typeValues = pokemon?.types[0].type.name
    ? getPokemonIcon(getPokemonLabelType(pokemon?.types[0].type.name))
    : {
        color: "",
        icon: "",
        name: "",
      }
  return (
    <main
      className={styles.pokemonSinglePage}
      style={{
        background: `linear-gradient(0deg, ${typeValues?.color}80 0%, ${typeValues?.color} 100%)`,
      }}
    >
      <h1 className={styles.pokemonSinglePage__title}>
        <PokeBallIcon /> <span>{pokemon?.name}</span> <span>#{id}</span>{" "}
      </h1>
      <div className={styles.pokemonSinglePage__image}>
        <PokeBallIcon className={styles.pokemonSinglePage__image__bg} />
        <img src={urlImage} alt={pokemon?.name} />
        {pokemon?.types[0].type.name && (
          <TypeLabel type={getPokemonLabelType(pokemon?.types[0].type.name)} />
        )}
        <div className={styles.pokemonSinglePage__navigation}>
          <button
            onClick={previousPokemon}
            disabled={Number(id) <= 1}
          >{`<`}</button>
          <button
            onClick={nextPokemon}
            disabled={Number(id) >= limitPokemon - 1}
          >{`>`}</button>
        </div>
      </div>
      <div className={styles.pokemonSinglePage__details}>
        <PokemonDetail />
      </div>
    </main>
  )
}

export default PokemonSinglePage
