import React, { useState } from "react";
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

  // Default open: whichever category the current path falls under
  const activeCategory = Array.from(serviceGroups.keys()).find((cat) =>
    pathname.startsWith(`/catalogs/${cat}/`)
  );
  const [openCategory, setOpenCategory] = useState<string | null>(activeCategory ?? null);

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
          {Array.from(serviceGroups.entries()).map(([category, services]) => {
            const isOpen = openCategory === category;
            const categoryActive = pathname.startsWith(`/catalogs/${category}/`);
            return (
              <div key={category} style={{ marginBottom: "0.1rem" }}>
                <button
                  onClick={() => setOpenCategory(isOpen ? null : category)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: categoryActive ? 600 : 400,
                    color: categoryActive ? "var(--gf-color-accent)" : "var(--gf-color-text-subtle)",
                    background: categoryActive ? "color-mix(in srgb, var(--gf-color-accent) 8%, transparent)" : "transparent",
                    textAlign: "left",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  <span>{prettifySegment(category)}</span>
                  <span style={{
                    fontSize: "0.65rem",
                    opacity: 0.6,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    display: "inline-block",
                  }}>▾</span>
                </button>
                {isOpen && (
                  <div style={{ paddingLeft: "0.5rem" }}>
                    {services.map(({ path, label }) => (
                      <Link key={path} to={path} style={linkStyle(path)}>
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </nav>
  );
};
