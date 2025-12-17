// dataFilterNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  BaseNode,
  labelClasses,
  labelTextClasses,
  inputClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const DataFilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || "");
  const [condition, setCondition] = useState(data?.condition || "contains");
  const [value, setValue] = useState(data?.value || "");

  return (
    <BaseNode
      id={id}
      title="Filter Data"
      icon="🔍"
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input` },
        { type: "source", position: Position.Right, id: `${id}-filtered` },
      ]}
    >
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={labelTextClasses}>Field</span>
            <input
              type="text"
              className={inputClasses}
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. status"
            />
          </label>
          <label className={labelClasses}>
            <span className={labelTextClasses}>Condition</span>
            <select
              className={inputClasses}
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="gt">Greater Than</option>
              <option value="lt">Less Than</option>
            </select>
          </label>
          <label className={labelClasses}>
            <span className={labelTextClasses}>Value</span>
            <input
              type="text"
              className={inputClasses}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value to match"
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
