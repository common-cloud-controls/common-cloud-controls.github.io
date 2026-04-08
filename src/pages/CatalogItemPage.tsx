import React from "react";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../components/markdownComponents";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { getSectionItemByPath } from "../content/sections";
import { prettifySegment } from "../content/catalogUtils";

interface CatalogItemPageProps {
  path: string;
}

export const CatalogItemPage: React.FC<CatalogItemPageProps> = ({ path }) => {
  const item = getSectionItemByPath("catalogs", path);
  if (!item) return <Navigate to="/catalogs" replace />;

  // path = "/catalogs/<category>/<service>/<type>/<version>"
  const segments = path.split("/").filter(Boolean);
  const [, category, service, type, version] = segments;
  const categoryPath = `/catalogs/${category}`;
  const versionsPath = `/catalogs/${category}/${service}/${type}`;
  const typeLabel = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  return (
    <div className="page-layout">
      <CatalogSidebar />
      <article style={{ flex: 1, minWidth: 0, padding: "0 var(--gf-space-xl) var(--gf-space-xl)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--gf-space-lg)", gap: "var(--gf-space-md)", flexWrap: "wrap" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--gf-color-text-subtle)", flexWrap: "wrap" }}>
            <Link to="/catalogs" style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>Catalogs</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to={categoryPath} style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>{prettifySegment(category)}</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to={versionsPath} style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>{prettifySegment(service)} {typeLabel}</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "var(--gf-color-text)" }}>{version}</span>
          </nav>
          <a
            href={`${path}.yaml`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "var(--gf-radius-lg)",
              border: "1px solid var(--gf-color-accent)",
              color: "var(--gf-color-accent)",
              textDecoration: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            View YAML
          </a>
        </div>

        {item.body.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {item.body}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
};
