"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Filter error:", error);
  }, [error]);

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        border: "1px solid #ffcccc",
        borderRadius: "8px",
        margin: "20px",
      }}
    >
      <h2 style={{ color: "#cc0000" }}>
        Помилка завантаження відфільтрованих нотаток
      </h2>
      <p style={{ margin: "10px 0", color: "#666" }}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
