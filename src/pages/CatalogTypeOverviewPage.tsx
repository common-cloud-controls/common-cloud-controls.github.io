import React from "react";
import { Navigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionItemByPath } from "../content/sections";

interface CatalogTypeOverviewPageProps {
  type: "capabilities" | "threats" | "controls";
}

const typeConfig: Record<string, { label: string }> = {
  capabilities: { label: "What each service can do" },
  threats:      { label: "Risks associated with each capability" },
  controls:     { label: "Mitigations for each identified threat" },
};

export const CatalogTypeOverviewPage: React.FC<CatalogTypeOverviewPageProps> = ({ type }) => {
  const item = getSectionItemByPath("catalogs", `/catalogs/${type}`);
  if (!item) return <Navigate to="/catalogs" replace />;

  const config = typeConfig[type];

  return (
    <div style={{ display: "flex", gap: "var(--gf-space-xl)", maxWidth: "1200px", margin: "0 auto", width: "100%", alignItems: "flex-start" }}>
      <CatalogSidebar typeFilter={type} />

      <article style={{ flex: 1, minWidth: 0 }}>
        {/* Type header */}
        <div style={{
          padding: "var(--gf-space-xl)",
          background: "var(--gf-color-surface)",
          borderRadius: "var(--gf-radius-xl)",
          border: "1px solid var(--gf-color-border-strong)",
          boxShadow: "var(--gf-shadow-surface)",
          marginBottom: "var(--gf-space-xl)",
        }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gf-color-text-subtle)", marginBottom: "0.35rem" }}>
            Catalog Type
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0, color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
            {item.title}
          </h1>
          <p style={{ margin: "0.5rem 0 0", color: "var(--gf-color-text-subtle)", fontSize: "1rem", lineHeight: 1.5 }}>
            {config.label}
          </p>
        </div>

        {item.description && (
          <p style={{ color: "var(--gf-color-text-subtle)", fontSize: "1.1rem", marginBottom: "var(--gf-space-lg)", lineHeight: 1.6 }}>
            {item.description}
          </p>
        )}

        {item.body.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {item.body}
            </ReactMarkdown>
          </div>
        )}

        {/* Browse CTA */}
        <div style={{
          marginTop: "var(--gf-space-xl)",
          padding: "var(--gf-space-lg)",
          background: "var(--gf-color-surface)",
          borderRadius: "var(--gf-radius-xl)",
          border: "1px solid var(--gf-color-border-strong)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--gf-space-md)",
          flexWrap: "wrap",
        }}>
          <p style={{ margin: 0, color: "var(--gf-color-text-subtle)", fontSize: "1rem" }}>
            Ready to explore the {item.title.toLowerCase()} catalog?
          </p>
          <Link
            to={`/catalogs/${type}/`}
            style={{
              display: "inline-block",
              padding: "0.6rem 1.5rem",
              background: "var(--gf-color-accent)",
              color: "var(--gf-color-button-text, #fff)",
              borderRadius: "var(--gf-radius-lg)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
            }}
          >
            Browse {item.title} →
          </Link>
        </div>
      </article>
    </div>
  );
};
