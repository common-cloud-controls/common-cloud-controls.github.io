import React from "react";
import { Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionItemByPath } from "../content/sections";

interface CatalogTypeOverviewPageProps {
  type: "capabilities" | "threats" | "controls";
}

export const CatalogTypeOverviewPage: React.FC<CatalogTypeOverviewPageProps> = ({ type }) => {
  const item = getSectionItemByPath("catalogs", `/catalogs/${type}`);
  if (!item) return <Navigate to="/catalogs" replace />;

  return (
    <div style={{ display: "flex", gap: "var(--gf-space-xl)", maxWidth: "1200px", margin: "0 auto", width: "100%", alignItems: "flex-start" }}>
      <CatalogSidebar typeFilter={type} />

      <article style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
          {item.title}
        </h1>
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
      </article>
    </div>
  );
};
