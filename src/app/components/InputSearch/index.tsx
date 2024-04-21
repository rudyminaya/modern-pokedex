import { FormEvent, useState } from "react"
import styles from "./styles.module.scss"
type Props = {
  onSubmit: (value: string) => void
}

const InputSearch = (props: Props) => {
  const [stringSearchValue, setStringSearchValue] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit(stringSearchValue)
  }
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    setStringSearchValue(val)
  }

  return (
    <form className={styles.inputSearch} onSubmit={handleSubmit}>
      <input
        type="text"
        name="searchPokemon"
        id="searchPokemon"
        placeholder="Search"
        onChange={handleChange}
      />
      <button type="submit">🔍︎</button>
    </form>
  )
}

export default InputSearch
