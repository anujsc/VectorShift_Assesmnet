// outputNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`,
      handleType: "input",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Name">
        <NodeInput
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="output_1"
        />
      </NodeField>

      <NodeField label="Type">
        <NodeSelect
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          options={[
            { value: "Text", label: "Text" },
            { value: "Image", label: "Image" },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
