// fileSaveNode.js
import { Handle, Position } from "reactflow";
import {
  BaseNode,
  labelClasses,
  labelTextClasses,
  inputClasses,
  fieldContainerClasses,
} from "../components/BaseNode";

export const FileSaveNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="File Save"
      icon="💾"
      handles={[{ type: "target", position: Position.Left, id: `${id}-data` }]}
    >
      <div className={fieldContainerClasses}>
        <div className="flex flex-col gap-2.5">
          <div className="text-[11px] text-slate-500 mb-1">
            Saves incoming data to a file.
          </div>
          <label className={labelClasses}>
            <span className={labelTextClasses}>File Name</span>
            <input
              type="text"
              className={inputClasses}
              defaultValue={data?.fileName || "output.json"}
              placeholder="e.g. data.json"
            />
          </label>
          <label className={labelClasses}>
            <span className={labelTextClasses}>Format</span>
            <select
              className={inputClasses}
              defaultValue={data?.format || "json"}
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="txt">Text</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
