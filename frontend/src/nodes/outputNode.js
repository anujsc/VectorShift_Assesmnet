// outputNode.js
// Part 1: Node Abstraction - Output node using BaseNode

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
} from "../components/BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode id={id} title="Output" icon="📤" handles={handles}>
      {/* Field Container - Gray Section */}
      <div style={fieldContainerStyles}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={labelStyles}>
            <span style={labelTextStyles}>Name</span>
            <input
              type="text"
              value={currName}
              onChange={(e) => setCurrName(e.target.value)}
              style={inputStyles}
              placeholder="Enter output name"
            />
          </label>
          <label style={labelStyles}>
            <span style={labelTextStyles}>Type</span>
            <select
              value={outputType}
              onChange={(e) => setOutputType(e.target.value)}
              style={inputStyles}
            >
              <option value="Text">Text</option>
              <option value="Image">Image</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
