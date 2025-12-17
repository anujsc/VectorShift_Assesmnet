// databaseNode.js
// Part 1: Node Abstraction - Database operations node

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputClasses,
  labelClasses,
  labelTextClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const DatabaseNode = ({ id, data }) => {
  const [action, setAction] = useState(data?.action || "read");
  const [collection, setCollection] = useState(data?.collection || "users");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-query`,
      style: { top: "40%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-data`,
      style: { top: "70%" },
    },
    { type: "source", position: Position.Right, id: `${id}-result` },
  ];

  // Action colors for visual distinction
  const actionColors = {
    read: "text-emerald-500 border-emerald-500",
    write: "text-blue-500 border-blue-500",
    update: "text-amber-500 border-amber-500",
    delete: "text-red-500 border-red-500",
  };

  return (
    <BaseNode id={id} title="Database" icon="💾" handles={handles}>
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>Action</span>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className={`${inputClasses} font-semibold border-2 ${actionColors[action]}`}
            >
              <option value="read">📖 Read</option>
              <option value="write">✏️ Write</option>
              <option value="update">🔄 Update</option>
              <option value="delete">🗑️ Delete</option>
            </select>
          </label>
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>
              Collection
            </span>
            <input
              type="text"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className={`${inputClasses} font-mono`}
              placeholder="collection_name"
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
