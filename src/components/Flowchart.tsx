import React from "react";
import cytoscape from "cytoscape";
// @ts-ignore
import klay from "cytoscape-klay";

interface Props {
  data: any;
}

export function Flowchart({ data }: Props) {
  const containerRef = React.useRef(null);
  const cyRef = React.useRef<cytoscape.Core | null>(null);
  React.useEffect(() => {
    if (data) {
      cytoscape.use(klay);
      cyRef.current = cytoscape({
        autoungrabify: true,
        container: containerRef.current,
        elements: data,
        layout: {
          // @ts-ignore
          name: "klay",
          fit: true,
          // @ts-ignore
          klay: {
            direction: "RIGHT",
            nodeLayering: "LONGEST_PATH",
            spacing: 60,
          },
        },
        style: [
          {
            selector: "node",
            style: {
              label: "data(name)",
              shape: "rectangle",
              "text-wrap": "wrap",
              "text-max-width": "100px",
            },
          },

          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "line-style": "solid",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
              "curve-style": "straight",
              label: "data(smith_rank)",
            },
          },
        ],
      });
    }
  }, [containerRef, data]);

  return <div id="cy" ref={containerRef}></div>;
}
