import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getSectionListItems } from "../content/sections";
import { prettifySegment, getServiceGroups } from "../content/catalogUtils";

interface CatalogSidebarProps {
  typeFilter?: string;
}

export const CatalogSidebar: React.FC<CatalogSidebarProps> = ({ typeFilter }) => {
  const { pathname } = useLocation();
  const listItems = getSectionListItems("catalogs");

  const typeOverviews = listItems.filter(
    (item) => item.path && item.path.split("/").filter(Boolean).length === 2
  );

  const serviceGroups = getServiceGroups(listItems, typeFilter);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const linkStyle = (path: string): React.CSSProperties => ({
    display: "block",
    padding: "0.3rem 0.75rem",
    borderRadius: "4px",
    textDecoration: "none",
    fontSize: "0.875rem",
    color: isActive(path) ? "var(--gf-color-accent)" : "var(--gf-color-text-subtle)",
    fontWeight: pathname === path ? 600 : 400,
    background: pathname === path ? "color-mix(in srgb, var(--gf-color-accent) 8%, transparent)" : "transparent",
    transition: "background 0.15s, color 0.15s",
  });

  const sectionLabel: React.CSSProperties = {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--gf-color-text-subtle)",
    padding: "0 0.75rem",
    marginBottom: "0.25rem",
    marginTop: "var(--gf-space-md)",
  };

  return (
    <nav
      style={{
        width: "200px",
        flexShrink: 0,
        position: "sticky",
        top: "var(--gf-space-xl)",
        alignSelf: "flex-start",
        borderRight: "1px solid var(--gf-color-border)",
        paddingRight: "var(--gf-space-md)",
      }}
    >
      <div style={sectionLabel}>Catalog Types</div>
      {typeOverviews.map((item) => (
        <Link key={item.path} to={item.path!} style={linkStyle(item.path!)}>
          {item.title}
        </Link>
      ))}

      {serviceGroups.size > 0 && (
        <>
          <div style={{ ...sectionLabel, marginTop: "var(--gf-space-lg)" }}>Services</div>
          {Array.from(serviceGroups.entries()).map(([category, services]) => (
            <div key={category} style={{ marginBottom: "var(--gf-space-sm)" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--gf-color-text-subtle)",
                  padding: "0.2rem 0.75rem",
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                {prettifySegment(category)}
              </div>
              {services.map(({ path, label }) => (
                <Link key={path} to={path} style={linkStyle(path)}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </>
      )}
    </nav>
  );
};
