// BaseNode.js
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  nodeType,
  handles = [],
  children,
  style = {},
  icon = null,
}) => {
  // Modern Card Design System - Linear/Intercom inspired
  const defaultStyle = {
    minWidth: "240px",
    background: "#FFFFFF",
    border: "1px solid #E5E7EB", // Gray 200
    borderRadius: "12px",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    color: "#111827", // Gray 900
    fontFamily: "Inter, -apple-system, sans-serif",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
  };

  const mergedStyle = { ...defaultStyle, ...style };

  // Enhanced handle styling - larger and more prominent
  const handleStyle = {
    width: "12px",
    height: "12px",
    border: "2px solid #fff",
    background: "#6B7280", // Gray 500
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={mergedStyle}
      className="base-node-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#3B82F6"; // Blue 500
        e.currentTarget.style.boxShadow =
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.boxShadow =
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header Section - Draggable Area */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          background: "#FAFAFA", // Subtle gray background
          borderBottom: "1px solid #F3F4F6",
          cursor: "grab",
          minHeight: "48px",
        }}
      >
        {icon && (
          <span
            style={{
              fontSize: "18px",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </span>
        )}
        <span
          style={{
            fontWeight: "600",
            fontSize: "14px",
            color: "#111827", // Gray 900
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </span>
      </div>

      {/* Content Section - White Background */}
      <div style={{ padding: "16px", fontSize: "13px", color: "#374151" }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${handle.type}-${index}`}
          type={handle.type}
          position={
            handle.position ||
            (handle.type === "source" ? Position.Right : Position.Left)
          }
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={{
            ...handleStyle,
            ...handle.style,
            left: handle.type === "target" ? "-6px" : undefined,
            right: handle.type === "source" ? "-6px" : undefined,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.2)";
            e.target.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        />
      ))}
    </div>
  );
};

// Node Factory
export const createNode = (config) => {
  return ({ id, data }) => (
    <BaseNode
      id={id}
      title={config.title}
      nodeType={config.nodeType}
      handles={
        typeof config.handles === "function"
          ? config.handles(id, data)
          : config.handles
      }
      style={config.style}
      icon={config.icon}
    >
      {config.renderContent ? config.renderContent(data, id) : null}
    </BaseNode>
  );
};

// Field Container - Gray section for grouping inputs (Linear/Intercom style)
export const fieldContainerStyles = {
  background: "#F9FAFB", // Gray 50
  borderRadius: "8px",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #F3F4F6",
};

// Styles for inputs/selects - Filled style inside gray containers
export const inputStyles = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid transparent",
  background: "#FFFFFF",
  color: "#111827",
  fontSize: "13px",
  outline: "none",
  transition: "all 0.15s ease",
  marginTop: "6px",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
};

export const labelStyles = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "0",
};

export const labelTextStyles = {
  fontSize: "11px",
  color: "#6B7280", // Gray 500
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "2px",
};
