'use client';
import React, { Fragment, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import getPokemonIcon, { getPokemonLabelType } from "../../TypeIcon"

type Props = {
  description: string
  height: number
  weight: number
  advantageAgainstType: string[]
}

const About = (props: Props) => {
  const [advantagesValues, setAdvantagesValues] = useState<string[]>([])
  useEffect(() => {
    setAdvantagesValues(props.advantageAgainstType)
  }, [props.advantageAgainstType])

  const generateAdvantages = () => {
    if (advantagesValues && advantagesValues.length > 0) {
      return advantagesValues.map((type: string, index: number) => {
        const icon = getPokemonIcon(getPokemonLabelType(type))

        return <Fragment key={`iconAgainst-${index}`}>{icon.icon}</Fragment>
      })
    }
  }
  const advantages = generateAdvantages()
  return (
    <div className={styles.about}>
        <h3>About</h3>
      <p>"{props.description}"</p>
      <div className={styles.about__size}>
        <div className={styles.about__size__item}>
          <p>Height</p>
          <p>{props.height} m</p>
        </div>
        <div className={styles.about__size__item}>
          <p>Weight</p>
          <p>{props.weight}.0 kg</p>
        </div>
        <div className={styles.about__size__item}>
          <p>Strong against</p>
          <div className={styles.about__size__types}>{advantages}</div>
        </div>
      </div>
    </div>
  )
}

export default About
