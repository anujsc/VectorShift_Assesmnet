// conditionNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeSelect,
  NodeTag,
} from "../components/BaseNode";

export const ConditionNode = ({ id, data, selected }) => {
  const [operator, setOperator] = useState(data?.operator || "==");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      handleType: "input",
      style: { top: "50%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      handleType: "output",
      style: { top: "40%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      handleType: "output",
      style: { top: "60%" },
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          options={[
            { value: "==", label: "Equal (==)" },
            { value: "!=", label: "Not Equal (!=)" },
            { value: ">", label: "Greater Than (>)" },
            { value: "<", label: "Less Than (<)" },
            { value: ">=", label: "Greater or Equal (>=)" },
            { value: "<=", label: "Less or Equal (<=)" },
          ]}
        />
      </NodeField>
      <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
        <NodeTag color="green">✓ True</NodeTag>
        <NodeTag color="default">✗ False</NodeTag>
      </div>
    </BaseNode>
  );
};
