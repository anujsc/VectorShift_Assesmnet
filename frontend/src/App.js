// App.js
// Main application component - VectorShift Pipeline Builder

import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastContainer } from "./components/Toast";

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
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
    </ErrorBoundary>
  );
}

export default App;
