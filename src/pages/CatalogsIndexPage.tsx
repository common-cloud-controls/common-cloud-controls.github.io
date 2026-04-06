import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "../components/SectionCard";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionIndexItem, getSectionListItems } from "../content/sections";

export const CatalogsIndexPage: React.FC = () => {
  const indexItem = getSectionIndexItem("catalogs");
  const listItems = getSectionListItems("catalogs");

  const overviewItems = listItems.filter(
    (item) => item.path && item.path.split("/").filter(Boolean).length === 2
  );

  return (
    <div style={{ display: "flex", gap: "var(--gf-space-xl)", maxWidth: "1200px", margin: "0 auto", width: "100%", alignItems: "flex-start" }}>
      <CatalogSidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        {indexItem && (
          <article style={{ marginBottom: "var(--gf-space-xl)" }}>
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
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-text)" }}>
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

      </div>
    </div>
  );
};
