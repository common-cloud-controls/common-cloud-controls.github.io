import React from "react";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "../components/SectionCard";
import { SectionSidebar } from "../components/SectionSidebar";
import { markdownComponents } from "../components/markdownComponents";
import { siteConfig } from "../config/site";
import { getSectionIndexItem, getSectionListItems } from "../content/sections";
import { useItemBody } from "../content/useItemBody";

export interface SectionIndexPageProps {
  section: string;
}

export const SectionIndexPage: React.FC<SectionIndexPageProps> = ({ section }) => {
  const config = siteConfig.contentSections[section];
  if (!config?.enabled) return <Navigate to="/" replace />;

  const indexItem = getSectionIndexItem(section);
  const indexBody = useItemBody(indexItem);
  const listItems = getSectionListItems(section);
  const title = config.label ?? section;

  return (
    <div className="page-layout">
      <SectionSidebar section={section} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {indexItem ? (
          <article style={{ padding: "0 var(--gf-space-xl)" }}>
            <h1 className="page-h1">{indexItem.title}</h1>
            {indexItem.description && (
              <p className="page-description">{indexItem.description}</p>
            )}
            {indexBody.trim() && (
              <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: listItems.length > 0 ? "var(--gf-space-xl)" : 0 }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {indexBody}
                </ReactMarkdown>
              </div>
            )}
          </article>
        ) : (
          <h1 className="page-h1">{title}</h1>
        )}

        {listItems.length > 0 && (
          <>
            {indexItem && (
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-text)", lineHeight: 1.3 }}>
                {title}
              </h2>
            )}
            <div className="catalog-grid">
              {listItems.map((item) => {
                const href = item.path ?? `/${section}/${item.slug}`;
                return (
                  <Link key={item.slug} to={href} className="link-card surface-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <SectionCard title={item.title} description={item.description ?? ""} />
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {!indexItem && listItems.length === 0 && (
          <p style={{ color: "var(--gf-color-text-subtle)" }}>
            Add markdown files under <code>src/content/{section}/</code> to populate this section.
          </p>
        )}
      </div>
    </div>
  );
};
