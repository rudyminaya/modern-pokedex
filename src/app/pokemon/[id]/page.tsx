"use client"

import { PokeBallIcon } from "@/app/components/CustomIcons"
import { useContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { StoreContext } from "@/context/Store"
import { useRouter } from "next/navigation"
import TypeLabel from "@/app/components/TypeLabel"
import getPokemonIcon, { getPokemonLabelType } from "@/app/components/TypeIcon"
import PokemonSingleDetail from "@/app/components/PokemonDetail"
import { FlavorTextEntry } from "@/types"

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

  console.log("state : ", state)

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
  const urlImage =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ?? ""
  const typeValues = state.pokemon_type?.length
    ? getPokemonIcon(getPokemonLabelType(state.pokemon_type[0].name))
    : {
        color: "",
        icon: "",
        name: "",
      }

  const statsValues = pokemon?.stats.map((stat) => {
    const obj = {
      name: stat.stat.name,
      value: stat.base_stat,
    }
    return obj
  })

  const generateDetail = () => {
    if (pokemon && state.pokemon_specie && state.pokemon_evolution_chain) {
      return (
        <PokemonSingleDetail
          height={pokemon?.height / 10}
          weight={pokemon?.weight / 10}
          color={typeValues?.color}
          description={
            state?.pokemon_specie?.flavor_text_entries.find(
              (v) => v.language.name === "en"
            )?.flavor_text
          }
          status={statsValues ?? []}
          evolution={state.pokemon_evolution_chain ?? []}
          advantageAgainstType={state.advantage_against_types ?? []}
        />
      )
    }
  }
  const detail = generateDetail()

  return (
    <main
      style={{
        background: `linear-gradient(0deg, ${typeValues?.color}80 0%, ${typeValues?.color} 100%)`,
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div className={styles.pokemonSinglePage}>
        <h1 className={styles.pokemonSinglePage__title}>
          <PokeBallIcon /> <span>{pokemon?.name}</span> <span>#{id}</span>{" "}
        </h1>
        <div className={styles.pokemonSinglePage__image}>
          <PokeBallIcon className={styles.pokemonSinglePage__image__bg} />
          <img src={urlImage} alt={pokemon?.name} />
          {state.pokemon_type?.length && (
            <div className={styles.pokemonSinglePage__types}>
              {state.pokemon_type.map((type, index) => {
                return (
                  <TypeLabel
                    key={`tipo-pokemon#${id}-${index}`}
                    type={getPokemonLabelType(type.name)}
                  />
                )
              })}
            </div>
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
      </div>
      <div className={styles.pokemonSinglePage__details}>{detail}</div>
    </main>
  )
}

export default PokemonSinglePage
