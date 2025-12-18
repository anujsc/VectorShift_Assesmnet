// dataFilterNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";

export const DataFilterNode = ({ id, data, selected }) => {
  const [field, setField] = useState(data?.field || "");
  const [condition, setCondition] = useState(data?.condition || "contains");
  const [value, setValue] = useState(data?.value || "");

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
      id: `${id}-filtered`,
      handleType: "output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Filter Data"
      icon="🔍"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Field">
        <NodeInput
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="e.g. status"
        />
      </NodeField>
      <NodeField label="Condition">
        <NodeSelect
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          options={[
            { value: "equals", label: "Equals" },
            { value: "contains", label: "Contains" },
            { value: "gt", label: "Greater Than" },
            { value: "lt", label: "Less Than" },
          ]}
        />
      </NodeField>
      <NodeField label="Value">
        <NodeInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value to match"
        />
      </NodeField>
    </BaseNode>
  );
};
