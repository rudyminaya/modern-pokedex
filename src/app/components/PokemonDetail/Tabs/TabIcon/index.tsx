import {
  EvolutionIcon,
  LocationIcon,
  PokemonFace,
  StatsIcon,
} from "@/app/components/CustomIcons";
import { TabName } from "../types";
import styles from "./styles.module.scss";
type Props = {
  name: TabName;
};

export const TabIcon = (props: Props) => {
  switch (props.name) {
    case TabName.About:
      return <PokemonFace className={styles.icon} />;
    case TabName.Status:
      return <StatsIcon className={styles.icon} />;
    case TabName.Evolution:
      return <EvolutionIcon className={styles.icon} />;
    case TabName.Location:
      return <LocationIcon className={styles.icon} />;
  }
};
