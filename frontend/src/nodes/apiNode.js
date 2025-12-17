// apiNode.js
// Part 1: Node Abstraction - API Request node

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputClasses,
  labelClasses,
  labelTextClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || "GET");
  const [url, setUrl] = useState(data?.url || "https://api.example.com");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-params`,
      style: { top: "40%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-body`,
      style: { top: "70%" },
    },
    { type: "source", position: Position.Right, id: `${id}-response` },
  ];

  // Method colors for visual distinction
  const methodColors = {
    GET: "text-emerald-500 border-emerald-500",
    POST: "text-blue-500 border-blue-500",
    PUT: "text-amber-500 border-amber-500",
    DELETE: "text-red-500 border-red-500",
  };

  return (
    <BaseNode id={id} title="API Request" icon="🌐" handles={handles}>
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>Method</span>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`${inputClasses} font-semibold border-2 ${methodColors[method]}`}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </label>
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>URL</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`${inputClasses} text-slate-800 font-mono text-[11px]`}
              placeholder="https://api.example.com/endpoint"
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
