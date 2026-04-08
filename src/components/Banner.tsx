import React from "react";
import { siteConfig } from "../config/site";

export const Banner: React.FC = () => {
  const { banner } = siteConfig;
  const [dismissed, setDismissed] = React.useState(() => {
    if (!banner?.enabled) return true;
    return localStorage.getItem(banner.storageKey) === "true";
  });

  if (!banner?.enabled || dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(banner.storageKey, "true");
    setDismissed(true);
  };

  return (
    <div
      role="alert"
      style={{
        width: "100%",
        backgroundColor: "var(--gf-color-complement)",
        color: "#000",
        padding: "0.75rem 1rem",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontSize: "0.95rem",
        zIndex: 1100,
      }}
    >
      <span style={{ textAlign: "center" }}>{banner.message}</span>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.25rem",
          lineHeight: 1,
          color: "#000",
          padding: "0 0.25rem",
          flexShrink: 0,
        }}
      >
        &times;
      </button>
    </div>
  );
};
