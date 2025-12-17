// loopNode.js
// Part 1: Node Abstraction - Loop/iteration node

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputClasses,
  labelClasses,
  labelTextClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const LoopNode = ({ id, data }) => {
  const [loopType, setLoopType] = useState(data?.loopType || "forEach");
  const [iterations, setIterations] = useState(data?.iterations || 10);

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-array`,
      style: { top: "50%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-item`,
      style: { top: "40%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-complete`,
      style: { top: "70%" },
    },
  ];

  // Loop type descriptions
  const loopInfo = {
    forEach: "Execute for each item",
    map: "Transform each item",
    filter: "Filter items by condition",
    reduce: "Reduce to single value",
  };

  return (
    <BaseNode id={id} title="Loop" icon="🔁" handles={handles}>
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>Type</span>
            <select
              value={loopType}
              onChange={(e) => setLoopType(e.target.value)}
              className={`${inputClasses} font-medium`}
            >
              <option value="forEach">For Each</option>
              <option value="map">Map</option>
              <option value="filter">Filter</option>
              <option value="reduce">Reduce</option>
            </select>
          </label>

          {loopType === "forEach" && (
            <label className={labelClasses}>
              <span className={`${labelTextClasses} text-slate-600`}>
                Max Iterations
              </span>
              <input
                type="number"
                value={iterations}
                onChange={(e) => setIterations(e.target.value)}
                className={inputClasses}
                min="1"
                max="1000"
              />
            </label>
          )}

          <div className="text-[10px] text-slate-500 italic bg-white/30 px-2 py-1.5 rounded">
            {loopInfo[loopType]}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
