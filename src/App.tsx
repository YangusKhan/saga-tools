import React from "react";
import "./App.css";
import cytoscape from "cytoscape";
import { MissionRewards } from "./components/SG/MissionRewards";
import { BlacksmithPage } from "./components/SG/BlacksmithPage";

export type WeaponTypes =
  | "LSword"
  | "GSword"
  | "Rapier"
  | "Spear"
  | "Axe"
  | "Club"
  | "Bow";

export type GearTypes = WeaponTypes | "Shield";

interface State {
  missions: any[];
  blacksmith: { [k in GearTypes]: cytoscape.ElementDefinition[] };
  tech_spark: { [k in WeaponTypes]: cytoscape.ElementDefinition[] };
}

function App() {
  const [data, setState] = React.useState<State | undefined>(undefined);
  React.useEffect(() => {
    async function fetchData() {
      const missionJSON = await fetch("/saga-tools/data/sg.json");
      const missions = JSON.parse(await missionJSON.text());
      setState(missions);
    }
    fetchData();
    return () => {};
  }, [setState]);

  return (
    <div className="app-container">
      <BlacksmithPage data={data?.blacksmith} />
      <MissionRewards data={data?.missions} />
    </div>
  );
}

export default App;
