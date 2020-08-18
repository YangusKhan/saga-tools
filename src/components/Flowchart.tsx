import React from "react";
import cytoscape from "cytoscape";

interface Props {
  data: any;
}

export function Flowchart({ data }: Props) {
  const containerRef = React.useRef(null);
  const cyRef = React.useRef<cytoscape.Core | null>(null);
  React.useEffect(() => {
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: data,
      layout: { name: "grid" },
    });
  }, [containerRef, data]);

  return <div id="cy" ref={containerRef}></div>;
}
