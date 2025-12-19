// Toast notification system
import { Toaster } from "react-hot-toast";

export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#FFFFFF",
          color: "#0F172A",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          padding: "12px 16px",
          fontSize: "13px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif',
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #D1FAE5",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #FEE2E2",
          },
        },
        loading: {
          iconTheme: {
            primary: "#3B82F6",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
};
