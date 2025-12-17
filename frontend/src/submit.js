// submit.js
// Part 4: Backend Integration - Submit button with API call

import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Prepare payload with nodes and edges
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, type: n.type })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      };

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // User-friendly alert with formatted results
      alert(
        ` Pipeline Analysis Complete!\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        ` Total Nodes: ${data.num_nodes}\n` +
        ` Total Edges: ${data.num_edges}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `${data.is_dag
          ? " Valid DAG\nYour pipeline has no cycles and is ready for execution!"
          : " Invalid DAG\nYour pipeline contains cycles. Please remove circular connections."
        }`
      );
    } catch (error) {
      alert(
        " Connection Error\n\nCould not connect to the backend server.\nPlease ensure the server is running on http://localhost:8000\n\nError: " +
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: "#FFFFFF",
        borderTop: "1px solid #E2E8F0",
      }}
    >
      {/* Pipeline Stats */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            color: "#64748B",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              background: "#EEF2FF",
              padding: "4px 10px",
              borderRadius: "6px",
              fontWeight: "600",
              color: "#6366F1",
            }}
          >
            {nodes.length}
          </span>
          <span>Nodes</span>
        </div>
        <div
          style={{
            color: "#64748B",
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              background: "#F0FDFA",
              padding: "4px 10px",
              borderRadius: "6px",
              fontWeight: "600",
              color: "#14B8A6",
            }}
          >
            {edges.length}
          </span>
          <span>Connections</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || nodes.length === 0}
        style={{
          padding: "8px 16px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          fontWeight: "500",
          color: loading || nodes.length === 0 ? "#94A3B8" : "#1E293B",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "6px",
          cursor: loading || nodes.length === 0 ? "not-allowed" : "pointer",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!loading && nodes.length > 0) {
            e.target.style.borderColor = "#CBD5E1";
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && nodes.length > 0) {
            e.target.style.borderColor = "#E2E8F0";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
          }
        }}
      >
        {loading ? (
          <>
            Analyzing...
          </>
        ) : (
          <>Submit Pipeline</>
        )}
      </button>
    </div>
  );
};
