// databaseNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
} from "../components/BaseNode";

export const DatabaseNode = ({ id, data, selected }) => {
  const [action, setAction] = useState(data?.action || "read");
  const [collection, setCollection] = useState(data?.collection || "users");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-query`,
      handleType: "input",
      style: { top: "40%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-data`,
      handleType: "input",
      style: { top: "60%" },
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
      title="Database"
      icon="💾"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Action">
        <NodeSelect
          value={action}
          onChange={(e) => setAction(e.target.value)}
          options={[
            { value: "read", label: "📖 Read" },
            { value: "write", label: "✏️ Write" },
            { value: "update", label: "🔄 Update" },
            { value: "delete", label: "🗑️ Delete" },
          ]}
        />
      </NodeField>
      <NodeField label="Collection">
        <NodeInput
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
          placeholder="collection_name"
        />
      </NodeField>
    </BaseNode>
  );
};
