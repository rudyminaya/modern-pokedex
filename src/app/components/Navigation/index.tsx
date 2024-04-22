import React from "react"
import styles from "./styles.module.scss"
type Props = {
  prevDisabled: boolean
  nextDisabled: boolean
  onNext: () => void
  onPrev: () => void
}

const Navigation = (props: Props) => {
  return (
    <div className={styles.navigation}>
      <button disabled={props.prevDisabled} onClick={props.onPrev}>
        {`<`}
      </button>
      <button disabled={props.nextDisabled} onClick={props.onNext}>
        {`>`}
      </button>
    </div>
  )
}

export default Navigation
