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
  const serviceGroups = getServiceGroups(listItems, typeFilter);

  const activeCategory = Array.from(serviceGroups.keys()).find((cat) =>
    pathname.startsWith(`/catalogs/${cat}/`)
  );
  const [openCategory, setOpenCategory] = useState<string | null>(activeCategory ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      <button
        className="catalog-sidebar-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span>Browse Catalogs</span>
        <span style={{ fontSize: "0.65rem", transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
      </button>
      <nav className={`sidebar-nav catalog-sidebar${mobileOpen ? "" : " mobile-collapsed"}`}>
      {Array.from(serviceGroups.entries()).map(([category, services]) => {
        const isOpen = openCategory === category;
        const categoryActive = services.some(({ path }) => isActive(path));
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
    </nav>
    </>
  );
};
