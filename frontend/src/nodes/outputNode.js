// outputNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";
import { sanitizeNodeName } from "../utils/sanitize";

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = (e) => {
    const sanitized = sanitizeNodeName(e.target.value);
    setCurrName(sanitized);
  };

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
          onChange={handleNameChange}
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
