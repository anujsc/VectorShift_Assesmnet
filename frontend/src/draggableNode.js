// draggableNode.js
// Part 2: Styling - Draggable node component for toolbar

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.target.style.transform = "scale(0.95)";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = "grab";
    event.target.style.transform = "translateY(0) scale(1)";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      style={{
        cursor: "grab",
        minWidth: "80px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        borderRadius: "6px",
        background: "#FFFFFF",
        justifyContent: "center",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        userSelect: "none",
        padding: "0 12px",
        gap: "6px",
        color: "#1E293B",
        fontSize: "12px",
        fontWeight: "500"
      }}
      draggable
    >
      {label}
    </div>
  );
};
