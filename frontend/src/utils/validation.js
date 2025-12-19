// Validation utilities for pipeline and nodes

/**
 * Detect cycles in the graph (frontend DAG validation)
 */
export const detectCycles = (nodes, edges) => {
  if (!nodes.length) return false;

  // Build adjacency list
  const graph = new Map();
  const inDegree = new Map();

  // Initialize
  nodes.forEach((node) => {
    graph.set(node.id, []);
    inDegree.set(node.id, 0);
  });

  // Build graph
  edges.forEach((edge) => {
    if (graph.has(edge.source)) {
      graph.get(edge.source).push(edge.target);
    }
    if (inDegree.has(edge.target)) {
      inDegree.set(edge.target, inDegree.get(edge.target) + 1);
    }
  });

  // Kahn's algorithm
  const queue = [];
  inDegree.forEach((degree, nodeId) => {
    if (degree === 0) queue.push(nodeId);
  });

  let visitedCount = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    visitedCount++;

    const neighbors = graph.get(node) || [];
    neighbors.forEach((neighbor) => {
      const newDegree = inDegree.get(neighbor) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) {
        queue.push(neighbor);
      }
    });
  }

  // If we didn't visit all nodes, there's a cycle
  return visitedCount !== nodes.length;
};

/**
 * Validate pipeline before submission
 */
export const validatePipeline = (nodes, edges) => {
  const errors = [];

  // Check if pipeline is empty
  if (nodes.length === 0) {
    errors.push("Pipeline is empty. Add at least one node.");
    return { valid: false, errors };
  }

  // Check for cycles
  if (detectCycles(nodes, edges)) {
    errors.push("Pipeline contains cycles. Remove circular connections.");
  }

  // Check for disconnected nodes (optional warning)
  const connectedNodes = new Set();
  edges.forEach((edge) => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });

  const disconnectedCount = nodes.length - connectedNodes.size;
  if (disconnectedCount > 0 && nodes.length > 1) {
    errors.push(
      `${disconnectedCount} node(s) are not connected to the pipeline.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings:
      disconnectedCount > 0
        ? [`${disconnectedCount} disconnected node(s)`]
        : [],
  };
};

/**
 * Validate node name
 */
export const validateNodeName = (name) => {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: "Name cannot be empty" };
  }

  if (name.length > 100) {
    return { valid: false, error: "Name is too long (max 100 characters)" };
  }

  return { valid: true };
};
