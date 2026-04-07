import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--gf-space-lg)", color: "var(--gf-color-text)" }}>
              Catalog Types
            </h2>
            <div className="catalog-grid">
              {overviewItems.map((item) => {
                return (
                  <Link key={item.path} to={item.path!} className="link-card" style={{ textDecoration: "none", color: "inherit", display: "flex" }}>
                    <div style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--gf-space-md)",
                      padding: "var(--gf-space-xl)",
                      background: "var(--gf-color-surface)",
                      borderRadius: "var(--gf-radius-xl)",
                      border: "1px solid var(--gf-color-border-strong)",
                      boxShadow: "var(--gf-shadow-surface)",
                    }}>
                      <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "var(--gf-color-accent)" }}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p style={{ margin: 0, color: "var(--gf-color-text-subtle)", lineHeight: 1.7, fontSize: "0.95rem", flex: 1 }}>
                          {item.description}
                        </p>
                      )}
                      <span style={{ fontSize: "0.875rem", color: "var(--gf-color-accent)", fontWeight: 600 }}>
                        Browse →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
