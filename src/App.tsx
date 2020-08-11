import React from "react";
import "./App.css";
import { MissionRewardTable } from "./components/SG/MissionRewardTable";

function App() {
  const [missionData, setState] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      const missionJSON = await fetch("/data/sg.json");
      const missions = JSON.parse(await missionJSON.text());
      setState(missions.missions);
    }
    fetchData();
    return () => {};
  }, [setState]);

  return (
    <div className="App">
      <header className="App-header">
        <MissionRewardTable missionData={missionData}></MissionRewardTable>
      </header>
    </div>
  );
}

export default App;
