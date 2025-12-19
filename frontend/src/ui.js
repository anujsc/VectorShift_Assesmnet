// ui.js
// Part 2: Styling - Main canvas with React Flow
// Displays the drag-and-drop UI for pipeline building

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { APINode } from "./nodes/apiNode";
import { ConditionNode } from "./nodes/conditionNode";
import { TransformNode } from "./nodes/transformNode";
import { DatabaseNode } from "./nodes/databaseNode";
import { LoopNode } from "./nodes/loopNode";
import { FileSaveNode } from "./nodes/fileSaveNode";
import { DataFilterNode } from "./nodes/dataFilterNode";
import { CodeExecutionNode } from "./nodes/codeExecutionNode";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  condition: ConditionNode,
  transform: TransformNode,
  database: DatabaseNode,
  loop: LoopNode,
  fileSave: FileSaveNode,
  dataFilter: DataFilterNode,
  codeExecution: CodeExecutionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  // Enable keyboard shortcuts
  useKeyboardShortcuts(reactFlowInstance);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: "100%",
        height: "calc(100vh - 200px)",
        minHeight: "500px",
        background: "#F8FAFC",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid={true}
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: "#6366F1", strokeWidth: 2 }}
        defaultEdgeOptions={{
          animated: true,
          type: "smoothstep",
          style: {
            stroke: "#6366F1",
            strokeWidth: 2,
          },
        }}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background
          variant="dots"
          color="#CBD5E1"
          gap={gridSize}
          size={1}
          style={{ background: "#F8FAFC" }}
        />
        <Controls
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap
          nodeColor={(node) => {
            return "#fff";
          }}
          maskColor="rgba(241, 245, 249, 0.7)"
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
          }}
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Empty state message */}
      {nodes.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#64748B",
            pointerEvents: "none",
          }}
        >
          <div
            style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}
          >
            Start Building Your Pipeline
          </div>
          <div style={{ fontSize: "14px", opacity: 0.7 }}>
            Drag nodes from the palette above and connect them
          </div>
        </div>
      )}
    </div>
  );
};
