import React from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { getSectionItems } from "../content/sections";
import { prettifySegment } from "../content/catalogUtils";

const CATALOG_TYPES = new Set(["capabilities", "threats", "controls"]);

function getItemType(itemPath: string): string | null {
  const parts = itemPath.split("/").filter(Boolean);
  if (parts.length < 5) return null;
  // New structure: /catalogs/<type>/<category>/<service>/<tag>
  if (CATALOG_TYPES.has(parts[1])) return parts[1];
  // Old structure: /catalogs/<category>/<service>/<type>/<tag>
  if (CATALOG_TYPES.has(parts[3])) return parts[3];
  return null;
}

// Returns the canonical /catalogs/<category>/<service> for an item regardless of path structure.
function getServicePath(itemPath: string): string | null {
  const parts = itemPath.split("/").filter(Boolean);
  if (parts.length < 5) return null;
  if (CATALOG_TYPES.has(parts[1])) {
    // New: /catalogs/<type>/<category>/<service>/<tag>
    return `/catalogs/${parts[2]}/${parts[3]}`;
  }
  // Old: /catalogs/<category>/<service>/<type>/<tag>
  return `/catalogs/${parts[1]}/${parts[2]}`;
}

export const CatalogBrowsePage: React.FC = () => {
  const { pathname } = useLocation();
  const allItems = getSectionItems("catalogs");

  const segments = pathname.split("/").filter(Boolean);
  const isBrowsingByType = segments.length === 2 && CATALOG_TYPES.has(segments[1]);

  let matches;
  if (isBrowsingByType) {
    const type = segments[1];
    matches = allItems.filter((item) => item.path && getItemType(item.path) === type);
  } else {
    const servicePath = pathname.replace(/\/$/, "");
    matches = allItems.filter(
      (item) => item.path && (
        item.path.startsWith(servicePath + "/") ||
        getServicePath(item.path) === servicePath
      )
    );
  }

  if (matches.length === 0) return <Navigate to="/catalogs" replace />;

  // Build breadcrumb segments from the path
  const breadcrumbs = segments.map((seg, i) => ({
    label: prettifySegment(seg),
    path: "/" + segments.slice(0, i + 1).join("/"),
  }));

  const pageTitle = prettifySegment(segments[segments.length - 1] ?? "");

  return (
    <div style={{ display: "flex", gap: "var(--gf-space-xl)", maxWidth: "1200px", margin: "0 auto", width: "100%", alignItems: "flex-start" }}>
      <CatalogSidebar typeFilter={isBrowsingByType ? segments[1] : undefined} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "var(--gf-space-md)", fontSize: "0.85rem", color: "var(--gf-color-text-subtle)", flexWrap: "wrap" }}>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.path}>
              {i > 0 && <span style={{ opacity: 0.4 }}>/</span>}
              {i < breadcrumbs.length - 1 ? (
                <Link to={crumb.path} style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>
                  {crumb.label}
                </Link>
              ) : (
                <span style={{ color: "var(--gf-color-text)" }}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "var(--gf-space-lg)", color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
          {pageTitle}
        </h1>

        <div className="catalog-grid">
          {matches.map((item) => (
            <Link key={item.path} to={item.path!} className="link-card" style={{ textDecoration: "none", color: "inherit", display: "flex" }}>
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "var(--gf-space-sm)",
                padding: "var(--gf-space-xl)",
                background: "var(--gf-color-surface)",
                borderRadius: "var(--gf-radius-xl)",
                border: "1px solid var(--gf-color-border-strong)",
                boxShadow: "var(--gf-shadow-surface)",
              }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--gf-color-accent)" }}>
                  {item.title}
                </h3>
                {item.description && (
                  <p style={{ margin: 0, color: "var(--gf-color-text-subtle)", lineHeight: 1.6, fontSize: "0.9rem", flex: 1 }}>
                    {item.description}
                  </p>
                )}
                <span style={{ fontSize: "0.8rem", color: "var(--gf-color-accent)", fontWeight: 600, marginTop: "auto" }}>
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
