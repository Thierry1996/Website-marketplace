"use client";

/**
 * Layout-level error boundary. Renders its own <html> + <body> because
 * the regular layout itself may have crashed. Minimal styling — no
 * dependencies on the global stylesheet — so it can never crash itself.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#FFFFFF",
          color: "#0F172A",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "40px 16px",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(135deg,#10B981 0%,#8B5CF6 60%,#F59E0B 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            500
          </div>
          <h1 style={{ marginTop: 16, fontSize: 24, fontWeight: 700 }}>
            We hit an unexpected error.
          </h1>
          <p style={{ marginTop: 8, color: "#64748B", lineHeight: 1.6 }}>
            Sorry about that — we've logged it for our team. You can refresh to try again.
          </p>
          {error.digest && (
            <p style={{ marginTop: 8, color: "#94A3B8", fontSize: 12 }}>
              Reference: <code>{error.digest}</code>
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "12px 28px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              color: "#FFFFFF",
              background: "linear-gradient(135deg,#10B981,#8B5CF6,#F59E0B)",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
