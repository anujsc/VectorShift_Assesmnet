// loopNode.js - AI-Native Design
import { useState } from "react";
import { Position } from "reactflow";
import {
  BaseNode,
  NodeField,
  NodeInput,
  NodeSelect,
  NodeInfo,
} from "../components/BaseNode";

export const LoopNode = ({ id, data, selected }) => {
  const [loopType, setLoopType] = useState(data?.loopType || "forEach");
  const [iterations, setIterations] = useState(data?.iterations || 10);

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-array`,
      handleType: "input",
      style: { top: "50%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-item`,
      handleType: "output",
      style: { top: "40%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-complete`,
      handleType: "output",
      style: { top: "60%" },
    },
  ];

  const loopInfo = {
    forEach: "Execute for each item",
    map: "Transform each item",
    filter: "Filter items by condition",
    reduce: "Reduce to single value",
  };

  return (
    <BaseNode
      id={id}
      title="Loop"
      icon="🔁"
      handles={handles}
      selected={selected}
    >
      <NodeField label="Type">
        <NodeSelect
          value={loopType}
          onChange={(e) => setLoopType(e.target.value)}
          options={[
            { value: "forEach", label: "For Each" },
            { value: "map", label: "Map" },
            { value: "filter", label: "Filter" },
            { value: "reduce", label: "Reduce" },
          ]}
        />
      </NodeField>
      {loopType === "forEach" && (
        <NodeField label="Max Iterations">
          <NodeInput
            type="number"
            value={iterations}
            onChange={(e) => setIterations(e.target.value)}
            placeholder="10"
          />
        </NodeField>
      )}
      <NodeInfo type="info">{loopInfo[loopType]}</NodeInfo>
    </BaseNode>
  );
};
