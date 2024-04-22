import { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { StoreContext } from "@/context/Store";
type Props = {
  onSubmit: (value: string) => void;
};

const InputSearch = (props: Props) => {
  const [stringSearchValue, setStringSearchValue] = useState<string>("");
  const {state} = useContext(StoreContext)

  useEffect(()=>{
    if(!state.pokemon_search.searching){
      setStringSearchValue('')
    }
  },[state.pokemon_search.searching])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(stringSearchValue);
  };
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setStringSearchValue(val);
  };

  return (
    <form className={styles.inputSearch} onSubmit={handleSubmit}>
      <input
        type="text"
        name="searchPokemon"
        id="searchPokemon"
        placeholder="Search"
        value={stringSearchValue}
        onChange={handleChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default InputSearch;
