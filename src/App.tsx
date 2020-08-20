import React from "react";
import "./App.css";
import cytoscape from "cytoscape";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
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
export const GearTypeMapping: Array<[GearTypes, string]> = [
  ["LSword", "Longsword"],
  ["GSword", "Greatsword"],
  ["Rapier", "Shortsword"],
  ["Spear", "Spear"],
  ["Axe", "Axe"],
  ["Club", "Club"],
  ["Bow", "Bow"],
  ["Shield", "Shield"],
];

interface State {
  missions: any[];
  blacksmith: { [k in GearTypes]: cytoscape.ElementDefinition[] };
  tech_spark: { [k in WeaponTypes]: cytoscape.ElementDefinition[] };
}

function App() {
  const [data, setData] = React.useState<State | undefined>(undefined);
  React.useEffect(() => {
    async function fetchData() {
      const missionJSON = await fetch("/saga-tools/data/sg.json");
      const missions = JSON.parse(await missionJSON.text());
      setData(missions);
    }
    fetchData();
    return () => {};
  }, [setData]);

  const [nav, setNav] = React.useState<string | null>(null);
  const onNavSelect = React.useCallback(
    (eventKey: string | null, event: React.SyntheticEvent<unknown>) => {
      setNav(eventKey);
    },
    [setNav]
  );

  const mainBody = React.useMemo(() => {
    if (nav == null) return <h1>Welcome to SaGa Tools</h1>;

    const [game, page] = nav.split("_");
    switch (page) {
      case "smith": {
        return <BlacksmithPage data={data?.blacksmith} />;
      }
      case "missions": {
        return <MissionRewards data={data?.missions} />;
      }
      default: {
        return <h1>Welcome to SaGa Tools</h1>;
      }
    }
  }, [nav, data]);
  return (
    <div>
      <Navbar expand="lg" fixed="top">
        <NavDropdown title="Scarlet Grace" id="nav-sg">
          <NavDropdown.Item onSelect={onNavSelect} eventKey="sg_smith">
            Smithing Graphs
          </NavDropdown.Item>
          <NavDropdown.Item onSelect={onNavSelect} eventKey="sg_missions">
            Mission Rewards
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      <Container fluid={true} className="app-container">
        {mainBody}
      </Container>
    </div>
  );
}

export default App;
