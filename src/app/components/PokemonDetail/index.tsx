import React, { ReactNode, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { PokemonDetail, StatType, StatusValues } from "@/types"
import About from "./About"
import Status from "./Status"
import Evolution from "./Evolution"
import Location from "./Location"
import {
  EvolutionIcon,
  LocationIcon,
  PokemonFace,
  StatsIcon,
} from "../CustomIcons"

type Props = {
  weight: number
  height: number
  advantageAgainstType: string[]
  description: string | undefined
  status: StatType[]
  evolution: PokemonDetail[]
  color: string
}

type OptionsType = {
  name: string
  component: ReactNode
  icon: ReactNode
}

type CurrentType = {
  name: string
  component: ReactNode
}

const PokemonSingleDetail = (props: Props) => {
  const [currentComponent, setCurrentComponent] = useState<CurrentType>({
    name: "About",
    component: (
      <About
        description={props.description ?? ""}
        height={props.height}
        weight={props.weight}
        advantageAgainstType={props.advantageAgainstType}
      />
    ),
  })
  const options: OptionsType[] = [
    {
      name: "About",
      component: (
        <About
          description={props.description ?? ""}
          height={props.height}
          weight={props.weight}
          advantageAgainstType={props.advantageAgainstType}
        />
      ),
      icon: <PokemonFace className={styles.icon} />,
    },
    {
      name: "Status",
      component: <Status values={props.status} />,
      icon: <StatsIcon className={styles.icon} />,
    },
    {
      name: "Evolution",
      component: <Evolution data={props.evolution} />,
      icon: <EvolutionIcon className={styles.icon} />,
    },
    {
      name: "Location",
      component: <Location />,
      icon: <LocationIcon className={styles.icon} />,
    },
  ]

  return (
    <div className={styles.pokemonSingleDetail}>
        <div className={styles.tab}>
          {options.map((option, index) => {
            return (
              <div
                key={`option-${index}`}
                className={`${styles.tab__item} ${
                  currentComponent.name === option.name
                    ? styles.activeComponent
                    : ""
                }`}
                onClick={() =>
                  setCurrentComponent((s) => ({
                    ...s,
                    component: option.component,
                    name: option.name,
                  }))
                }
                title={option.name}
              >
                {option.icon}
              </div>
            )
          })}
        </div>
        <div className={styles.pokemonSingleDetail__content}>
          <div>{currentComponent.component}</div>
        </div>
      </div>
  )
}

export default PokemonSingleDetail
