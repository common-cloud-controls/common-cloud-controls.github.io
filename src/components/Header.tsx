import React from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig, type NavLink } from "../config/site";

const logoUrl = "/logo/ccc-logo.png";

export const Header: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  // Sections handled by customNavLinks — skip auto-generated nav entries for these
  const customNavPaths = (siteConfig.customNavLinks ?? []).map((l) => l.path);

  const contentSectionNav: NavLink[] = Object.entries(siteConfig.contentSections)
    .filter(([section, config]) => config.enabled && config.inNav !== false && !customNavPaths.includes(`/${section}`))
    .map(([section, config]) => ({ path: `/${section}`, label: config.label ?? section }));

  const fullNav: NavLink[] = [
    { path: "/", label: "Home" },
    ...contentSectionNav,
    ...(siteConfig.customNavLinks ?? [])
  ];

  const linkStyle = (path: string): React.CSSProperties => ({
    color: "var(--gf-color-text)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--gf-radius-lg)",
    transition: "background-color 0.2s",
    backgroundColor: location.pathname === path ? "var(--gf-color-accent-soft)" : "transparent"
  });

  const isExternal = (path: string) => path.startsWith("http");

  return (
    <header className="site-header" style={{ width: "100vw", margin: 0, padding: "var(--gf-space-md) var(--gf-space-xl)", boxSizing: "border-box" }}>
      <section id="hero" className="site-header-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--gf-space-md)", textAlign: "center" }}>
        <div className="site-header-brand" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--gf-space-md)" }}>
          <Link to="/" aria-label={`${siteConfig.siteName} home`} style={{ display: "block" }}>
            <img src={logoUrl} alt={siteConfig.siteName} style={{ maxHeight: "60px", width: "auto", objectFit: "contain", display: "block" }} />
          </Link>
        </div>

        <nav style={{ display: "flex", gap: "var(--gf-space-md)", alignItems: "center", flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          {fullNav.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              return (
                <div key={item.path} style={{ position: "relative" }} onMouseEnter={() => setOpenDropdown(item.path)} onMouseLeave={() => setOpenDropdown(null)}>
                  <button
                    type="button"
                    style={{ ...linkStyle(item.path), border: "none", background: openDropdown === item.path ? "var(--gf-color-accent-soft)" : "transparent", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "0.25rem", outline: "none", boxShadow: "none", WebkitAppearance: "none" }}
                  >
                    {item.label} <span style={{ fontSize: "0.75rem" }}>▼</span>
                  </button>
                  {openDropdown === item.path && (
                    <div style={{ position: "absolute", top: "100%", right: 0, paddingTop: "0.25rem", minWidth: "200px", zIndex: 1000 }}>
                      <div style={{ backgroundColor: "var(--gf-color-surface)", border: "1px solid var(--gf-color-accent)", borderRadius: "var(--gf-radius-lg)", boxShadow: "var(--gf-shadow-surface)", overflow: "hidden" }}>
                        {item.children!.map((child) =>
                          isExternal(child.path) ? (
                            <a key={child.path} href={child.path} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "0.75rem 1rem", color: "var(--gf-color-text)", textDecoration: "none", transition: "background-color 0.2s" }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >{child.label}</a>
                          ) : (
                            <Link key={child.path} to={child.path} style={{ display: "block", padding: "0.75rem 1rem", color: "var(--gf-color-text)", textDecoration: "none", transition: "background-color 0.2s", backgroundColor: location.pathname === child.path ? "var(--gf-color-accent-soft)" : "transparent" }}
                              onMouseEnter={(e) => { if (location.pathname !== child.path) e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)"; }}
                              onMouseLeave={(e) => { if (location.pathname !== child.path) e.currentTarget.style.backgroundColor = "transparent"; }}
                            >{child.label}</Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return isExternal(item.path) ? (
              <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer" style={linkStyle(item.path)}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >{item.label}</a>
            ) : (
              <Link key={item.path} to={item.path} style={linkStyle(item.path)}
                onMouseEnter={(e) => { if (location.pathname !== item.path) e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)"; }}
                onMouseLeave={(e) => { if (location.pathname !== item.path) e.currentTarget.style.backgroundColor = "transparent"; }}
              >{item.label}</Link>
            );
          })}
        </nav>
      </section>
    </header>
  );
};
