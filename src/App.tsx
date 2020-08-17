import React from "react";
import "./App.css";
import { MissionRewards } from "./components/SG/MissionRewards";

function App() {
  const [missionData, setState] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      const missionJSON = await fetch("/saga-tools/data/sg.json");
      const missions = JSON.parse(await missionJSON.text());
      setState(missions.missions);
    }
    fetchData();
    return () => {};
  }, [setState]);

  return (
    <div className="App">
      <header className="App-header">
        <MissionRewards data={missionData}></MissionRewards>
      </header>
    </div>
  );
}

export default App;
