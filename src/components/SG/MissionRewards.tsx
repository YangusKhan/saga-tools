import React from "react";
import "./MissionTable.css";
import { MissionRewardTable } from "./MissionRewardTable";
import { MissionRewardFilters } from "./MissionRewardFilters";

export declare namespace MissionRewards {
  export interface MissionInfo {
    region: string;
    city: string;
    name: string;
    duration: number;
    stat: string;
    ability_increase: string;
    basic_reward: string;
    great_reward: string;
    element: string;
  }

  export interface Props {
    data: MissionInfo[];
  }

  export interface FilterContext {
    elements: Set<string>;
  }
}

export const defaultFilterContext = {
  elements: new Set(["unda", "terra", "natura", "ignis", "aes", "prisma"]),
};

export const FilterContext = React.createContext<MissionRewards.FilterContext>(
  defaultFilterContext
);

export function MissionRewards(props: MissionRewards.Props) {
  const [filters, setFilters] = React.useState<MissionRewards.FilterContext>(
    () => defaultFilterContext
  );
  return (
    <div id="mission-rewards">
      <FilterContext.Provider value={filters}>
        <MissionRewardFilters updateFilters={setFilters} />
        <MissionRewardTable data={props.data} />
      </FilterContext.Provider>
    </div>
  );
}
