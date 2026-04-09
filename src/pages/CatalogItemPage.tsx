import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../components/markdownComponents";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { getSectionItemByPath, getSectionItems } from "../content/sections";
import { useItemBody } from "../content/useItemBody";
import { prettifySegment, getItemType, getServicePath } from "../content/catalogUtils";

function OtherVersionsDropdown({ versions }: { versions: { path: string; title: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          fontSize: "0.8rem",
          padding: "0.35rem 0.9rem",
          borderRadius: "var(--gf-radius-lg)",
          border: "1px solid var(--gf-color-accent)",
          color: "var(--gf-color-accent)",
          background: "transparent",
          fontWeight: 600,
          whiteSpace: "nowrap",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        Other Versions
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform 0.15s" }}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 0.35rem)",
          right: 0,
          background: "var(--gf-color-surface)",
          border: "1px solid var(--gf-color-border-strong)",
          borderRadius: "var(--gf-radius-lg)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          zIndex: 100,
          minWidth: "12rem",
          overflow: "hidden",
        }}>
          {versions.map((v) => {
            const versionTag = v.path.split("/").pop()!;
            return (
              <Link
                key={v.path}
                to={v.path}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  color: "var(--gf-color-text)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--gf-color-border-strong)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gf-color-background)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {v.title} <span style={{ color: "var(--gf-color-text-subtle)", fontSize: "0.8rem" }}>({versionTag})</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CatalogItemPageProps {
  path: string;
}

export const CatalogItemPage: React.FC<CatalogItemPageProps> = ({ path }) => {
  const item = getSectionItemByPath("catalogs", path);
  const body = useItemBody(item);
  if (!item) return <Navigate to="/catalogs" replace />;

  // path = "/catalogs/<category>/<service>/<type>/<version>"
  const segments = path.split("/").filter(Boolean);
  const [, category, service, type, version] = segments;
  const categoryPath = `/catalogs/${category}`;
  const typeLabel = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  // Find other versions of this same service/type
  const allItems = getSectionItems("catalogs");
  const servicePath = `/catalogs/${category}/${service}`;
  const otherVersions = allItems
    .filter((it) => it.path && it.path !== path && getServicePath(it.path) === servicePath && getItemType(it.path) === type)
    .sort((a, b) => (b.path ?? "").localeCompare(a.path ?? ""));

  return (
    <div className="page-layout">
      <CatalogSidebar />
      <article style={{ flex: 1, minWidth: 0, padding: "0 var(--gf-space-xl) var(--gf-space-xl)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--gf-space-lg)", gap: "var(--gf-space-md)", flexWrap: "wrap" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--gf-color-text-subtle)", flexWrap: "wrap" }}>
            <Link to="/catalogs" style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>Catalogs</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to={categoryPath} style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>{prettifySegment(category)}</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "var(--gf-color-text)" }}>{prettifySegment(service)} {typeLabel}</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "var(--gf-color-text)" }}>{version}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--gf-space-md)" }}>
            {otherVersions.length > 0 && (
              <OtherVersionsDropdown
                versions={otherVersions.map((v) => ({ path: v.path!, title: v.title }))}
              />
            )}
            <a
              href={`${path}.yaml`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8rem",
                padding: "0.35rem 0.9rem",
                borderRadius: "var(--gf-radius-lg)",
                border: "1px solid var(--gf-color-accent)",
                color: "var(--gf-color-accent)",
                textDecoration: "none",
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Raw YAML
            </a>
          </div>
        </div>

        {body.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {body}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
};
