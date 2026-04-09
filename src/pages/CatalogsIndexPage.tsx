import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CatalogSidebar } from "../components/CatalogSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { getSectionIndexItem, getSectionListItems } from "../content/sections";
import { useItemBody } from "../content/useItemBody";


export const CatalogsIndexPage: React.FC = () => {
  const indexItem = getSectionIndexItem("catalogs");
  const indexBody = useItemBody(indexItem);
  const listItems = getSectionListItems("catalogs");

  const overviewItems = listItems.filter(
    (item) => item.path && item.path.split("/").filter(Boolean).length === 2
  );

  return (
    <div className="page-layout">
      <CatalogSidebar />

      <div style={{ flex: 1, minWidth: 0 }}>
        {indexItem && (
          <article style={{ marginBottom: "var(--gf-space-xl)" }}>
            <h1 className="page-h1">{indexItem.title}</h1>
            {indexItem.description && (
              <p className="page-description">{indexItem.description}</p>
            )}
            {indexBody.trim() && (
              <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.1rem" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {indexBody}
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
                  <Link key={item.path} to={item.path!} className="link-card surface-card" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "var(--gf-space-md)" }}>
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
