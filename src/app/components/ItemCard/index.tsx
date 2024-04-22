import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

type Props = {
  name: string;
  id: number;
  img: string;
};

const ItemCard = (props: Props) => {
  return (
    <Link href={`/pokemon/${props.id}`} className={styles.itemCard}>
      <p className={styles.itemCard__id}>#{props.id}</p>
      <img
        className={styles.itemCard__image}
        src={props.img}
        alt={props.name}
      />
      <p className={styles.itemCard__name}>{props.name}</p>
    </Link>
  );
};

export default ItemCard;
