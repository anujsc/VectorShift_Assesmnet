// inputNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";
import { sanitizeNodeName } from "../utils/sanitize";
import { validateNodeName } from "../utils/validation";

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    const rawName = e.target.value;
    const sanitized = sanitizeNodeName(rawName);
    setCurrName(sanitized);

    // Validate on change
    const validation = validateNodeName(sanitized);
    setNameError(validation.valid ? "" : validation.error);
  };

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
          onChange={handleNameChange}
          placeholder="input_1"
          className={nameError ? "node-input-error" : ""}
        />
        {nameError && (
          <div
            style={{
              fontSize: "11px",
              color: "#EF4444",
              marginTop: "4px",
            }}
          >
            {nameError}
          </div>
        )}
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
