import React from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig, type NavLink } from "../config/site";
import { isExternal } from "../utils";

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
          <a
            href="https://github.com/common-cloud-controls"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "var(--gf-color-text)", padding: "0.5rem", borderRadius: "var(--gf-radius-lg)", transition: "background-color 0.2s", display: "flex", alignItems: "center" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </nav>
      </section>
    </header>
  );
};
