import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "../components/SectionCard";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionIndexItem, getSectionListItems, SectionItem } from "../content/sections";

// Capitalise a slug segment, treating short parts as acronyms.
function prettifySegment(s: string): string {
  const acronyms = new Set(["ai", "ml", "iam", "vpc", "etl", "k8s", "sdk"]);
  return s
    .split("-")
    .map((part) => (acronyms.has(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("/")
    .replace(/([A-Z])\/([A-Z])/g, "$1/$2") // keep AI/ML style
    .split("/").join(" / ")               // space around slashes for multi-word
    .replace(" / ", "/");                 // but no space for acronym pairs like AI/ML
}

// Derive unique service paths grouped by category from published release items.
// Published items have paths like /catalogs/<category>/<service>/<type>/<version>.
function getServiceGroups(items: SectionItem[]): Map<string, Array<{ path: string; label: string }>> {
  const groups = new Map<string, Array<{ path: string; label: string }>>();
  const seen = new Set<string>();

  for (const item of items) {
    if (!item.path) continue;
    const parts = item.path.split("/").filter(Boolean);
    // Depth-5 paths: ["catalogs", category, service, type, version]
    if (parts.length < 5) continue;
    const category = parts[1];
    const service = parts[2];
    const servicePath = `/catalogs/${category}/${service}`;
    if (seen.has(servicePath)) continue;
    seen.add(servicePath);
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category)!.push({ path: servicePath, label: prettifySegment(service) });
  }

  return groups;
}

export const CatalogsIndexPage: React.FC = () => {
  const indexItem = getSectionIndexItem("catalogs");
  const listItems = getSectionListItems("catalogs");

  // Type-overview cards: items with a shallow path like /catalogs/capabilities
  const overviewItems = listItems.filter((item) => {
    if (!item.path) return false;
    return item.path.split("/").filter(Boolean).length === 2;
  });

  // Service groups derived from published release items
  const serviceGroups = getServiceGroups(listItems);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      {indexItem && (
        <article style={{ maxWidth: "900px", margin: "0 auto", padding: "0 var(--gf-space-xl)", width: "100%", marginBottom: "var(--gf-space-xl)" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0, color: "var(--gf-color-accent)", lineHeight: 1.2, marginBottom: "var(--gf-space-md)" }}>
            {indexItem.title}
          </h1>
          {indexItem.description && (
            <p style={{ color: "var(--gf-color-text-subtle)", fontSize: "1.1rem", marginBottom: "var(--gf-space-lg)", lineHeight: 1.6 }}>
              {indexItem.description}
            </p>
          )}
          {indexItem.body.trim() && (
            <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.1rem" }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {indexItem.body}
              </ReactMarkdown>
            </div>
          )}
        </article>
      )}

      {overviewItems.length > 0 && (
        <section style={{ marginBottom: "var(--gf-space-xl)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-text)", padding: "0 var(--gf-space-xl)" }}>
            Catalog Types
          </h2>
          <div className="catalog-grid">
            {overviewItems.map((item) => (
              <Link key={item.path} to={item.path!} style={{ textDecoration: "none", color: "inherit" }}>
                <SectionCard title={item.title} description={item.description ?? ""} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {serviceGroups.size > 0 && (
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-text)", padding: "0 var(--gf-space-xl)" }}>
            Service Catalogs
          </h2>
          {Array.from(serviceGroups.entries()).map(([category, services]) => (
            <div key={category} style={{ marginBottom: "var(--gf-space-lg)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "var(--gf-space-sm)", color: "var(--gf-color-text-subtle)", padding: "0 var(--gf-space-xl)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {prettifySegment(category)}
              </h3>
              <div className="catalog-grid">
                {services.map(({ path, label }) => (
                  <Link key={path} to={path} style={{ textDecoration: "none", color: "inherit" }}>
                    <SectionCard title={label} description="" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
