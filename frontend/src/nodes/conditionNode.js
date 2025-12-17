// conditionNode.js
// Part 1: Node Abstraction - Condition/branching node

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputClasses,
  labelClasses,
  labelTextClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "==");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
      style: { top: "50%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      style: { top: "35%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      style: { top: "65%" },
    },
  ];

  return (
    <BaseNode id={id} title="Condition" icon="🔀" handles={handles}>
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>
              Operator
            </span>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className={`${inputClasses} font-semibold`}
            >
              <option value="==">Equal (==)</option>
              <option value="!=">Not Equal (!=)</option>
              <option value=">">Greater Than (&gt;)</option>
              <option value="<">Less Than (&lt;)</option>
              <option value=">=">Greater or Equal (&gt;=)</option>
              <option value="<=">Less or Equal (&lt;=)</option>
            </select>
          </label>
          <div className="flex gap-3 text-[11px] bg-white/30 px-2.5 py-2 rounded-md">
            <span className="text-emerald-500 font-semibold">● True</span>
            <span className="text-red-500 font-semibold">● False</span>
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
