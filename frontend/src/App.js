// App.js
// Main application component - VectorShift Pipeline Builder

import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        margin: 0,
        padding: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      {/* Header with Node Palette */}
      <PipelineToolbar />

      {/* Main Canvas Area */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <PipelineUI />
      </div>

      {/* Footer with Submit Button */}
      <SubmitButton />
    </div>
  );
}

export default App;
