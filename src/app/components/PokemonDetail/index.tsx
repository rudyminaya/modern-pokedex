import React, { useContext, useState } from "react"
import styles from "./styles.module.scss"
import { PokemonDetail, PokemonSingleLocation, StatType } from "@/types"

import { StoreContext } from "@/context/Store"
import { TabIcon } from "./Tabs/TabIcon"
import { TabName } from "./Tabs/types"
import { TabContent } from "./Tabs/TabContent"

type Props = {
  weight: number
  height: number
  advantageAgainstType: string[]
  description: string | undefined
  status: StatType[]
  evolution: PokemonDetail[]
  location: PokemonSingleLocation[]
  color: string
}

const allTabs = [
  TabName.About,
  TabName.Status,
  TabName.Evolution,
  TabName.Location,
]

const PokemonSingleDetail = (props: Props) => {
  const { state } = useContext(StoreContext)
  const [currentTab, setCurrentTab] = useState<TabName>(TabName.About)

  return (
    <div className={styles.pokemonSingleDetail}>
      <div className={styles.tab}>
        {allTabs.map((option, index) => {
          return (
            <div
              key={`option-${index}`}
              className={`${styles.tab__item} ${
                currentTab === option ? styles.activeComponent : ""
              }`}
              onClick={() => setCurrentTab(option)}
              title={option}
            >
              <TabIcon name={option} />
              <p className={styles.tab__item__name}>{option}</p>
            </div>
          )
        })}
      </div>
      <div className={styles.pokemonSingleDetail__content}>
        {state.loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.pokemonSingleDetail__tabContent}>
            <TabContent
              name={currentTab}
              details={{
                weight: props.weight,
                height: props.height,
                advantageAgainstType: props.advantageAgainstType,
                description: props.description,
                status: props.status,
                evolution: props.evolution,
                location: props.location,
                color: props.color,
              }}
            ></TabContent>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonSingleDetail
