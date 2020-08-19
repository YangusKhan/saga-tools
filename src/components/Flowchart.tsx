import React from "react";
import cytoscape from "cytoscape";

interface Props {
  data: any;
}

export function Flowchart({ data }: Props) {
  const containerRef = React.useRef(null);
  const cyRef = React.useRef<cytoscape.Core | null>(null);
  React.useEffect(() => {
    if (data) {
      cyRef.current = cytoscape({
        autoungrabify: true,
        container: containerRef.current,
        elements: data,
        layout: {
          name: "breadthfirst",
          fit: false,
          circle: false,
          directed: true,
        },
        style: [
          {
            selector: "node",
            style: {
              label: "data(name)",
              shape: "rectangle",
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
