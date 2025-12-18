// inputNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
      handleType: "output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Name">
        <NodeInput
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="input_1"
        />
      </NodeField>

      <NodeField label="Type">
        <NodeSelect
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
