import { PokemonFace } from "@/app/components/CustomIcons";
import About from "../../About";
import { TabName } from "../types";
import Status from "../../Status";
import Evolution from "../../Evolution";
import Location from "../../Location";
import { PokemonDetail, PokemonSingleLocation, StatType } from "@/types";

type Props = {
  name: TabName;
  details: {
    description?: string;
    height: number;
    weight: number;
    advantageAgainstType: string[];
    status: StatType[];
    evolution: PokemonDetail[];
    location: PokemonSingleLocation[];
  };
};

export const TabContent = (props: Props) => {
  switch (props.name) {
    case TabName.About:
      return (
        <About
          description={props.details.description}
          height={props.details.height}
          weight={props.details.weight}
          advantageAgainstType={props.details.advantageAgainstType}
        />
      );
    case TabName.Status:
      return <Status values={props.details.status} />;
    case TabName.Evolution:
      return <Evolution data={props.details.evolution} />;
    case TabName.Location:
      return <Location locations={props.details.location} />;
  }
};
