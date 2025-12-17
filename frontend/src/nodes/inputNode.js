// inputNode.js
// Part 1: Node Abstraction - Input node using BaseNode

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputStyles,
  labelStyles,
  labelTextStyles,
} from "../components/BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handles = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"

      handles={handles}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={labelStyles}>
          <span style={labelTextStyles}>Name:</span>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            style={inputStyles}
            placeholder="Enter input name"
          />
        </label>
        <label style={labelStyles}>
          <span style={labelTextStyles}>Type:</span>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            style={inputStyles}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
