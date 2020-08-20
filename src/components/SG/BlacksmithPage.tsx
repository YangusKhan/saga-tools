import React from "react";
import cytoscape from "cytoscape";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import { Flowchart } from "../Flowchart";
import { GearTypes, GearTypeMapping } from "../../App";
import "./BlacksmithPage.css";

interface Props {
  data?: { [k in GearTypes]: cytoscape.ElementDefinition[] };
}

export function BlacksmithPage(props: Props) {
  const { data } = props;

  const navLinks = React.useMemo(
    () =>
      GearTypeMapping.map(([key, name]) => {
        return <Nav.Link eventKey={key}>{name}</Nav.Link>;
      }),
    []
  );
  const tabPanes = React.useMemo(
    () =>
      GearTypeMapping.map(([key, name]) => {
        return (
          <Tab.Pane eventKey={key}>
            <Flowchart data={data?.[key]} />
          </Tab.Pane>
        );
      }),
    [data]
  );

  return (
    <Tab.Container id="blacksmith-container" defaultActiveKey="LSword">
      <Row noGutters={true}>
        <Col sm="auto">
          <Nav className="flex-column">{navLinks}</Nav>
        </Col>
        <Col sm="9">
          <Tab.Content>{tabPanes}</Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
