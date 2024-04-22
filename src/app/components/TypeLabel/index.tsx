import React from "react";
import getPokemonIcon, { PokemonLabelType } from "../TypeIcon";
import styles from "./styles.module.scss";

type Props = {
  type: PokemonLabelType;
};

const TypeLabel = (props: Props) => {
  const type = getPokemonIcon(props.type);
  return (
    <div className={styles.typeLabel} style={{ backgroundColor: type?.color }}>
      {type?.icon} {type.name}
    </div>
  );
};

export default TypeLabel;
