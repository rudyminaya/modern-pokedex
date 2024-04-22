import React from "react";
import styles from "./styles.module.scss";
import ItemCard from "../ItemCard";
import { PokemonDetail } from "@/types";

type Props = {
  listingData: PokemonDetail[];
};

const ListingCards = (props: Props) => {
  return (
    <div className={styles.listingCards}>
      {props.listingData.length ? (
        props.listingData.map((item, index) => {
          return (
            <ItemCard
              key={`listing-${item.name}-${index}`}
              id={item.id}
              img={
                item?.sprites.front_default ??
                item?.sprites?.other?.["official-artwork"]?.front_default
              }
              name={item.name}
            />
          );
        })
      ) : (
        <p>No se encontraron Resultados</p>
      )}
    </div>
  );
};

export default ListingCards;
