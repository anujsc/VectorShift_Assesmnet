// submit.js
// Part 4: Backend Integration - Submit button with API call

import { useState } from "react";
import { useStore } from "./store";
import toast from "react-hot-toast";
import { validatePipeline } from "./utils/validation";
import { KeyboardShortcutsHelp } from "./components/KeyboardShortcutsHelp";

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Frontend validation
      const validation = validatePipeline(nodes, edges);

      if (!validation.valid) {
        toast.error(
          <div>
            <div style={{ fontWeight: "600", marginBottom: "4px" }}>
              Validation Failed
            </div>
            {validation.errors.map((err, i) => (
              <div key={i} style={{ fontSize: "12px", opacity: 0.9 }}>
                • {err}
              </div>
            ))}
          </div>,
          { duration: 5000 }
        );
        return;
      }

      // Show warnings if any
      if (validation.warnings && validation.warnings.length > 0) {
        validation.warnings.forEach((warning) => {
          toast(warning, {
            icon: "⚠️",
            duration: 3000,
          });
        });
      }

      // Prepare payload with nodes and edges
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, type: n.type })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      };

      // Show loading toast
      const loadingToast = toast.loading("Analyzing pipeline...");

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      toast.dismiss(loadingToast);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Show success or error based on DAG validation
      if (data.is_dag) {
        toast.success(
          <div>
            <div style={{ fontWeight: "600", marginBottom: "6px" }}>
              ✓ Pipeline Valid
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              {data.num_nodes} nodes • {data.num_edges} connections
            </div>
            <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
              Ready for execution
            </div>
          </div>,
          { duration: 4000 }
        );
      } else {
        toast.error(
          <div>
            <div style={{ fontWeight: "600", marginBottom: "6px" }}>
              Invalid Pipeline
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Pipeline contains cycles. Remove circular connections.
            </div>
          </div>,
          { duration: 5000 }
        );
      }
    } catch (error) {
      toast.error(
        <div>
          <div style={{ fontWeight: "600", marginBottom: "4px" }}>
            Connection Error
          </div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            Could not connect to backend server
          </div>
          <div style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
            Ensure server is running on localhost:8000
          </div>
        </div>,
        { duration: 5000 }
      );
      console.error("Pipeline submission error:", error);
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

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* Keyboard Shortcuts Button */}
        <KeyboardShortcutsHelp />

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
          {loading ? <>Analyzing...</> : <>Submit Pipeline</>}
        </button>
      </div>
    </div>
  );
};
