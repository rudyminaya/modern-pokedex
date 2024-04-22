import React from "react"
import styles from "./styles.module.scss"
import { StatType } from "@/types"
type Props = {
  values: StatType[]
}

const Status = (props: Props) => {
    const transformedValues = props.values.map((item)=>{
        switch (item.name){
            case 'hp':
                return {name: 'HP', value: item.value, color: '#FE4D4D'}
            case 'attack':
                return {name: 'ATK', value: item.value, color: '#FFAD76'}
            case 'defense':
                return {name: 'DEF', value: item.value, color: '#FEDD72'}
            case 'special-attack':
                return {name: 'SATK', value: item.value, color: '#91B7F6'}
            case 'special-defense':
                return {name: 'SDEF', value: item.value, color: '#8DDC89'}
            case 'speed':
                return {name: 'SP', value: item.value, color: '#FCC5D3'}
            default:
                return {name: '', value: 0}
        }
    })    
  return (
    <div className={styles.status}>
        <h3>Status</h3>
      {transformedValues?.map((item, index) => {
        return (
          <div key={index} className={styles.status__item}>
            <div className={styles.status__name}>{item.name}</div>
            <div className={styles.status__bar}>
              <div
                className={styles.status__value}
                style={{ width: `${item.value}%`, backgroundColor:item.color }}
              >                
              </div>
              <span>{item.value}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Status
