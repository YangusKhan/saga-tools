import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MissionRewardTable } from "./components/SG/MissionRewardTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MissionRewardTable missionData={[]}></MissionRewardTable>
      </header>
    </div>
  );
}

export default App;
