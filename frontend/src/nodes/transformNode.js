// transformNode.js
// Part 1: Node Abstraction - Data transformation node

import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  inputClasses,
  labelClasses,
  labelTextClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || "uppercase");

  const handles = [
    { type: "target", position: Position.Left, id: `${id}-input` },
    { type: "source", position: Position.Right, id: `${id}-output` },
  ];

  // Operation descriptions
  const operationInfo = {
    uppercase: "Convert text to UPPERCASE",
    lowercase: "Convert text to lowercase",
    trim: "Remove whitespace from ends",
    reverse: "Reverse the string",
    length: "Get string length",
    json_parse: "Parse JSON string to object",
    json_stringify: "Convert object to JSON string",
  };

  return (
    <BaseNode id={id} title="Transform" icon="⚙️" handles={handles}>
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={`${labelTextClasses} text-slate-600`}>
              Operation
            </span>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className={`${inputClasses} font-medium`}
            >
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="trim">Trim</option>
              <option value="reverse">Reverse</option>
              <option value="length">Get Length</option>
              <option value="json_parse">Parse JSON</option>
              <option value="json_stringify">Stringify JSON</option>
            </select>
          </label>
          <div className="text-[10px] text-slate-500 italic bg-slate-100 px-2 py-1.5 rounded border border-slate-200">
            {operationInfo[operation]}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
