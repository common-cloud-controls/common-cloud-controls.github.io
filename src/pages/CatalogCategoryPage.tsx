import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionItems } from "../content/sections";
import { useItemBody } from "../content/useItemBody";
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
  const indexBody = useItemBody(indexItem);

  // All services in this category
  const serviceGroups = getServiceGroups(allItems);
  const services = serviceGroups.get(category) ?? [];

  // For core: check which types have published content at /catalogs/core/ccc/<type>
  const isCore = category === "core";
  const coreAvailableTypes = new Set<string>();
  if (isCore) {
    for (const item of allItems) {
      if (!item.path) continue;
      if (getServicePath(item.path) !== "/catalogs/core/ccc") continue;
      const t = getItemType(item.path);
      if (t) coreAvailableTypes.add(t);
    }
  }

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
          {isCore ? "CCC Core Catalog" : prettifySegment(category)}
        </h1>

        {isCore && (
          <div style={{ display: "flex", gap: "var(--gf-space-md)", flexWrap: "wrap", alignItems: "center", justifyContent: "center", flex: 1, marginBottom: "var(--gf-space-xl)" }}>
            {typeOrder.map((type) => {
              const enabled = coreAvailableTypes.has(type);
              const href = `/catalogs/core/ccc/${type}`;
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
        )}

        {indexBody.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "var(--gf-space-xl)" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {indexBody}
            </ReactMarkdown>
          </div>
        )}

        {!isCore && services.map(({ label, path: servicePath }) => {
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

        {isCore && (
          <div className="surface-card" style={{
            marginTop: "var(--gf-space-xl)",
            padding: "var(--gf-space-lg)",
          }}>
            <h2 style={{ margin: "0 0 var(--gf-space-sm)", fontSize: "1.25rem" }}>Contribute to the Next Release</h2>
            <p style={{ margin: "0 0 var(--gf-space-md)", color: "var(--gf-color-text-subtle)", fontSize: "1rem", lineHeight: 1.6 }}>
              The core catalog is maintained as versioned YAML files. Generated artifacts are published here as each release is cut.
            </p>
            <a
              href="https://github.com/common-cloud-controls/core-catalog"
              target="_blank"
              rel="noopener noreferrer"
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
              View on GitHub →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
