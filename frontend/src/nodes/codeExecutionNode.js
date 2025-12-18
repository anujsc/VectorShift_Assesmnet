// codeExecutionNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeTextarea,
  NodeInfo,
} from "../components/BaseNode";

export const CodeExecutionNode = ({ id, data, selected }) => {
  const [code, setCode] = useState(data?.code || "return input;");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      handleType: "input",
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-result`,
      handleType: "output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Execute Code"
      icon="💻"
      handles={handles}
      selected={selected}
    >
      <NodeField label="JavaScript Code">
        <NodeTextarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Write your logic here"
          rows={5}
        />
      </NodeField>
      <NodeInfo type="info">
        Variable{" "}
        <code
          style={{
            padding: "2px 4px",
            background: "white",
            borderRadius: "3px",
            fontFamily: "monospace",
          }}
        >
          input
        </code>{" "}
        is available
      </NodeInfo>
    </BaseNode>
  );
};
