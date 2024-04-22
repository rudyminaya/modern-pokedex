import React from "react"
import styles from "./styles.module.scss"
import { PokemonSingleLocation } from "@/types"
type Props = {
  locations: PokemonSingleLocation[]
  color: string
}

const Location = (props: Props) => {  
  return (
    <div className={styles.location}>
      <h3>Locations</h3>
      {props.locations.length ? (
        <div className={styles.location__list}>
          {props.locations.map((location, index) => {
            return (
              <div key={`location-${index}`} className={styles.location__item}>
                <span className={`${styles.location__item} ${styles.version}`} style={{background:props.color}}>
                  {location.version}
                </span>{" "}
                <span className={`${styles.location__item} ${styles.location}`}>
                  {location.location}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p>No location found</p>
      )}
    </div>
  )
}

export default Location
