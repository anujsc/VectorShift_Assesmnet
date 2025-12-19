// Keyboard shortcuts help panel
import { useState } from "react";

export const KeyboardShortcutsHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    {
      keys: ["Delete", "Backspace"],
      description: "Delete selected nodes/edges",
    },
    { keys: ["Ctrl/⌘", "A"], description: "Select all nodes" },
    { keys: ["Ctrl/⌘", "0"], description: "Fit view to canvas" },
    { keys: ["Ctrl/⌘", "+"], description: "Zoom in" },
    { keys: ["Ctrl/⌘", "-"], description: "Zoom out" },
  ];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 12px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          fontWeight: "500",
          color: "#64748B",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#CBD5E1";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E2E8F0";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
        }}
        title="Keyboard shortcuts"
      >
        <span style={{ fontSize: "16px" }}>⌨️</span>
        <span>Shortcuts</span>
      </button>

      {/* Help Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.3)",
              zIndex: 1001,
              animation: "fadeIn 0.2s ease",
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#FFFFFF",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
              padding: "24px",
              minWidth: "400px",
              maxWidth: "90vw",
              zIndex: 1002,
              animation: "slideIn 0.2s ease",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#0F172A",
                }}
              >
                ⌨️ Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#64748B",
                  padding: "4px",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Shortcuts List */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: "#F8FAFC",
                    borderRadius: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#64748B",
                    }}
                  >
                    {shortcut.description}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {shortcut.keys.map((key, i) => (
                      <kbd
                        key={i}
                        style={{
                          padding: "4px 8px",
                          background: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#0F172A",
                          fontFamily: "monospace",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translate(-50%, -48%);
                }
                to {
                  opacity: 1;
                  transform: translate(-50%, -50%);
                }
              }
            `}
          </style>
        </>
      )}
    </>
  );
};
