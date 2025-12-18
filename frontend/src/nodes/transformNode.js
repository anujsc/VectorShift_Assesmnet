// transformNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeSelect,
  NodeInfo,
} from "../components/BaseNode";

export const TransformNode = ({ id, data, selected }) => {
  const [operation, setOperation] = useState(data?.operation || "uppercase");

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
      id: `${id}-output`,
      handleType: "output",
    },
  ];

  const operationInfo = {
    uppercase: "Convert text to UPPERCASE",
    lowercase: "Convert text to lowercase",
    trim: "Remove whitespace from ends",
    reverse: "Reverse the string",
    length: "Get string length",
    json_parse: "Parse JSON string to object",
    json_stringify: "Convert object to JSON string",
  };

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Operation">
        <NodeSelect
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          options={[
            { value: "uppercase", label: "Uppercase" },
            { value: "lowercase", label: "Lowercase" },
            { value: "trim", label: "Trim" },
            { value: "reverse", label: "Reverse" },
            { value: "length", label: "Get Length" },
            { value: "json_parse", label: "Parse JSON" },
            { value: "json_stringify", label: "Stringify JSON" },
          ]}
        />
      </NodeField>
      <NodeInfo type="info">{operationInfo[operation]}</NodeInfo>
    </BaseNode>
  );
};
