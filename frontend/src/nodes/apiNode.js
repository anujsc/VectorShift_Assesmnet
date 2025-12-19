// apiNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";
import { sanitizeInput } from "../utils/sanitize";

export const APINode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || "GET");
  const [url, setUrl] = useState(data?.url || "https://api.example.com");

  const handleUrlChange = (e) => {
    // Sanitize URL input to prevent XSS
    const sanitized = sanitizeInput(e.target.value);
    setUrl(sanitized);
  };

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-params`,
      handleType: "input",
      style: { top: "40%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-body`,
      handleType: "input",
      style: { top: "60%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      handleType: "output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
          ]}
        />
      </NodeField>
      <NodeField label="URL">
        <NodeInput
          value={url}
          onChange={handleUrlChange}
          placeholder="https://api.example.com"
        />
      </NodeField>
    </BaseNode>
  );
};
