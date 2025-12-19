// Keyboard shortcuts hook for better UX
import { useEffect } from "react";
import { useStore } from "../store";
import toast from "react-hot-toast";

export const useKeyboardShortcuts = (reactFlowInstance) => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Delete selected nodes/edges (Delete or Backspace)
      if (event.key === "Delete" || event.key === "Backspace") {
        // Don't delete if user is typing in an input
        if (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.tagName === "SELECT"
        ) {
          return;
        }

        const selectedNodes = nodes.filter((node) => node.selected);
        const selectedEdges = edges.filter((edge) => edge.selected);

        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          event.preventDefault();

          // Remove selected nodes
          if (selectedNodes.length > 0) {
            const nodeIds = selectedNodes.map((n) => n.id);
            setNodes(nodes.filter((n) => !nodeIds.includes(n.id)));

            // Also remove edges connected to deleted nodes
            setEdges(
              edges.filter(
                (e) =>
                  !nodeIds.includes(e.source) && !nodeIds.includes(e.target)
              )
            );

            toast.success(`Deleted ${selectedNodes.length} node(s)`, {
              duration: 2000,
            });
          }

          // Remove selected edges
          if (selectedEdges.length > 0) {
            const edgeIds = selectedEdges.map((e) => e.id);
            setEdges(edges.filter((e) => !edgeIds.includes(e.id)));

            toast.success(`Deleted ${selectedEdges.length} connection(s)`, {
              duration: 2000,
            });
          }
        }
      }

      // Select all (Ctrl/Cmd + A)
      if ((event.ctrlKey || event.metaKey) && event.key === "a") {
        // Don't select all if user is typing
        if (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.tagName === "SELECT"
        ) {
          return;
        }

        event.preventDefault();
        setNodes(nodes.map((node) => ({ ...node, selected: true })));
        toast("All nodes selected", { icon: "✓", duration: 1500 });
      }

      // Fit view (Ctrl/Cmd + 0)
      if ((event.ctrlKey || event.metaKey) && event.key === "0") {
        event.preventDefault();
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ padding: 0.2, duration: 300 });
          toast("View reset", { icon: "🎯", duration: 1500 });
        }
      }

      // Zoom in (Ctrl/Cmd + =)
      if ((event.ctrlKey || event.metaKey) && event.key === "=") {
        event.preventDefault();
        if (reactFlowInstance) {
          reactFlowInstance.zoomIn({ duration: 200 });
        }
      }

      // Zoom out (Ctrl/Cmd + -)
      if ((event.ctrlKey || event.metaKey) && event.key === "-") {
        event.preventDefault();
        if (reactFlowInstance) {
          reactFlowInstance.zoomOut({ duration: 200 });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);
};
