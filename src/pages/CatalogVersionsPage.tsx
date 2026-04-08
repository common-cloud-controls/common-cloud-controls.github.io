import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsYaml from "js-yaml";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { getSectionItems } from "../content/sections";
import { prettifySegment, getItemType, getServicePath } from "../content/catalogUtils";

interface CatalogMeta {
  description?: string;
  controlCount?: number;
  assessmentRequirementCount?: number;
  capabilityCount?: number;
}

function yamlUrlFromPath(contentPath: string): string {
  return "/data" + contentPath + ".yaml";
}

function extractMeta(data: unknown): CatalogMeta {
  if (!data || typeof data !== "object") return {};
  const d = data as Record<string, unknown>;
  const meta = d["metadata"] as Record<string, unknown> | undefined;
  const description = typeof meta?.description === "string" ? meta.description : undefined;

  const controls = Array.isArray(d["controls"]) ? d["controls"] as unknown[] : [];
  const capabilities = Array.isArray(d["capabilities"]) ? d["capabilities"] as unknown[] : [];

  const assessmentRequirementCount = controls.reduce((sum, ctrl) => {
    const c = ctrl as Record<string, unknown>;
    const ars = Array.isArray(c["assessment-requirements"]) ? c["assessment-requirements"].length : 0;
    return sum + ars;
  }, 0);

  return {
    description,
    controlCount: controls.length > 0 ? controls.length : undefined,
    assessmentRequirementCount: controls.length > 0 ? assessmentRequirementCount : undefined,
    capabilityCount: capabilities.length > 0 ? capabilities.length : undefined,
  };
}

function VersionCard({ item }: { item: { path: string; title: string } }) {
  const [meta, setMeta] = useState<CatalogMeta | null>(null);
  const tag = item.path.split("/").pop()!;

  useEffect(() => {
    fetch(yamlUrlFromPath(item.path))
      .then((r) => r.text())
      .then((text) => setMeta(extractMeta(jsYaml.load(text))))
      .catch(() => setMeta({}));
  }, [item.path]);

  return (
    <Link
      to={item.path}
      className="link-card surface-card"
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "var(--gf-space-sm)", padding: "var(--gf-space-lg) var(--gf-space-xl)" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--gf-space-md)" }}>
        <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--gf-color-accent)" }}>
          {item.title}
        </div>
        <span style={{ fontSize: "0.8rem", color: "var(--gf-color-text-subtle)", whiteSpace: "nowrap", flexShrink: 0 }}>
          {tag}
        </span>
      </div>

      {meta?.description && (
        <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--gf-color-text-subtle)", lineHeight: 1.5 }}>
          {meta.description}
        </p>
      )}

      <div className="version-footer">
        <div style={{ display: "flex", gap: "var(--gf-space-xl)", flexWrap: "wrap" }}>
          {meta?.capabilityCount !== undefined && (
            <Stat label="Capabilities" value={meta.capabilityCount} />
          )}
          {meta?.controlCount !== undefined && (
            <Stat label="Controls" value={meta.controlCount} />
          )}
          {meta?.assessmentRequirementCount !== undefined && (
            <Stat label="Assessment Requirements" value={meta.assessmentRequirementCount} />
          )}
        </div>
        <span className="version-view" style={{ fontSize: "0.8rem", color: "var(--gf-color-accent)", fontWeight: 600, whiteSpace: "nowrap" }}>
          View →
        </span>
      </div>
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
      <div style={{
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "50%",
        border: "2px solid var(--gf-color-accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "var(--gf-color-accent)",
        flexShrink: 0,
      }}>
        {value}
      </div>
      <span style={{ fontSize: "0.7rem", color: "var(--gf-color-text-subtle)", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", maxWidth: "4.5rem" }}>
        {label}
      </span>
    </div>
  );
}

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
    <div className="page-layout">
      <CatalogSidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "var(--gf-space-md)", fontSize: "0.85rem", color: "var(--gf-color-text-subtle)", flexWrap: "wrap" }}>
          <Link to="/catalogs" style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>Catalogs</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <Link to={`/catalogs/${category}`} style={{ color: "var(--gf-color-accent)", textDecoration: "none" }}>{prettifySegment(category)}</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: "var(--gf-color-text)" }}>{prettifySegment(service)} {typeLabel}</span>
        </nav>

        <h1 className="page-h1">
          {prettifySegment(service)} {typeLabel}
        </h1>

        {versions.length === 0 ? (
          <p style={{ color: "var(--gf-color-text-subtle)" }}>No versions published yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--gf-space-md)" }}>
            {versions.map((item) => (
              <VersionCard key={item.path} item={{ path: item.path!, title: item.title }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
