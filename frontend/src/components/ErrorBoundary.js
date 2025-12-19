// Error Boundary for production-grade error handling
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#F8FAFC",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "600px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              ⚠️
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#0F172A",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748B",
                marginBottom: "24px",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              The application encountered an unexpected error. Please refresh
              the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                width: "100%",
                padding: "12px 24px",
                background: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#2563EB";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#3B82F6";
              }}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details
                style={{
                  marginTop: "24px",
                  padding: "16px",
                  background: "#FEF2F2",
                  border: "1px solid #FEE2E2",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#991B1B",
                    marginBottom: "8px",
                  }}
                >
                  Error Details (Development Only)
                </summary>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    color: "#7F1D1D",
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
