import React from "react";
import "./MissionTable.css";

export declare namespace MissionRewardTable {
  export interface MissionInfo {
    region: string;
    city: string;
    name: string;
    duration: number;
    stat: string;
    ability_increase: string;
    basic_reward: string;
    great_reward: string;
  }

  export interface Props {
    missionData: MissionInfo[];
  }
}

function renderMissionInfo(data: MissionRewardTable.MissionInfo[]) {
  return data.map((mission) => {
    return (
      <tr>
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

export function MissionRewardTable(props: MissionRewardTable.Props) {
  const { missionData } = props;
  return (
    <table>
      <thead>
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
      <tbody>{renderMissionInfo(missionData)}</tbody>
    </table>
  );
}
