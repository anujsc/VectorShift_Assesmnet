// BaseNode.js - AI-Native Node Abstraction
import { Handle, Position } from "reactflow";
import { memo } from "react";

export const BaseNode = memo(
  ({
    id,
    title,
    icon,
    handles = [],
    children,
    selected = false,
    status = null, // 'running', 'success', 'error', null
  }) => {
    return (
      <div
        className={`
        node-card
        ${selected ? "node-selected" : ""}
        ${status ? `node-status-${status}` : ""}
      `}
      >
        {/* Header */}
        <div className="node-header">
          <div className="node-header-content">
            {icon && <span className="node-icon">{icon}</span>}
            <span className="node-title">{title}</span>
          </div>
          {status && <div className={`node-status-dot status-${status}`} />}
        </div>

        {/* Content */}
        <div className="node-content">{children}</div>

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
            className={`node-handle node-handle-${
              handle.handleType || "default"
            }`}
            style={handle.style}
          />
        ))}
      </div>
    );
  }
);

BaseNode.displayName = "BaseNode";

// Reusable Field Components
export const NodeField = ({ label, children, className = "" }) => (
  <div className={`node-field ${className}`}>
    {label && <label className="node-label">{label}</label>}
    {children}
  </div>
);

export const NodeInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`node-input ${className}`}
  />
);

export const NodeSelect = ({ value, onChange, options, className = "" }) => (
  <select
    value={value}
    onChange={onChange}
    className={`node-select ${className}`}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const NodeTextarea = ({
  value,
  onChange,
  placeholder,
  rows = 3,
  className = "",
}) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`node-textarea ${className}`}
  />
);

export const NodeInfo = ({ children, type = "info" }) => (
  <div className={`node-info node-info-${type}`}>{children}</div>
);

export const NodeTag = ({ children, color = "default" }) => (
  <span className={`node-tag node-tag-${color}`}>{children}</span>
);
