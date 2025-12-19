// textNode.js - AI-Native Design with Enhanced Features
import { useState, useEffect, useRef } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeTextarea,
  NodeTag,
  NodeInfo,
} from "../components/BaseNode";
import { sanitizeInput, isValidVariableName } from "../utils/sanitize";

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Validate variable name for security
      if (isValidVariableName(match[1])) {
        vars.push(match[1]);
      }
    }
    return [...new Set(vars)];
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [currText]);

  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Handle text change with sanitization
  const handleTextChange = (e) => {
    const rawText = e.target.value;
    // Don't sanitize during typing, only on blur or submit
    // This allows users to type {{ }} without issues
    setCurrText(rawText);
  };

  // Dynamic handles based on variables
  const handles = [
    ...variables.map((varName, index) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-${varName}`,
      handleType: "variable",
      style: { top: `${35 + index * 18}%` },
    })),
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      handleType: "output",
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Text Content">
        <NodeTextarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          rows={4}
          style={{ minHeight: "80px", maxHeight: "300px", overflow: "auto" }}
        />
      </NodeField>

      {variables.length > 0 && (
        <div style={{ marginTop: "8px", marginBottom: "8px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#64748B",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Variables
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {variables.map((v, i) => (
              <NodeTag key={i} color="violet">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <circle cx="5" cy="5" r="2" />
                </svg>
                {v}
              </NodeTag>
            ))}
          </div>
        </div>
      )}

      <NodeInfo type="info">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm0 10a1 1 0 110-2 1 1 0 010 2zm1-3H5V3h2v4z" />
          </svg>
          <span>
            Use{" "}
            <code
              style={{
                padding: "2px 4px",
                background: "white",
                borderRadius: "3px",
                fontFamily: "monospace",
                fontSize: "10px",
              }}
            >
              {"{{variableName}}"}
            </code>{" "}
            to create input handles
          </span>
        </div>
      </NodeInfo>
    </BaseNode>
  );
};
