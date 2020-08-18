import React from "react";
import { MissionRewards, FilterContext } from "./MissionRewards";

function filterMissionInfo(filters: MissionRewards.FilterContext) {
  return function (data: MissionRewards.MissionInfo) {
    return filters.elements.has(data.element);
  };
}

function renderMissionInfo(
  data: MissionRewards.MissionInfo[],
  filters: MissionRewards.FilterContext
) {
  return data.filter(filterMissionInfo(filters)).map((mission) => {
    return (
      <tr className={`bg-${mission.element}`} key={mission.region}>
        <td>{mission.region}</td>
        <td>{mission.city}</td>
        <td>{mission.stat}</td>
        <td>{mission.basic_reward}</td>
        <td>{mission.great_reward}</td>
        <td>{mission.ability_increase}</td>
        <td>{mission.duration}</td>
      </tr>
    );
  });
}

export function MissionRewardTable(props: MissionRewards.Props) {
  const { data } = props;
  const filters = React.useContext(FilterContext);
  return (
    <div className="table-responsive-lg">
      <table className="table table-bordered table-sm">
        <thead className="thead-dark">
          <tr>
            <td>Region</td>
            <td>City</td>
            <td>Attribute Requirement</td>
            <td>Basic Reward</td>
            <td>Great Reward</td>
            <td>Ability Increase</td>
            <td>Duration</td>
          </tr>
        </thead>
        <tbody>{renderMissionInfo(data ?? [], filters)}</tbody>
      </table>
    </div>
  );
}
