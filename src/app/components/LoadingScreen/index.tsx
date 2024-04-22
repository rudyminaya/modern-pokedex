import React from "react"
import styles from "./styles.module.scss"

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <img
        className={styles.loadingScreen__spinner}
        alt="spin pokeball"
        src="/assets/pokeball.png"
      />
    </div>
  )
}

export default LoadingScreen
