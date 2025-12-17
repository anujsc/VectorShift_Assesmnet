// codeExecutionNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  BaseNode,
  labelClasses,
  labelTextClasses,
  inputClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const CodeExecutionNode = ({ id, data }) => {
  const [code, setCode] = useState(data?.code || "return input;");

  return (
    <BaseNode
      id={id}
      title="Execute Code"
      icon="💻"
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input` },
        { type: "source", position: Position.Right, id: `${id}-result` },
      ]}
      style={{ minWidth: "300px" }}
    >
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <label className={labelClasses}>
            <span className={labelTextClasses}>JavaScript Code</span>
            <textarea
              className={`${inputClasses} min-h-[100px] font-mono bg-slate-50 resize-none`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your logic here"
            />
          </label>
          <div className="text-[10px] text-slate-400 italic">
            Variable 'input' is available.
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
