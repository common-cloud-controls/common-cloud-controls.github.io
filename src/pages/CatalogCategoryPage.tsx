import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionItems } from "../content/sections";
import { prettifySegment, getServiceGroups, getItemType, getServicePath, CATALOG_TYPES } from "../content/catalogUtils";

const TYPE_LABELS: Record<string, string> = {
  capabilities: "Capabilities",
  threats: "Threats",
  controls: "Controls",
};

interface CatalogCategoryPageProps {
  category: string;
}

export const CatalogCategoryPage: React.FC<CatalogCategoryPageProps> = ({ category }) => {
  const allItems = getSectionItems("catalogs");

  // Optional index content: an item whose path is exactly /catalogs/<category>
  const indexItem = allItems.find((item) => item.path === `/catalogs/${category}`);

  // All services in this category
  const serviceGroups = getServiceGroups(allItems);
  const services = serviceGroups.get(category) ?? [];

  // Which types are available per service
  function availableTypes(service: string): Set<string> {
    const sp = `/catalogs/${category}/${service}`;
    const found = new Set<string>();
    for (const item of allItems) {
      if (!item.path) continue;
      if (getServicePath(item.path) !== sp) continue;
      const t = getItemType(item.path);
      if (t) found.add(t);
    }
    return found;
  }

  const typeOrder = Array.from(CATALOG_TYPES);

  return (
    <div className="page-layout">
      <CatalogSidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
          {prettifySegment(category)}
        </h1>

        {indexItem?.body.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "var(--gf-space-xl)" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {indexItem.body}
            </ReactMarkdown>
          </div>
        )}

        {services.map(({ label, path: servicePath }) => {
          const serviceSlug = servicePath.split("/").pop()!;
          const available = availableTypes(serviceSlug);
          return (
            <div key={servicePath} style={{ marginBottom: "var(--gf-space-xl)" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-text)", lineHeight: 1.3 }}>
                {label}
              </h2>
              <div style={{ display: "flex", gap: "var(--gf-space-md)", flexWrap: "wrap" }}>
                {typeOrder.map((type) => {
                  const enabled = available.has(type);
                  const href = `${servicePath}/${type}`;
                  return enabled ? (
                    <Link
                      key={type}
                      to={href}
                      style={{
                        display: "inline-block",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "var(--gf-radius-lg)",
                        border: "1px solid var(--gf-color-accent)",
                        background: "transparent",
                        color: "var(--gf-color-accent)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        transition: "background 0.15s, color 0.15s",
                      }}
                    >
                      {TYPE_LABELS[type]}
                    </Link>
                  ) : (
                    <span
                      key={type}
                      style={{
                        display: "inline-block",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "var(--gf-radius-lg)",
                        border: "1px solid var(--gf-color-border-strong)",
                        background: "transparent",
                        color: "var(--gf-color-text-subtle)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        opacity: 0.45,
                        cursor: "not-allowed",
                      }}
                    >
                      {TYPE_LABELS[type]}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
