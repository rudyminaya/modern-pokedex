"use client"

import { PokeBallIcon } from "@/app/components/CustomIcons"
import { useContext, useEffect, useMemo } from "react"
import styles from "./styles.module.scss"
import { StoreContext } from "@/context/Store"
import { useRouter } from "next/navigation"
import TypeLabel from "@/app/components/TypeLabel"
import getPokemonIcon, { getPokemonLabelType } from "@/app/components/TypeIcon"
import PokemonSingleDetail from "@/app/components/PokemonDetail"
import { loadPokemonFromId } from "@/app/controller/pokemonController"

const PokemonSinglePage = ({ params }: { params: { id: string } }) => {
  const id = useMemo(() => params.id, [params.id])
  const { state, dispatch } = useContext(StoreContext)
  const router = useRouter()
  const limitPokemon = state?.pokemon_all.data?.length
  const pokemon = useMemo(() => state.pokemon_detail, [state.pokemon_detail])

  useEffect(() => {
    loadPokemonFromId(Number(id), dispatch)
  }, [id])

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
    pokemon?.detail?.sprites?.other?.["official-artwork"]?.front_default ?? ""
  const typeValues = pokemon?.type?.length
    ? getPokemonIcon(getPokemonLabelType(pokemon?.type[0].name))
    : {
        color: "",
        icon: "",
        name: "",
      }

  const statsValues = pokemon?.detail?.stats.map((stat) => {
    const obj = {
      name: stat.stat.name,
      value: stat.base_stat,
    }
    return obj
  })

  return (
    <main
      className={styles.pokemonSinglePage}
      style={{
        background: `linear-gradient(0deg, ${typeValues?.color}80 0%, ${typeValues?.color} 100%)`,
      }}
    >
      <PokeBallIcon className={styles.pokemonSinglePage__bg} />
      <div className={styles.pokemonSinglePage__container}>
        <h1 className={styles.pokemonSinglePage__title}>
          <PokeBallIcon /> <span>{pokemon?.detail.name}</span>{" "}
          <span>#{id}</span>{" "}
        </h1>
        <div className={styles.pokemonSinglePage__image}>
          <img src={urlImage} alt={pokemon?.detail.name} />
          {pokemon?.type?.length && (
            <div className={styles.pokemonSinglePage__types}>
              {pokemon?.type.map((type, index) => {
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
      <div className={styles.pokemonSinglePage__details}>
        <PokemonSingleDetail
          height={(pokemon?.detail?.height || 0) / 10}
          weight={(pokemon?.detail?.weight || 0) / 10}
          location={pokemon?.locations ?? []}
          description={
            pokemon?.specie?.flavor_text_entries.find(
              (v) => v.language.name === "en"
            )?.flavor_text
          }
          color={typeValues?.color}
          status={statsValues ?? []}
          evolution={pokemon?.evolutionChain ?? []}
          advantageAgainstType={
            state.pokemon_detail?.advantageAgainstTypes ?? []
          }
        />
      </div>
    </main>
  )
}

export default PokemonSinglePage
