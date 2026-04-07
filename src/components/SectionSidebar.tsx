import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getSectionListItems } from "../content/sections";
import { siteConfig } from "../config/site";

interface SectionSidebarProps {
  section: string;
}

export const SectionSidebar: React.FC<SectionSidebarProps> = ({ section }) => {
  const { pathname } = useLocation();
  const items = getSectionListItems(section);
  const label = siteConfig.contentSections[section]?.label ?? section;

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

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
    marginTop: "0",
  };

  return (
    <nav
      style={{
        width: "210px",
        flexShrink: 0,
        position: "sticky",
        top: "var(--gf-space-xl)",
        alignSelf: "flex-start",
        background: "var(--gf-color-surface)",
        border: "1px solid var(--gf-color-border-strong)",
        borderRadius: "var(--gf-radius-xl)",
        padding: "var(--gf-space-md)",
        boxShadow: "var(--gf-shadow-surface)",
      }}
    >
      <div style={sectionLabel}>{label}</div>
      <Link to={`/${section}`} style={linkStyle(`/${section}`)}>
        Overview
      </Link>
      {items.map((item) => {
        const href = item.path ?? `/${section}/${item.slug}`;
        return (
          <Link key={item.slug} to={href} style={linkStyle(href)}>
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};
