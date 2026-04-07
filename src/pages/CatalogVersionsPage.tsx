import React from "react";
import { Link } from "react-router-dom";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { getSectionItems } from "../content/sections";
import { prettifySegment, getItemType, getServicePath } from "../content/catalogUtils";

interface CatalogVersionsPageProps {
  category: string;
  service: string;
  type: string;
}

export const CatalogVersionsPage: React.FC<CatalogVersionsPageProps> = ({ category, service, type }) => {
  const allItems = getSectionItems("catalogs");
  const servicePath = `/catalogs/${category}/${service}`;

  const versions = allItems
    .filter((item) => item.path && getServicePath(item.path) === servicePath && getItemType(item.path) === type)
    .sort((a, b) => (b.path ?? "").localeCompare(a.path ?? ""));

  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div style={{ display: "flex", gap: "var(--gf-space-xl)", maxWidth: "1200px", margin: "0 auto", width: "100%", alignItems: "flex-start" }}>
      <CatalogSidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "var(--gf-space-md)", fontSize: "0.85rem", color: "var(--gf-color-text-subtle)", flexWrap: "wrap" }}>
          <Link to="/catalogs" style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>Catalogs</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <Link to={`/catalogs/${category}`} style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>{prettifySegment(category)}</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: "var(--gf-color-text)" }}>{prettifySegment(service)} {typeLabel}</span>
        </nav>

        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "var(--gf-space-lg)", color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
          {prettifySegment(service)} {typeLabel}
        </h1>

        {versions.length === 0 ? (
          <p style={{ color: "var(--gf-color-text-subtle)" }}>No versions published yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gf-space-md)" }}>
            {versions.map((item) => {
              const tag = item.path!.split("/").pop()!;
              return (
                <Link
                  key={item.path}
                  to={item.path!}
                  className="link-card"
                  style={{ textDecoration: "none", color: "inherit", display: "flex" }}
                >
                  <div style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "var(--gf-space-md)",
                    padding: "var(--gf-space-lg) var(--gf-space-xl)",
                    background: "var(--gf-color-surface)",
                    borderRadius: "var(--gf-radius-xl)",
                    border: "1px solid var(--gf-color-border-strong)",
                    boxShadow: "var(--gf-shadow-surface)",
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--gf-color-accent)" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--gf-color-text-subtle)", marginTop: "0.2rem" }}>
                        {tag}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--gf-color-accent)", fontWeight: 600, whiteSpace: "nowrap" }}>
                      View →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
