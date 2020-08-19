import React from "react";
import cytoscape from "cytoscape";
import { Flowchart } from "../Flowchart";
import { GearTypes } from "../../App";
import "./BlacksmithPage.css";

interface Props {
  data?: { [k in GearTypes]: cytoscape.ElementDefinition[] };
}

export function BlacksmithPage(props: Props) {
  const { data } = props;
  const [selectedType, setState] = React.useState<GearTypes>("LSword");
  return (
    <div id="blacksmith-container">
      <Flowchart data={data?.[selectedType]} />
    </div>
  );
}
