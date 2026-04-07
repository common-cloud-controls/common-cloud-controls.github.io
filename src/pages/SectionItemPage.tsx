import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../components/markdownComponents";
import { SectionSidebar } from "../components/SectionSidebar";
import { getSectionItemBySlug, getSectionItemByPath } from "../content/sections";

export interface SectionItemPageProps {
  section: string;
  path?: string;
  sidebar?: React.ReactNode;
}

export const SectionItemPage: React.FC<SectionItemPageProps> = ({ section, path: pathProp, sidebar }) => {
  const { slug: slugParam } = useParams<{ slug: string }>();
  const item = pathProp
    ? getSectionItemByPath(section, pathProp)
    : slugParam
      ? getSectionItemBySlug(section, slugParam)
      : undefined;

  if (!item) return <Navigate to={pathProp ? "/" : `/${section}`} replace />;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", gap: "var(--gf-space-xl)", alignItems: "flex-start" }}>
      {sidebar ?? <SectionSidebar section={section} />}
      <article style={{ flex: 1, minWidth: 0, padding: "0 var(--gf-space-xl) var(--gf-space-xl)" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "var(--gf-space-md)", color: "var(--gf-color-accent)", lineHeight: 1.2 }}>
          {item.title}
        </h1>
        {item.description && (
          <p style={{ color: "var(--gf-color-text-subtle)", fontSize: "1.1rem", marginBottom: "var(--gf-space-lg)", lineHeight: 1.6 }}>
            {item.description}
          </p>
        )}
        {item.body.trim() && (
          <div className="library-article-body" style={{ color: "var(--gf-color-text)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {item.body}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
};
