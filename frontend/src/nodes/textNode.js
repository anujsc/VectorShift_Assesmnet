// textNode.js
// Part 3: Text Node Logic - Auto-resize and variable extraction

import { useState, useEffect, useRef } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputStyles,
  labelStyles,
  labelTextStyles,
} from "../components/BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [dimensions, setDimensions] = useState({ width: 280, height: 140 });
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text using regex - validates JavaScript variable names
  const extractVariables = (text) => {
    // Pattern: {{ variableName }} - must be valid JS identifier
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      vars.push(match[1]);
    }
    return [...new Set(vars)]; // Remove duplicates
  };

  // Auto-resize based on text content
  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);

    // Calculate dimensions based on content
    const lines = text.split("\n").length;
    const longestLine = Math.max(
      ...text.split("\n").map((line) => line.length),
      10 // minimum line length
    );

    // Dynamic sizing with smooth constraints
    const newHeight = Math.max(140, Math.min(lines * 22 + 100, 350));
    const newWidth = Math.max(280, Math.min(longestLine * 7.5 + 60, 450));

    setDimensions({ width: newWidth, height: newHeight });
  };

  // Update variables when text changes
  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
  }, [currText]);

  // Calculate handle positions to avoid overlap
  const getHandlePosition = (index, total) => {
    const startOffset = 50; // Start from middle area
    const spacing = Math.min(30, (dimensions.height - 80) / Math.max(total, 1));
    return startOffset + index * spacing;
  };

  // Create dynamic handles for variables
  const handles = [
    ...variables.map((varName, index) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-${varName}`,
      style: { top: `${getHandlePosition(index, variables.length)}px` },
    })),
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode
      id={id}
      title="Text"

      handles={handles}
      style={{
        width: `${dimensions.width}px`,
        minHeight: `${dimensions.height}px`,
        transition: "width 0.2s ease, min-height 0.2s ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={labelStyles}>
          <span style={labelTextStyles}>Text Content:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              ...inputStyles,
              minHeight: "80px",
              resize: "none",
              fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#F8FAFC", // Slightly darker input bg
            }}
            placeholder="Enter text with {{variables}}"
          />
        </label>

        {/* Variable Display */}
        {variables.length > 0 && (
          <div
            style={{
              fontSize: "11px",
              padding: "8px 10px",
              background: "#F1F5F9",
              borderRadius: "6px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              alignItems: "center",
              border: "1px solid #E2E8F0",
            }}
          >
            <span style={{ opacity: 0.7, marginRight: "4px", color: "#475569" }}>Variables:</span>
            {variables.map((v, i) => (
              <span
                key={i}
                style={{
                  background: "#E2E8F0",
                  color: "#1E293B",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "10px",
                  border: "1px solid #CBD5E1"
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}

        {/* Help text */}
        <div style={{ fontSize: "10px", color: "#94A3B8", fontStyle: "italic", marginTop: "4px" }}>
          Use {"{{variableName}}"} to create input handles
        </div>
      </div>
    </BaseNode>
  );
};
