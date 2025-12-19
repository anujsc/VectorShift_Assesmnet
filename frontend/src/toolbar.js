// toolbar.js
// Part 2: Styling - Professional toolbar with node palette

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "16px 20px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#0F172A",
            fontSize: "18px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Pipeline Builder
        </h2>
        
      </div>

      {/* Node Categories */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* Core Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              color: "#94A3B8",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Core
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <DraggableNode type="customInput" label="Input" />
            <DraggableNode type="customOutput" label="Output" />
            <DraggableNode type="text" label="Text" />
          </div>
        </div>

        {/* Logic */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              color: "#94A3B8",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Processing
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <DraggableNode type="llm" label="LLM" />
            <DraggableNode type="condition" label="Filter" />
            <DraggableNode type="transform" label="Transform" />
            <DraggableNode type="codeExecution" label="Code" />
          </div>
        </div>

        {/* Integration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              color: "#94A3B8",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            I/O & Ops
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <DraggableNode type="api" label="API Call" />
            <DraggableNode type="fileSave" label="Save File" />
          </div>
        </div>
      </div>
    </div>
  );
};
