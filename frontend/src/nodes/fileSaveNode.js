// fileSaveNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
  NodeInfo,
} from "../components/BaseNode";

export const FileSaveNode = ({ id, data, selected }) => {
  const [fileName, setFileName] = useState(data?.fileName || "output.json");
  const [format, setFormat] = useState(data?.format || "json");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-data`,
      handleType: "input",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="File Save"
      icon="💾"
      handles={handles}
      selected={selected}
    >
      <NodeInfo type="info">Saves incoming data to a file</NodeInfo>
      <NodeField label="File Name">
        <NodeInput
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="output.json"
        />
      </NodeField>
      <NodeField label="Format">
        <NodeSelect
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          options={[
            { value: "json", label: "JSON" },
            { value: "csv", label: "CSV" },
            { value: "txt", label: "Text" },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
