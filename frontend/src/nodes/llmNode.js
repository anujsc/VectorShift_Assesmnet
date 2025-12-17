// llmNode.js
// Part 1: Node Abstraction - LLM node using BaseNode

import { Position } from "reactflow";
import { BaseNode } from "../components/BaseNode";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: "35%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "65%" },
    },
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"

      handles={handles}
    >
      <div style={{ fontSize: "12px" }}>
        <p style={{ margin: "6px 0", fontWeight: "500", color: "#333" }}>
          Large Language Model
        </p>
        <div
          style={{
            fontSize: "10px",
            color: "#475569",
            background: "#F1F5F9",
            padding: "8px 10px",
            borderRadius: "6px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <span style={{ color: "#3b82f6" }}>●</span>
            <span>System Prompt</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#3b82f6" }}>●</span>
            <span>User Prompt</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "6px",
              paddingTop: "6px",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <span style={{ color: "#10b981" }}>●</span>
            <span>Response Output</span>
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
