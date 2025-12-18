// llmNode.js - AI-Native Design
import { Position } from "reactflow";
import { BaseNode, NodeInfo } from "../components/BaseNode";

export const LLMNode = ({ id, data, selected }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      handleType: "input",
      style: { top: "35%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      handleType: "input",
      style: { top: "55%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      handleType: "output",
      style: { top: "45%" },
    },
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      handles={handles}
      selected={selected}
    >
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "#0F172A",
            marginBottom: "8px",
          }}
        >
          Large Language Model
        </div>
        <div style={{ fontSize: "11px", color: "#64748B", lineHeight: "1.5" }}>
          Processes system and user prompts to generate AI responses
        </div>
      </div>

      <NodeInfo type="info">
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#60A5FA",
              }}
            ></div>
            <span>System Prompt</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#60A5FA",
              }}
            ></div>
            <span>User Prompt</span>
          </div>
          <div
            style={{ height: "1px", background: "#BAE6FD", margin: "4px 0" }}
          ></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#34D399",
              }}
            ></div>
            <span>Response Output</span>
          </div>
        </div>
      </NodeInfo>
    </BaseNode>
  );
};
